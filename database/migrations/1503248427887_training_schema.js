'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrainingSchema extends Schema {
    up() {
        this.create('training', (table) => {
            table.increments();
            table.string('start_time', 30).nullable();
            table.string('finish_time', 30).nullable();
            table.string('observation', 500).nullable();
            table.integer('user_id').unsigned().references('id').inTable('users');
            table.integer('gym_id').unsigned().references('id').inTable('gyms');
            table.timestamps();
        });
    }

    down() {
        this.drop('training');
    }
}

module.exports = TrainingSchema;
