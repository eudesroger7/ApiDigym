'use strict';

const { format } = require("date-fns");

const Training = use('App/Models/Training');

class TrainingController {
    /**
     * index
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async index({ request, response }) {
        const { page = 1, limit = 20, student_id, gym_id } = request.all();

        const training = await Training.query().select('id', 'start_time', 'finish_time', 'gym_id', 'student_id', 'created_at')
            .where(builder => {
                if (student_id) builder.where('student_id', student_id)
                if (gym_id) builder.where('gym_id', gym_id)
            })
            .with('gym', builder => builder.select('id', 'name'))
            .paginate(+page, +limit);
        return response.json(training);
    }

    /**
     * store
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async store({ request, response }) {
        const { student_id, gym_id } = request.body;
        const start_time = format(new Date(), 'HH:mm');
        const training = await Training.create({ student_id, gym_id, start_time });
        return response.json(training);
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
            const training = await Training.findOrFail(id);
            const {
                observation = training.observation,
                finish_time = training.finish_time
            } = request.body;

            training.observation = observation;
            training.finish_time = finish_time;

            await training.save();
            return response.json(training);
        } catch (error) {
            response.status(400).send({ message: 'Treino não existe' });
        }
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
            const training = await Training.findOrFail(id);
            await training.load('student', builder => {
                builder.with('user', query => query.select('id', 'name', 'email'));
            });
            await training.load('gym', builder => {
                builder.select('id', 'name', 'address');
            });
            return response.json(training);
        } catch (error) {
            response.status(400).send({ message: 'Treino não existe' });
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
            const training = await Training.findOrFail(id);
            await training.delete();
            return response.json({ message: 'O treino foi deletado com sucesso' });
        } catch (error) {
            response.status(400).send({ message: 'Treino não existe' });
        }
    }
}

module.exports = TrainingController;
