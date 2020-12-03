'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OwnersSchema extends Schema {
    up() {
        this.create('owners', (table) => {
            table.increments();
            table.integer('user_id').unsigned().references('id').inTable('users');
            table.timestamps();
        });
    }

    down() {
        this.drop('owners');
    }
}

module.exports = OwnersSchema;
