'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gym extends Model {
  static boot() {
    super.boot()
  }


  /**
   * @method user
   * @return {Object}
   */
  user() {
    return this.belongsTo('App/Models/User')
  }

  /**
  * @method gym
  * @return {Object}
  */
  gym() {
    return this.belongsTo('App/Models/Gym')
  }
}

module.exports = Gym
