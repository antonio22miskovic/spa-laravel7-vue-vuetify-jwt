<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [

            'name'     => 'required|unique:users|max:10',
            'email'    => 'required|unique:users|email:rfc,dns',
            'password' => 'required'

        ];
    }

    public function messages()
    {
        return [

            'name.required'     => 'debe introduzir un usuario',
            'name.unique'       => 'Usuario no se encuentra disponible',
            'name.max'          => 'el nombre del usuario no puede ser mayor a 10 caracteres',
            'email.required'    => 'debe introducir un email',
            'email.unique'      => 'E-mail no se encuentra disponible',
            'email.email'       => 'debe introducir un email valido',
            'password.required' => 'debe introducir una contraseña valida'

        ];

    }
}
