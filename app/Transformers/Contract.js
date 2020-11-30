'use strict';

const contractTransformer = (contract) => {
  return {
    id: contract.id,
    client_id: contract.client_id,
    plan_type_id: contract.plan_type_id,
    accession_date: contract.accession_date,
    expiration_date: contract.expiration_date,
    validity_period: contract.validity_period,
    client: contract.client.id ? contract.client : contract.toJSON().client,
    plan_type: contract.planType.id ? contract.planType : contract.toJSON().planType,
  };
};

const contractTransformerCollection = (contractsCollection) => {
  const collection = contractsCollection.toJSON();
  const contractsTransformed = collection.data.map(contractTransformer);
  return {
    data: contractsTransformed, meta: {
      pagination: {
        total: collection.total,
        page: collection.page,
        perPage: collection.perPage,
        lastPage: collection.lastPage,
      }
    }
  };
};

module.exports = { contractTransformer, contractTransformerCollection };
