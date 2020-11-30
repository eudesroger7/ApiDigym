'use strict';

const { planTypeTransformer } = use('App/Transformers/PlanType');
const { accountTransformerCollection } = use('App/Transformers/Account');

const clientTransformer = (client) => {
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    payment_day: client.payment_day,
    plan_type_id: client.plan_type_id,
    created_at: client.created_at,
    plan_type: planTypeTransformer(client.planType.id ? client.planType : client.toJSON().planType)
  };
};

const clientTransformerCollection = (clientsCollection) => {
  const collection = clientsCollection.toJSON();
  const clientsTransformed = collection.data.map(clientTransformer);
  return {
    data: clientsTransformed, meta: {
      pagination: {
        total: collection.total,
        page: collection.page,
        perPage: collection.perPage,
        lastPage: collection.lastPage,
      }
    }
  };
};

const clientWithAccountsTransformer = (client) => {
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    payment_day: client.payment_day,
    plan_type_id: client.plan_type_id,
    created_at: client.created_at,
    plan_type: planTypeTransformer(client.toJSON().planType),
    accounts: client.toJSON().accounts
  };
};

module.exports = { clientTransformer, clientTransformerCollection, clientWithAccountsTransformer };
