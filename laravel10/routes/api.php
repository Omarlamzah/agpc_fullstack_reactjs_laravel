<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventDateController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\MembreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/contact', [ContactController::class, 'sendContactForm']);





 Route::middleware(['auth:sanctum','admin'])->resource('membres', MembreController::class);
 Route::middleware(['auth:sanctum','admin'])->resource('media', MediaController::class);
Route::get('/media/type/{type}', [MediaController::class, 'findByType']);
Route::get('/media/type/{type}/date/{date}', [MediaController::class, 'findByTypeAndDate']);


Route::get('/target-date', function () {
    return response()->json(['targetDate' => '2024-09-14T09:00:00']);
});



