'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GymsSchema extends Schema {
    up() {
        this.create('gyms', (table) => {
            table.increments();
            table.string('name', 150).notNullable();
            table.string('address', 350).nullable();
            table.float('lat', 8, 5).nullable();
            table.float('lng', 8, 5).nullable();
            table.integer('capacity').notNullable();
            table.string('phone').nullable();
            table.integer('owner_id').unsigned().references('id').inTable('owners');
            table.timestamps();
        });
    }

    down() {
        this.drop('gyms');
    }
}

module.exports = GymsSchema;
