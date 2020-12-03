'use strict';
const Owner = use('App/Models/Owner');
const { ownerTransformer, ownerTransformerCollection } = use('App/Transformers/Owner');

class OwnerController {
    /**
     * index
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async index({ request, response }) {
        const { page = 1, limit = 20, search } = request.all();

        const owners = await Owner.query().select('id', 'user_id', 'created_at').with('user', builder => {
            builder.select('id', 'name', 'email', 'user_type_id', 'created_at');
        }).paginate(+page, +limit);
        return response.json(owners);
    }

    /**
     * store
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async store({ request, response }) {
        const { user_id } = request.body;
        const owner = await Owner.create({ user_id });
        return response.json(owner);
    }

    /**
     * show
     * @param params
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async show({ params, response }) {
        try {
            const { id } = params;
            const owner = await Owner.findOrFail(id);
            await owner.load('user', builder => {
                builder.select('id', 'name', 'email', 'user_type_id', 'created_at');
            });
            return response.json(owner);
        } catch (error) {
            response.status(400).send({ message: 'Proprietário não existe' });
        }
    }

    /**
     * destroy
     * @param params
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async destroy({ params, response }) {
        try {
            const { id } = params;
            const owner = await Owner.findOrFail(id);
            await owner.delete();
            return response.json({ message: 'O proprietário foi deletado com sucesso' });
        } catch (error) {
            response.status(400).send({ message: 'Proprietário não existe' });
        }
    }
}

module.exports = OwnerController;
