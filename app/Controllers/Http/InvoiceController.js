'use strict';
const Invoice = use('App/Models/Invoice');
const { invoiceTransformer, invoiceTransformerCollection } = use('App/Transformers/Invoice');
const Client = use('App/Models/Client');

const STATUS_OPENED = 0;
const STATUS_PAID = 1;
const STATUS_CANCELED = 2;
const STATUS_EXPIRED = 4;

class InvoiceController {
  /**
   * index
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async index({ request, response }) {
    const { page = 1, limit = 20, status = 0 } = request.all();
    const invoices = await Invoice.query()
      .where('status', status)
      .with('client')
      .with('receipts')
      .paginate(+page, +limit);
    return response.json(invoiceTransformerCollection(invoices));
  }

  /**
   * store
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const { expire_date, amount, client_id } = request.body;
    const client = await Client.find(client_id);

    if (!client) return response.status(422).send({ error: true, message: 'Cliente não encontrado' });

    await client.load('planType');

    const invoice = await Invoice.create({
      expire_date,
      amount,
      client_id,
      plan_type_name: client.toJSON().planType.name,
      status: STATUS_OPENED
    });

    return response.json(invoice);
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
      const invoice = await Invoice.findOrFail(id);
      await invoice.load('client');
      return response.json(invoiceTransformer(invoice));
    } catch (error) {
      response.status(400).send({ message: 'Fatura não existe' });
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
      const invoice = await Invoice.findOrFail(id);
      const {
        expire_date = invoice.expire_date,
        amount = invoice.amount,
      } = request.body;
      invoice.expire_date = expire_date;
      invoice.amount = amount;
      await invoice.save();
      return response.json(invoice);
    } catch (error) {
      response.status(400).send({ message: 'Fatura não existe' });
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
      const invoice = await Invoice.findOrFail(id);
      await invoice.delete();
      return response.json({ message: 'A fatura foi deletada com sucesso' });
    } catch (error) {
      response.status(400).send({ message: 'Fatura não existe' });
    }
  }

  /**
   * cancel
   * @param params
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async cancel({ params, request, response }) {
    try {
      const { id } = params;
      const invoice = await Invoice.findOrFail(id);
      const { reason_for_cancellation } = request.body;

      invoice.canceled_at = new Date();
      invoice.reason_for_cancellation = reason_for_cancellation;
      invoice.status = STATUS_CANCELED;

      await invoice.save();
      return response.json({ error: false, message: 'A fatura foi cancelada' });
    } catch (error) {
      response.status(400).send({ message: 'Fatura não existe' });
    }
  }
}

module.exports = InvoiceController;
