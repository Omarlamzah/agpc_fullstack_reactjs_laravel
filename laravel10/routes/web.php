<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


// routes/web.php


Route::get('/link', function () {
    try {
        // Run the artisan command to create the storage link
        Artisan::call('storage:link');

        return 'Storage link created successfully!';
    } catch (\Exception $e) {
        // Handle any exceptions that might occur
        return 'Error creating storage link: ' . $e->getMessage();
    }
});

Route::get('/optimaze', function () {
    // Create the storage link
    Artisan::call('storage:link');

    // Clear various caches
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');

    return "Artisan commands executed successfully!";
});
