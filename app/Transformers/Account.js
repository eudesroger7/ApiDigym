'use strict';

const accountTransformer = (account) => {
  return {
    id: account.id,
    nickname: account.nickname,
    username: account.username,
    password: account.password,
    type: account.type,
    client_id: account.client_id,
    created_at: account.created_at,
  };
};

const accountTransformerCollection = (accountsCollection) => {
  const collection = accountsCollection.toJSON();
  const accountsTransformed = collection.data.map(accountTransformer);
  return {
    data: accountsTransformed, meta: {
      pagination: {
        total: collection.total,
        page: collection.page,
        perPage: collection.perPage,
        lastPage: collection.lastPage,
      }
    }
  };
};

module.exports = { accountTransformer, accountTransformerCollection };
