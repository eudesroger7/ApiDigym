'use strict';

const planTypeTransformer = (planType) => {
  return {
    id: planType.id,
    name: planType.name,
    description: planType.description,
    price: planType.price
  };
};

const planTypeTransformerCollection = (planTypesCollection) => {
  const collection = planTypesCollection.toJSON();
  const planTypesTransformed = collection.data.map(planTypeTransformer);
  return {
    data: planTypesTransformed, meta: {
      pagination: {
        total: collection.total,
        page: collection.page,
        perPage: collection.perPage,
        lastPage: collection.lastPage,
      }
    }
  };
};

module.exports = { planTypeTransformer, planTypeTransformerCollection };
