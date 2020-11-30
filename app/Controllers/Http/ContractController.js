'use strict';
const Contract = use('App/Models/Contract');
const { contractTransformer, contractTransformerCollection } = use('App/Transformers/Contract');
const { add, parseISO, format } = use('date-fns');

class ContractController {
  /**
   * index
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async index({ request, response }) {
    const { page = 1, limit = 20, search } = request.all();
    const contracts = await Contract.query().whereHas('client', (builder) => {
      if (search) builder.where('name', 'like', `%${search}%`);
    }).orWhereHas('planType', (builder) => {
      if (search) builder.where('name', 'like', `%${search}%`);
    }).with('client').with('planType').paginate(+page, +limit);
    return response.json(contractTransformerCollection(contracts));
  }

  /**
   * store
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const { accession_date, validity_period, client_id, plan_type_id } = request.body;
    const expiration_date = format(add(parseISO(accession_date), {
      months: validity_period
    }), 'yyyy-MM-dd');
    const contract = await Contract.create({ accession_date, expiration_date, validity_period, client_id, plan_type_id });
    return response.json(contractTransformer(contract));
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
      const contract = await Contract.findOrFail(id);
      await contract.load('client');
      await contract.load('planType');
      return response.json(contract);
    } catch (error) {
      response.status(400).send({ message: 'Contrato não existe' });
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
      const contract = await Contract.findOrFail(id);
      const {
        validity_period = contract.validity_period,
      } = request.body;

      const new_expiration_date = format(add(parseISO(contract.accession_date), {
        months: validity_period
      }), 'yyyy-MM-dd');
      contract.validity_period = validity_period;
      contract.expiration_date = new_expiration_date;
      await contract.save();
      return response.json(contractTransformer(contract));
    } catch (error) {
      response.status(400).send({ message: 'Contrato não existe' });
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
      const contract = await Contract.findOrFail(id);
      await contract.delete();
      return response.json({ message: 'O contrato foi deletado com sucesso' });
    } catch (error) {
      response.status(400).send({ message: 'Contrato não existe' });
    }
  }
}

module.exports = ContractController;
