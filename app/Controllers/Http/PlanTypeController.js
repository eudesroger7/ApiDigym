'use strict';
const PlanType = use('App/Models/PlanType');
const { planTypeTransformer, planTypeTransformerCollection } = use('App/Transformers/PlanType');

class PlanTypeController {
  /**
   * index
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async index({ request, response }) {
    const { page = 1, limit = 20, search } = request.all();
    const planTypes = await PlanType.query().where(builder => {
      if (search) builder.where('name', 'like', `%${search}%`).orWhere('price', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`);
    }).paginate(+page, +limit);
    return response.json(planTypeTransformerCollection(planTypes));
  }

  /**
   * store
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const { name, description, price } = request.body;
    const planType = await PlanType.create({ name, description, price });
    return response.json(planTypeTransformer(planType));
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
      const planType = await PlanType.findOrFail(id);
      await planType.load('clients');
      return response.json(planType);
    } catch (error) {
      response.status(400).send({ message: 'Plano não existe' });
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
      const planType = await PlanType.findOrFail(id);
      const {
        name = planType.name,
        description = planType.description,
        price = client.price } = request.body;
      planType.name = name;
      planType.description = description;
      planType.price = price;
      await planType.save();
      return response.json(planTypeTransformer(planType));
    } catch (error) {
      response.status(400).send({ message: 'Plano não existe' });
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
      const planType = await PlanType.findOrFail(id);
      await planType.delete();
      return response.json({ message: 'O plano foi deletado com sucesso' });
    } catch (error) {
      response.status(400).send({ message: 'Plano não existe' });
    }
  }
}

module.exports = PlanTypeController;
