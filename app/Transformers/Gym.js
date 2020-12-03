'use strict';

const gymTransformer = (gym) => {
    return {
        id: gym.id,
        name: gym.name,
        address: gym.address,
        phone: gym.phone,
        capacity: gym.capacity,
        created_at: gym.created_at
    };
};

const gymTransformerCollection = (gymsCollection) => {
    const collection = gymsCollection.toJSON();
    const gymsTransformed = collection.data.map(gymTransformer);
    return {
        data: gymsTransformed,
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

module.exports = { gymTransformer, gymTransformerCollection };
