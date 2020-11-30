'use strict';
const Client = use('App/Models/Client');
const { clientTransformer, clientTransformerCollection, clientWithAccountsTransformer } = use('App/Transformers/Client');

class ClientController {
  /**
   * index
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async index({ request, response }) {
    const { page = 1, limit = 20, search } = request.all();

    const clients = await Client.query().where(builder => {
      if (search) builder.where('name', 'like', `%${search}%`).orWhere('email', 'like', `%${search}%`).orWhere('phone', 'like', `%${search}%`);
    }).with('planType').paginate(+page, +limit);

    return response.json(clientTransformerCollection(clients));
  }

  /**
   * store
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const { name, email, phone, payment_day, plan_type_id } = request.body;
    let client = await Client.findBy('email', email);
    if (!client) {
      client = await Client.create({ name, email, phone, payment_day, plan_type_id });
      await client.load('planType');
      return response.json(clientTransformer(client));
    }
    return response.status(422).send({ error: true, message: 'Já existe um cliente com esse email' });
  }

  /**
   * show
   * @param params
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async show({ params, request, response }) {
    try {
      const { id } = params;
      const client = await Client.findByOrFail('id', id);
      await client.load('planType');
      await client.load('accounts');
      return response.json(clientWithAccountsTransformer(client));
    } catch (error) {
      response.status(400).send({ message: 'Cliente não existe' });
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
      const client = await Client.findOrFail(id);
      const {
        name = client.name,
        phone = client.phone,
        email = client.email,
        payment_day = client.payment_day,
        plan_type_id = client.plan_type_id
      } = request.body;

      const existEmail = await Client.query().where('email', email).whereNot('email', client.email).first();

      if (existEmail) return response.status(422).send({ error: true, message: 'Já existe um usuário com esse e-mail' });

      client.name = name;
      client.phone = phone;
      client.email = email;
      client.payment_day = payment_day;
      client.plan_type_id = plan_type_id;
      await client.save();
      await client.load('planType');
      return response.json(clientTransformer(client));
    } catch (error) {
      response.status(400).send({ message: 'Cliente não existe' });
    }
  }

  /**
   * destroy
   * @param params
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async destroy({ params, request, response }) {
    try {
      const { id } = params;
      const client = await Client.findOrFail(id);
      await client.delete();
      return response.json({ message: 'O cliente foi deletado com sucesso' });
    } catch (error) {
      response.status(400).send({ message: 'Cliente não existe' });
    }
  }
}

module.exports = ClientController;
