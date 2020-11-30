'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');

class UserSeeder {
  async run() {
    await User.create({
      name: 'Eudes Roger',
      email: 'eudesroger7@gmail.com',
      password: '12345678',
      user_type_id: 1
    })
  }
}

module.exports = UserSeeder;
