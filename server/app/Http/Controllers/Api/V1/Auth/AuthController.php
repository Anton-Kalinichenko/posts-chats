<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Api\V1\AbstractApiController;
use App\Http\Requests\Api\V1\Auth\RegistrationRequest;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use OpenApi\Annotations as OA;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenBlacklistedException;
use Illuminate\Support\Str;
use App\Notifications\EmailConfirmation;
use Carbon\Carbon;

use Illuminate\Support\Facades\Log;
use App\Facades\PostFacade;

class AuthController extends AbstractApiController
{
    private bool $loginProcessMethod = false;
    private string $token = '';

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * @OA\Post(
     *     path="/api/v1/auth/register",
     *     summary="Sign up",
     *     description="Register by name, email, password.",
     *     operationId="authRegister",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Pass a name and user credentials.",
     *         @OA\JsonContent(
     *             required={"name","email","password"},
     *             @OA\Property(property="name", type="string", example="user"),
     *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="PassWord12345"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Wrong credentials response",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="false"),
     *             @OA\Property(property="message", type="string", example="Validation errors."),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="name", type="array",
     *                     @OA\Items(type="string", example="The name is required.")
     *                 ),
     *                 @OA\Property(property="email", type="array",
     *                     @OA\Items(type="string", example="The email is required or has already been taken.")
     *                 ),
     *                 @OA\Property(property="password", type="array",
     *                     @OA\Items(type="string", example="The password is required or has more than 8 letters.")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfull registration.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="true"),
     *             @OA\Property(property="message", type="string", example="You have successfully registered."),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3JlZ2lzdGVyIiwiaWF0IjoxNjY0NTQxMDIwLCJleHAiOjE2NjQ1NDQ2MjAsIm5iZiI6MTY2NDU0MTAyMCwianRpIjoiRDE3M2YyYWxjWmE4NTViVyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.T1X55OPe7Fwr"),
     *                 @OA\Property(property="token_type", type="string", example="bearer"),
     *                 @OA\Property(property="expires_in", type="string", example="3600"),
     *                 @OA\Property(property="user", type="object",
     *                      @OA\Property(property="id", type="string", example="1"),
     *                      @OA\Property(property="name", type="string", example="User"),
     *                      @OA\Property(property="email", type="string", example="user@mail.com"),
     *                      @OA\Property(property="email_verified_at", type="string", example="null"),
     *                      @OA\Property(property="created_at", type="string", example="2022-12-22T15:14:06.000000Z"),
     *                      @OA\Property(property="updated_at", type="string", example="2022-12-22T15:14:06.000000Z")
     *                 )
     *             )
     *         )
     *     )
     * )
     *
     * @param RegistrationRequest $request
     * @return JsonResponse
     */
    public function registration(RegistrationRequest $request): JsonResponse
    {
        $credentials = $request->all();

        try {
            $user = User::create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']),
                'confirmation_token' => Str::random(40),
            ]);

            $user->notify(new EmailConfirmation($user));
        } catch (\Exception $error) {
            return $this->responseJSON(__('auth.response.422.register', 422));
        }

        return $this->loginProcess($credentials);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/login",
     *     summary="Authorization",
     *     description="Authorization user by email and password to get Bearer Token",
     *     operationId="authLogin",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Pass a name and user credentials.",
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Wrong credentials response",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="false"),
     *             @OA\Property(property="message", type="string", example="Validation errors."),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="email", type="array",
     *                     @OA\Items(type="string", example="The email is required or has already been taken.")
     *                 ),
     *                 @OA\Property(property="password", type="array",
     *                     @OA\Items(type="string", example="The password is required or has more than 8 letters.")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized. Your credentials are wrong",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="false"),
     *             @OA\Property(property="message", type="string", example="Unauthorized. Your credentials are wrong"),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfull authorization.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="true"),
     *             @OA\Property(property="message", type="string", example="You have successfully logged in."),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3JlZ2lzdGVyIiwiaWF0IjoxNjY0NTQxMDIwLCJleHAiOjE2NjQ1NDQ2MjAsIm5iZiI6MTY2NDU0MTAyMCwianRpIjoiRDE3M2YyYWxjWmE4NTViVyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.T1X55OPe7Fwr"),
     *                 @OA\Property(property="token_type", type="string", example="bearer"),
     *                 @OA\Property(property="expires_in", type="string", example="3600"),
     *                 @OA\Property(property="user", type="object",
     *                      @OA\Property(property="id", type="string", example="1"),
     *                      @OA\Property(property="name", type="string", example="User"),
     *                      @OA\Property(property="email", type="string", example="user@mail.com"),
     *                      @OA\Property(property="email_verified_at", type="string", example="null"),
     *                      @OA\Property(property="created_at", type="string", example="2022-12-22T15:14:06.000000Z"),
     *                      @OA\Property(property="updated_at", type="string", example="2022-12-22T15:14:06.000000Z"),
     *                 )
     *
     *             )
     *         )
     *     )
     * )
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $this->loginProcessMethod = true;
        $credentials = $request->all();
        return $this->loginProcess($credentials);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/me",
     *     summary="User data",
     *     description="Get autorization user data",
     *     operationId="authMe",
     *     tags={"Auth"},
     *     security={
     *         {"bearerAuth": {}}
     *     },
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="false"),
     *             @OA\Property(property="message", type="string", example="Token not provided"),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfull get user data.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="true"),
     *             @OA\Property(property="message", type="string", example="You have successfully logged in."),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="string", example="1"),
     *                 @OA\Property(property="name", type="string", example="User"),
     *                 @OA\Property(property="email", type="string", example="user@mail.com"),
     *                 @OA\Property(property="email_verified_at", type="string", example="null"),
     *                 @OA\Property(property="created_at", type="string", example="2022-12-22T15:14:06.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", example="2022-12-22T15:14:06.000000Z"),
     *             )
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {
        $user_data = auth()->user();

        return $this->responseJSON(
            __('auth.response.200.me'),
            200,
            $user_data != null ? $user_data->toArray() : []
        );
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/logout",
     *     summary="User logout",
     *     description="User logout and clear a authorization token",
     *     operationId="authLogout",
     *     tags={"Auth"},
     *     security={
     *         {"bearerAuth": {}}
     *     },
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="false"),
     *             @OA\Property(property="message", type="string", example="Token not provided"),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfull get user data.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="true"),
     *             @OA\Property(property="message", type="string", example="You have successfully logged out."),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();

        return $this->responseJSON(__('auth.response.200.logout'));
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/refresh",
     *     summary="Refresh token",
     *     description="This route can be use once by current authorization token",
     *     operationId="authRefresh",
     *     tags={"Auth"},
     *     security={
     *         {"bearerAuth": {}}
     *     },
     *     @OA\Response(
     *         response=422,
     *         description="Unauthorized.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="false"),
     *             @OA\Property(property="message", type="string", example="The token has been blacklisted"),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully refresh token.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="string", example="true"),
     *             @OA\Property(property="message", type="string", example="You have successfully refreshed token."),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3JlZ2lzdGVyIiwiaWF0IjoxNjY0NTQxMDIwLCJleHAiOjE2NjQ1NDQ2MjAsIm5iZiI6MTY2NDU0MTAyMCwianRpIjoiRDE3M2YyYWxjWmE4NTViVyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.T1X55OPe7Fwr"),
     *                 @OA\Property(property="token_type", type="string", example="bearer"),
     *                 @OA\Property(property="expires_in", type="string", example="3600"),
     *             )
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        try {
            $this->token = auth()->refresh();

            if (!empty($this->token)) {
                return $this->responseJSON(
                    __('auth.response.200.refresh_token'),
                    200,
                    $this->getTokenData()
                );
            }

            return $this->responseJSON(__('auth.response.422.token'), 422, []);
        } catch (TokenBlacklistedException | JWTException $err) {
            return $this->responseJSON($err->getMessage(), 422, []);
        }
    }

    /**
     * Method login user
     *
     * @param array $credentials
     *
     * @return JsonResponse
     */
    private function loginProcess(array $credentials): JsonResponse
    {
        if (!$this->token = auth()->attempt($credentials)) {
            return $this->responseJSON(__('auth.response.401.login'), 401);
        }

        return $this->responseJSON(
            $this->loginProcessMethod ? __('auth.response.200.login') : __('auth.response.200.register'),
            200,
            $this->getTokenData(),
        );
    }

    /**
     * Get current user token
     *
     * @return array
     */
    protected function getTokenData(): array
    {
        return [
            'access_token' => $this->token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ];
    }

    public function sendEmailConfirmationNotification()
    {
        $user = auth()->user();
        $user->notify(new EmailConfirmation($user));

        return $this->responseJSON(
            __('auth.response.200.send_email_confirmation'),
            200,
            []
        );
    }

    public function emailConfirmation($confirmation_token)
    {
        $user = User::where('confirmation_token', $confirmation_token)->firstOrFail();

        $user->update([
            'email_verified_at' => Carbon::now()->toDateTimeString(),
            'confirmation_token' => null
        ]);

        return redirect()->away('http://localhost:3000/');
    }
}
