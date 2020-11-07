<?php

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

// ctrls = route controllers
$ctrls = "App\Http\Controllers";

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function() {
    return response()->json([
        "code" => 200,
        "message" => "OK",
        "feedback" => "Status service OK"
    ]);
});

Route::post('users/', "$ctrls\UserController@store");
Route::get('users/', "$ctrls\UserController@showExcel");
Route::get('users/winn', "$ctrls\UserController@showWinn");
Route::get('users/winn', "$ctrls\UserController@showWinn");
Route::delete('users/all', "$ctrls\UserController@clear");