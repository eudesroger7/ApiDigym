'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UsersSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments();
            table.string('name', 250).notNullable();
            table.string('email', 250).notNullable().unique();
            table.string('password', 120).notNullable();
            table.integer('user_type_id').notNullable();
            table.timestamps();
        });
    }

    down() {
        this.drop('users');
    }
}

module.exports = UsersSchema;
