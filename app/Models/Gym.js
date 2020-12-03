'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gym extends Model {
  static boot () {
    super.boot()
  }


  /**
   * @method users
   * @return {Object}
   */
  users () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = Gym
