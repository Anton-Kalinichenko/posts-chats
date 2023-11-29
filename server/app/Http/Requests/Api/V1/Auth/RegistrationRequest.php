<?php

namespace App\Http\Requests\Api\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'                  => 'required|max:255',
            'email'                 => 'required|max:255|email:rfc,dns|unique:users,email|',
            'password'              => 'required|min:8|max:255|confirmed',
            'password_confirmation' => 'required|min:8|max:255',
        ];
    }

    /**
     * Handle a failed validation attempt.
     * @param Validator $validator
     *
     * @return HttpResponseException
     */
    public function failedValidation(Validator $validator): HttpResponseException
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => __('auth.response.422.validation'),
            'version'   => 'v1',
            'data'      => $validator->errors(),
        ], 422));
    }
}
