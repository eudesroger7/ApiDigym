'use strict';
const Account = use('App/Models/Account');
const { accountTransformer, accountTransformerCollection } = use('App/Transformers/Account');

class AccountController {
  /**
   * index
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async index({ request, response }) {
    const { page = 1, limit = 20 } = request.all();
    const accounts = await Account.query().paginate(+page, +limit);
    return response.json(accountTransformerCollection(accounts));
  }

  /**
   * store
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const { nickname, username, password, type, client_id } = request.body;
    const account = await Account.create({ nickname, username, password, type, client_id });
    return response.json(accountTransformer(account));
  }

  /**
   * show
   * @param params
   * @param response
   * @returns {Promise<*>}
   */
  async show({ params, response }) {
    try {
      const { id } = params;
      const account = await Account.findOrFail(id);
      return response.json(accountTransformer(account));
    } catch (error) {
      response.status(400).send({ message: 'Conta não existe' });
    }
  }

  /**
   * update
   * @param params
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async update({ params, request, response }) {
    try {
      const { id } = params;
      const account = await Account.findOrFail(id);
      const {
        nickname = account.nickname,
        username = account.username,
        password = account.password,
      } = request.body;

      account.nickname = nickname;
      account.username = username;
      account.password = password;
      await account.save();
      return response.json(accountTransformer(account));
    } catch (error) {
      response.status(400).send({ message: 'Conta não existe' });
    }
  }

  /**
   * destroy
   * @param params
   * @param response
   * @returns {Promise<*>}
   */
  async destroy({ params, response }) {
    try {
      const { id } = params;
      const account = await Account.findOrFail(id);
      await account.delete();
      return response.json({ message: 'A conta foi deletada com sucesso' });
    } catch (error) {
      response.status(400).send({ message: 'Conta não existe' });
    }
  }
}

module.exports = AccountController;
