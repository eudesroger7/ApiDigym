'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gym extends Model {
    static boot() {
        super.boot()
    }

    /**
         * @method owner
         * @return {Object}
         */
    owner() {
        return this.belongsTo('App/Models/Owner')
    }

    /**
     * @method students
     * @return {Object}
     */
    students() {
        return this.hasMany('App/Models/Student')
    }
}

module.exports = Gym
