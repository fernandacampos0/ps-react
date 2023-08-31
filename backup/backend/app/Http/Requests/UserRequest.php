<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $postRules =[];
        $putRules = [];

        $rules = [
            'name' => ['string', 'min:3', 'max:255'],
            'email' => ['email', Rule::unique('users')->ignore($this->user)],
            'password' => [
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ]
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'name' => ['required'],
                'email' => ['required'],
                'password' => ['required', 'confirmed'],
            ];
        }

        if ($this->isMethod('put')) {
            $putRules = [
                'name' => ['sometimes'],
                'email' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function bodyParameters(): array
    {
        return [
            'name' => [
                'description' => 'Name of the user',
                'example' => 'Tester test',
            ],
            'email' => [
                'description' => 'Email of the user',
                'example' => 'tester@test.com'
            ],
            'password' => [
                'description' => 'Password of the user',
                'example' => 'password'
            ],
            'password_confirmation' => [
                'description' => 'Password confirmation of the user',
                'example' => 'password'
            ],
        ];
    }
}
