'use strict';
const Student = use('App/Models/Student');

class StudentController {
    /**
     * index
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async index({ request, response }) {
        const { page = 1, limit = 20, search } = request.all();

        const students = await Student.query().select('id', 'user_id', 'gym_id')
            .with('user', builder => builder.select('id', 'name', 'email'))
            .with('gym', builder => builder.select('id', 'name'))
            .paginate(+page, +limit);
        return response.json(students);
    }

    /**
     * store
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async store({ request, response }) {
        const { user_id, gym_id } = request.body;
        const student = await Student.create({ user_id, gym_id });
        return response.json(student);
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
            const student = await Student.findOrFail(id);
            await student.load('user', builder => builder.select('id', 'name', 'email'))
            await student.load('gym', builder => builder.select('id', 'name'))
            return response.json(student);
        } catch (error) {
            response.status(400).send({ message: 'Aluno não existe' });
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
            const student = await Student.findOrFail(id);
            const { gym_id = student.gym_id } = request.body;
            student.gym_id = gym_id;
            await student.save();
            return response.json(student);
        } catch (error) {
            response.status(400).send({ message: 'Aluno não existe' });
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
            const student = await Student.findOrFail(id);
            await student.delete();
            return response.json({ message: 'O aluno foi deletado com sucesso' });
        } catch (error) {
            response.status(400).send({ message: 'Aluno não existe' });
        }
    }
}

module.exports = StudentController;
