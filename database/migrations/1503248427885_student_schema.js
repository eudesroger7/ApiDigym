'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StudentsSchema extends Schema {
    up() {
        this.create('students', (table) => {
            table.increments();
            table.integer('user_id').unsigned().references('id').inTable('users');
            table.integer('gym_id').unsigned().references('id').inTable('gyms');
            table.timestamps();
        });
    }

    down() {
        this.drop('students');
    }
}

module.exports = StudentsSchema;
