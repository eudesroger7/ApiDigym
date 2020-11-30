'use strict';

const invoiceTransformer = (invoice) => {
  return {
    id: invoice.id,
    expire_date: invoice.expire_date,
    amount: invoice.amount,
    client_id: invoice.client_id,
    canceled: invoice.canceled,
    reason_for_cancellation: invoice.reason_for_cancellation,
    created_at: invoice.created_at,
    client: invoice.client.id ? invoice.client : invoice.toJSON().client,
    receipts: invoice.receipts,
    plan_type_name: invoice.plan_type_name,
    status: invoice.status,
    description: invoice.description,
  };
};

const invoiceTransformerCollection = (invoicesCollection) => {
  const collection = invoicesCollection.toJSON();
  const collectionTransformed = collection.data.map(invoiceTransformer);
  return {
    data: collectionTransformed, meta: {
      pagination: {
        total: collection.total,
        page: collection.page,
        perPage: collection.perPage,
        lastPage: collection.lastPage,
      }
    }
  };
};

module.exports = { invoiceTransformer, invoiceTransformerCollection };
