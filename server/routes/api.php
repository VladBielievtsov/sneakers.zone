<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/products', [ProductController::class, 'store']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    Route::put('/products/{product}', [ProductController::class, 'update']);

    Route::post('/category', [CategoryController::class, 'store']);
    Route::delete('/category/{category}', [CategoryController::class, 'destroy']);
    Route::put('/category/{category}', [CategoryController::class, 'update']);
});


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);
Route::get("/products/{product}", [ProductController::class, 'show']);

Route::get('/category', [CategoryController::class, 'index']);
Route::get("/category/{category}", [CategoryController::class, 'show']);
