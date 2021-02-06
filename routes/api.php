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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'prefix' => 'contact/'
], function () {
    Route::post('store', 'ContactController@store');
    Route::get('fetch', 'ContactController@fetch');
    Route::get('view/{contact_id}', 'ContactController@view');
    Route::patch('delete/{contact_id}', 'ContactController@delete');
    Route::patch('restore/{contact_id}', 'ContactController@restore');
    Route::patch('patch', 'ContactController@patch');
    Route::patch('upload/{contact_id}', 'ContactController@changeimage');
});
