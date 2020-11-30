'use strict';
const { userTransformer } = use('App/Transformers/User');

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
    const userLogged = await auth.getUser();
    return response.json(userTransformer(userLogged));
  }
}

module.exports = AuthController;
