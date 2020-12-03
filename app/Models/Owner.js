'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Owner extends Model {
    static boot() {
        super.boot()
    }

    /**
     * @method gyms
     * @return {Object}
     */
    gyms() {
        return this.hasMany('App/Models/Gym')
    }

    /**
     * @method user
     * @return {Object}
     */
    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Owner
