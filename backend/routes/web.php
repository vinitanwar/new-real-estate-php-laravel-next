<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});


use Illuminate\Support\Facades\Artisan;
Route::get('/migrate', function () {

    Artisan::call('storage:link');
    return 'Migrations have been run successfully!';
});

use App\Http\Controllers\InvoiceController;

Route::get('/create-invoice', [InvoiceController::class, 'createInvoice']);



// Route::get('users', [propertyController::class, 'index']);
