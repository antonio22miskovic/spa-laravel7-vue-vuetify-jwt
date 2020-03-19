<?php

use Illuminate\Support\Facades\Route;


Route::get('{spa}','SpaController')->where('spa','.*');