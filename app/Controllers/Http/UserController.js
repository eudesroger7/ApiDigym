'use strict';
const User = use('App/Models/User');
const { userTransformer, userTransformerCollection } = use('App/Transformers/User');
const Hash = use('Hash');

class UserController {
    /**
     * index
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async index({ request, response }) {
        const { page = 1, limit = 20, search } = request.all();
        const users = await User.query()
            .select('id', 'name', 'email', 'user_type_id')
            .where(builder => {
                if (search) builder.where('name', 'like', `%${search}%`).orWhere('email', 'like', `%${search}%`);
            })
            .with('student', builder => builder.select('id', 'user_id', 'gym_id'))
            .with('owner', builder => builder.select('id', 'user_id'))
            .paginate(+page, +limit);
        return response.json(users);
    }

    /**
     * store
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async store({ request, response }) {
        const { name, email, user_type_id, password } = request.body;
        let user = await User.query().where('email', email).first();

        if (user && user.email == email) {
            return response.status(422).send({ error: true, field: 'email', message: 'Já existe um usuário com esse e-mail' });
        }

        user = await User.create({ name, email, user_type_id, password });
        return response.json(userTransformer(user));
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
            const user = await User.findOrFail(id);
            return response.json(userTransformer(user));
        } catch (error) {
            response.status(400).send({ message: 'Usuário não existe' });
        }
    }

    /**
     * update
     * @param params
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async update({ params, request, response }) {
        try {
            const { id } = params;
            const user = await User.findOrFail(id);
            const {
                name = user.name,
                user_type_id = user.user_type_id,
                email = user.email
            } = request.body;

            user.name = name;
            user.user_type_id = user_type_id;
            user.email = email;
            await user.save();
            return response.json(userTransformer(user));
        } catch (error) {
            response.status(400).send({ message: 'Usuário não existe' });
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
            const user = await User.findOrFail(id);
            await user.delete();
            return response.json({ message: 'O usuário foi deletado com sucesso' });
        } catch (error) {
            response.status(400).send({ message: 'Usuário não existe' });
        }
    }

    /**
    * changePassword
    * @param auth
    * @param request
    * @param response
    * @returns {Promise<*>}
    */
    async changePassword({ request, auth, response }) {
        const user = await auth.current.user;
        const { currentPassword, newPassword } = request.body;

        const verifyPassword = await Hash.verify(currentPassword, user.password);

        if (!verifyPassword) {
            return response.status(422).json({ status: 'error', field: 'currentPassword', message: 'A senha atual está incorreta.' });
        }

        user.password = newPassword;
        await user.save();

        return response.json({ status: 'success', message: 'Senha atualizada com sucesso!' });
    }
}

module.exports = UserController;
