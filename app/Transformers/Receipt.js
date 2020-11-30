'use strict';

const receiptTransformer = (receipt) => {
  return {
    id: receipt.id,
    payment_date: receipt.payment_date,
    amount: receipt.amount,
    invoice_id: receipt.invoice_id,
    created_at: receipt.created_at,
    invoice: receipt.invoice.id ? receipt.invoice : receipt.toJSON().invoice,
  };
};

const receiptTransformerCollection = (receiptsCollection) => {
  const collection = receiptsCollection.toJSON();
  const collectionTransformed = collection.data.map(receiptTransformer);
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

module.exports = { receiptTransformer, receiptTransformerCollection };
