<?php

use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\propertyController;
use App\Http\Controllers\TrendingPropertyController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\blodController;
use App\Http\Controllers\categoriesController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Banner_image_controller;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\PolicyController;




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


  

Route::apiResource('v1/property', PropertyController::class);
Route::apiResource('v1/trendingproperty', TrendingPropertyController::class);
Route::apiResource('v1/testimonial', TestimonialController::class);
Route::apiResource('v1/blog', blodController::class);
Route::apiResource('v1/category', categoriesController::class);

Route::post('v1/signupcustomer', [CustomerController::class,"SignupCustomer"]);
Route::post('v1/logincustomer', [LoginController::class,"login"]);
Route::get('v1/BannerImg', [Banner_image_controller::class,"bannerimage"]);
Route::get('v1/aboutPage', [AboutController::class,"GetAbout"]);
Route::get('v1/contact', [AboutController::class,"GetContect"]);

Route::get('v1/policy', [PolicyController::class,"getPolicy"]);
Route::post('v1/message', [MessageController::class,"SendMessage"]);


