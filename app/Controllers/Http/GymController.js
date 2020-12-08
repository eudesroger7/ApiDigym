'use strict';
const Gym = use('App/Models/Gym');
const Student = use('App/Models/Student');

class GymController {
    /**
    * index
    * @param request
    * @param response
    * @returns {Promise<*>}
    */
    async index({ request, response }) {
        const { page = 1, limit = 20, search, owner_id } = request.all();
        const gyms = await Gym.query()
            .where(builder => {
                if (search) builder.where('name', 'like', `%${search}%`).orWhere('phone', 'like', `%${search}%`);
                if (owner_id) builder.where('owner_id', owner_id)
            })
            .withCount('students')
            .paginate(+page, +limit);
        return response.json(gyms);
    }

    /**
    * store
    * @param request
    * @param response
    * @returns {Promise<*>}
    */
    async store({ request, response }) {
        const {
            name,
            address,
            lat,
            lng,
            capacity,
            phone,
            owner_id
        } = request.body;
        const gym = await Gym.create({
            name,
            address,
            lat,
            lng,
            capacity,
            phone,
            owner_id
        });
        return response.json(gym);
    }

    /**
    * show
    * @param params
    * @param response
    * @returns {Promise<*>}
    */
    async show({ params, response }) {
        try {
            const { id } = params;
            const gym = await Gym.findOrFail(id);
            await gym.load('owner', builder => builder.select('id', 'user_id').with('user', query => query.select('id', 'name', 'email')));
            return response.json(gym);
        } catch (error) {
            response.status(400).send({ message: 'Academia não existe' });
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
            const gym = await Gym.findOrFail(id);
            const {
                name = gym.name,
                address = gym.address,
                lat = gym.lat,
                lng = gym.lng,
                capacity = gym.capacity,
                phone = gym.phone,
            } = request.body;

            gym.name = name;
            gym.address = address;
            gym.lat = lat;
            gym.lng = lng;
            gym.capacity = capacity;
            gym.phone = phone;
            await gym.save();
            return response.json(gym);
        } catch (error) {
            response.status(400).send({ message: 'Academia não existe' });
        }
    }

    /**
    * destroy
    * @param params
    * @param response
    * @returns {Promise<*>}
    */
    async destroy({ params, response }) {
        try {
            const { id } = params;
            const gym = await Gym.findOrFail(id);
            await gym.delete();
            return response.json({ message: 'A academia foi deletada com sucesso' });
        } catch (error) {
            response.status(400).send({ message: 'academia não existe' });
        }
    }
}

module.exports = GymController;
