'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GymsSchema extends Schema {
    up() {
        this.create('gyms', (table) => {
            table.increments();
            table.string('name', 150).notNullable();
            table.string('street', 350).nullable();
            table.integer('number').nullable();
            table.string('city', 150).nullable();
            table.string('state', 100).nullable();
            table.string('district', 150).nullable();
            table.string('zip_code', 15).nullable();
            table.string('complement', 350).nullable();
            table.float('lat').nullable();
            table.float('lng').nullable();
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
