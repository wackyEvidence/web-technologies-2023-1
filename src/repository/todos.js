import api from "../services/api.js";

const TodosRepository = {
    async getAll() {
        return await api('/todo/', {
            method: "GET"
        })
    },

    async getById(id) {
        return await api(`/todo/${id}`, {
            method: 'GET'
        });
    },

    async create(values) {
        return await api('/todo', {
            method: 'POST',
            body: JSON.stringify(values)
        });
    },

    async delete(id) {
        return await api(`/todo/${id}`, {
            method: "DELETE"
        })
    },

    async update(id, values) {
        return await api(`/todo/${id}`, {
            method: "PUT",
            body: JSON.stringify(values)
        })
    }
}

export default TodosRepository