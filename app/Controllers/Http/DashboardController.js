'use strict';

const Client = use('App/Models/Client');
const PlanType = use('App/Models/PlanType');
const { format, getDate } = use('date-fns');

class DashboardController {
  /**
   * general
   * @param auth
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async general({ response }) {
    const dayMonth = getDate(new Date());

    const clientsCount = await Client.query().getCount();
    const planTypesCount = await PlanType.query().getCount();
    const clientsPerPlanType = await PlanType.query().select('name', 'id').withCount('clients').fetch();

    const nextPaymentDays = await Client.query()
                                        .select('id', 'name', 'payment_day')
                                        .where('payment_day', '>=', dayMonth)
                                        .orderBy('payment_day').fetch();

    return response.json({ nextPaymentDays, clientsCount, planTypesCount, clientsPerPlanType });
  }
}

module.exports = DashboardController;
