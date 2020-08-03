<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'auth'], function ($router) {

    	Route::post('login', 'Auth\JwtController@login');
    	Route::post('logout', 'Auth\JwtController@logout');
        Route::post('refresh', 'Auth\JwtController@refresh');
    	Route::post('get-auth-user', 'Auth\JwtController@getAuthUser');

	});
	Route::apiresource('producto','ProductoController');