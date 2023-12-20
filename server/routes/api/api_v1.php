<?php

use App\Facades\LocalizationFacade;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\CommentController;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => LocalizationFacade::locale(), 'middleware' => ['set_locale', 'cors']], function($router) {
    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function ($router) {
        Route::post('logout', 'AuthController@logout')->middleware('jwt')->name('auth_logout_v1');
        Route::post('me', 'AuthController@me')->middleware('jwt')->name('auth_me_v1');
        Route::post('login', 'AuthController@login')->name('auth_login_v1');
        Route::post('register', 'AuthController@registration')->name('auth_registration_v1');
        Route::post('refresh', 'AuthController@refresh')->name('auth_refresh_token_v1');
        Route::get('send-email-confirmation-notification', 'AuthController@sendEmailConfirmationNotification')->name('auth_send_email_confirmation_notification_v1');
        Route::get('email-confirmation/{confirmation_token}', 'AuthController@emailConfirmation')->name('auth_email_confirmation_v1');
    });

    Route::prefix('posts')->group(function () {
        Route::resource('/', PostController::class)->except([
            'index',
            'create',
            'edit',
            'show',
            'update',
            'destroy',
        ]);
        Route::get('/{sort?}/{search?}/{limit?}/{page?}', [PostController::class, 'index'])->name('post_list');
        Route::put('/{id}', [PostController::class, 'update'])->name('post_update');
        Route::delete('/{id}', [PostController::class, 'destroy'])->name('post_delete');
    });
    Route::get('/post/{id}', [PostController::class, 'show'])->name('post_show');

    Route::prefix('comments')->group(function () {
        Route::resource('/', CommentController::class)->except([
            'index',
            'edit',
            'store',
            'show',
            'update',
            'destroy',
        ]);
        Route::get('/{post_id?}/{parent_id?}/{limit?}/{page?}', [CommentController::class, 'index'])->name('comment_list');
        Route::put('/{id}', [CommentController::class, 'update'])->name('comment_update');
    });
    Route::get('/comment/{id}', [CommentController::class, 'show'])->name('comment_show');
    Route::delete('comment/{id}', [CommentController::class, 'destroy'])->name('comment_delete');
});
