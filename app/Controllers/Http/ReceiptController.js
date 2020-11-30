'use strict';
const Receipt = use('App/Models/Receipt');
const { receiptTransformer, receiptTransformerCollection } = use('App/Transformers/Receipt');

class ReceiptController {
  /**
   * index
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async index({ request, response }) {
    const { page = 1, limit = 20 } = request.all();
    const receipts = await Receipt.query().with('invoice').paginate(+page, +limit);
    return response.json(receiptTransformerCollection(receipts));
  }

  /**
   * store
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const { payment_date, amount, invoice_id } = request.body;
    const receipt = await Receipt.create({ payment_date, amount, invoice_id });
    return response.json(receipt);
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
      const receipt = await Receipt.findOrFail(id);
      await receipt.load('invoice');
      return response.json(receiptTransformer(receipt));
    } catch (error) {
      response.status(400).send({ message: 'Recibo não existe' });
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
      const receipt = await Receipt.findOrFail(id);
      const {
        payment_date = receipt.payment_date,
        amount = receipt.amount,
      } = request.body;
      receipt.payment_date = payment_date;
      receipt.amount = amount;
      await receipt.save();
      return response.json(receipt);
    } catch (error) {
      response.status(400).send({ message: 'Recibo não existe' });
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
      const receipt = await Receipt.findOrFail(id);
      await receipt.delete();
      return response.json({ message: 'O recibo foi deletado com sucesso' });
    } catch (error) {
      response.status(400).send({ message: 'Recibo não existe' });
    }
  }
}

module.exports = ReceiptController;
