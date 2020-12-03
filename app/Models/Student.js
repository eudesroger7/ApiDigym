'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
    static boot() {
        super.boot()
    }

    /**
     * @method gym
     * @return {Object}
     */
    gym() {
        return this.belongsTo('App/Models/Gym')
    }

    /**
     * @method user
     * @return {Object}
     */
    user() {
        return this.belongsTo('App/Models/User')
    }

    /**
     * @method training
     * @return {Object}
     */
    training() {
        return this.hasMany('App/Models/Training')
    }
}

module.exports = Student
