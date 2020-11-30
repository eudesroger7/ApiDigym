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
  Route.get('authenticated', 'AuthController.authenticated').middleware(['auth']);
}).prefix('auth');

Route.group(() => {
  Route.get('', 'UserController.index');
  Route.post('', 'UserController.store');
  Route.put('changePassword', 'UserController.changePassword');
  Route.get(':id', 'UserController.show');
  Route.put(':id', 'UserController.update');
  Route.delete(':id', 'UserController.destroy');
}).prefix('api/users').middleware(['auth']);

