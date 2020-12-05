'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
    static boot() {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
    }

    /**
     * @method tokens
     * @return {Object}
     */
    tokens() {
        return this.hasMany('App/Models/Token')
    }

    /**
   * @method student
   * @return {Object}
   */
    student() {
        return this.hasOne('App/Models/Student')
    }

    /**
   * @method owner
   * @return {Object}
   */
    owner() {
        return this.hasOne('App/Models/Owner')
    }
}

module.exports = User
