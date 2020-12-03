'use strict';

const ownerTransformer = (owner) => {
    return {
        id: owner.id,
        created_at: owner.created_at
    };
};

const ownerTransformerCollection = (usersCollection) => {
    const collection = usersCollection.toJSON();
    const usersTransformed = collection.data.map(ownerTransformer);
    return {
        data: usersTransformed,
        meta: {
            pagination: {
                total: collection.total,
                page: collection.page,
                perPage: collection.perPage,
                lastPage: collection.lastPage,
            }
        }
    };
};

module.exports = { ownerTransformer, ownerTransformerCollection };
