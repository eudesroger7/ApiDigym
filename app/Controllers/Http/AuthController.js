'use strict';

const User = use('App/Models/User');

class AuthController {
    /**
     * token
     * @param auth
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async token({ auth, request, response }) {
        const { email, password } = request.body;
        const token = await auth.attempt(email, password);
        return response.json({ type: token.type, access_token: token.token });
    }

    /**
     * get user authenticated
     * @param auth
     * @param response
     * @returns {Promise<*>}
     */
    async authenticated({ auth, response }) {
        const { id } = await auth.getUser();
        const user = await User.findOrFail(id);
        await user.load('student', builder => builder.with('gym'));
        await user.load('owner');
        return response.json(user);
    }
}

module.exports = AuthController;
