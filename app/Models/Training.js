'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Training extends Model {
    static boot() {
        super.boot()
    }


    /**
     * @method student
     * @return {Object}
     */
    student() {
        return this.belongsTo('App/Models/Student')
    }

    /**
    * @method gym
    * @return {Object}
    */
    gym() {
        return this.belongsTo('App/Models/Gym')
    }
}

module.exports = Training
