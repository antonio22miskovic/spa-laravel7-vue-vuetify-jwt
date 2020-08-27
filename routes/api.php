<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
// rutas de autenticazion
Route::group(['prefix' => 'auth'], function ($router) {

    	Route::post('login', 'Auth\JwtController@login');
    	Route::post('logout', 'Auth\JwtController@logout');
        Route::post('refresh', 'Auth\JwtController@refresh');
    	Route::post('get-auth-user', 'Auth\JwtController@getAuthUser');
    	Route::post('registro/user', 'Auth\JwtController@store');

	});


// rutas de reseteo de contraseña
Route::group(['prefix' => 'reset'], function ($router) {

	Route::post('email-vereificacion','Auth\ResetPasswordController@emailValidate');
	Route::post('codigo-vereificacion','Auth\ResetPasswordController@ConfirmeCodigo');
	Route::post('update-password','Auth\ResetPasswordController@UpdatePassword');
	Route::post('update-codigo','Auth\ResetPasswordController@refreshCodigo');

});