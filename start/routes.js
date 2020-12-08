'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');

Route.group(() => {
    Route.post('token', 'AuthController.token');
    Route.get('authenticated', 'AuthController.authenticated');
}).prefix('auth');

Route.group(() => {
    Route.get('', 'UserController.index');
    Route.post('', 'UserController.store');
    Route.put('changePassword', 'UserController.changePassword');
    Route.get(':id', 'UserController.show');
    Route.put(':id', 'UserController.update');
    Route.delete(':id', 'UserController.destroy');
}).prefix('api/users');

Route.group(() => {
    Route.get('', 'OwnerController.index');
    Route.post('', 'OwnerController.store');
    Route.get(':id', 'OwnerController.show');
    Route.put(':id', 'OwnerController.update');
    Route.delete(':id', 'OwnerController.destroy');
}).prefix('api/owners');

Route.group(() => {
    Route.get('', 'StudentController.index');
    Route.post('', 'StudentController.store');
    Route.get(':id', 'StudentController.show');
    Route.put(':id', 'StudentController.update');
    Route.delete(':id', 'StudentController.destroy');
}).prefix('api/students');

Route.group(() => {
    Route.get('', 'GymController.index');
    Route.post('', 'GymController.store');
    Route.get(':id', 'GymController.show');
    Route.put(':id', 'GymController.update');
    Route.delete(':id', 'GymController.destroy');
}).prefix('api/gyms');

Route.group(() => {
    Route.get('current', 'TrainingController.current');
    Route.get('', 'TrainingController.index');
    Route.post('', 'TrainingController.store');
    Route.get(':id', 'TrainingController.show');
    Route.put(':id', 'TrainingController.update');
    Route.delete(':id', 'TrainingController.destroy');
}).prefix('api/training');
