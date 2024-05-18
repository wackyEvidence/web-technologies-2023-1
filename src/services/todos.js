import TodosRepository from "../repository/todos.js";

class Todos {
    static async add(values) {
        return await TodosRepository.create(values);
    }

    static async getAll() {
        return await TodosRepository.getAll();;
    }

    static async getById(id) {
        return await TodosRepository.getById(id);;
    }

    static async delete(id) {
        return await TodosRepository.delete(id);;
    }

    static async update(id, values) {
        return await TodosRepository.update(id, values);
    }
}

export default Todos;