'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrainingSchema extends Schema {
    up() {
        this.create('trainings', (table) => {
            table.increments();
            table.string('start_time', 30).nullable();
            table.string('finish_time', 30).nullable();
            table.string('observation', 500).nullable();
            table.integer('student_id').unsigned().references('id').inTable('students');
            table.integer('gym_id').unsigned().references('id').inTable('gyms');
            table.timestamps();
        });
    }

    down() {
        this.drop('trainings');
    }
}

module.exports = TrainingSchema;
