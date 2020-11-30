'use strict';

const userTransformer = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type_id: user.user_type_id,
        created_at: user.created_at
    };
};

const userTransformerCollection = (usersCollection) => {
    const collection = usersCollection.toJSON();
    const usersTransformed = collection.data.map(userTransformer);
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

module.exports = { userTransformer, userTransformerCollection };
