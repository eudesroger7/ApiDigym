'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GymsSchema extends Schema {
    up() {
        this.create('gyms', (table) => {
            table.increments();
            table.string('name', 150).notNullable();
            table.string('address', 350).notNullable();
            table.integer('capacity').notNullable();
            table.integer('phone').nullable();
            table.timestamps();
        });
    }

    down() {
        this.drop('gyms');
    }
}

module.exports = GymsSchema;
