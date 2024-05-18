import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Todos from "../services/todos.js";


const addTodoButton = document.getElementById("add-todo");
const addTodoModal = document.getElementById("add-todo-modal");
const editTodoModal = document.getElementById("edit-todo-modal");
const closeAddTodo = document.getElementById("close-add-todo");
const closeEditTodo = document.getElementById("close-edit-todo");
const addTodoForm = document.getElementById("add-todo-form");
const editTodoForm = document.getElementById("edit-todo-form");
const editTodoName = document.getElementById("todo-name-edit");
const editCompletedCheckbox = document.getElementById("is-complete-edit");
const editLinks = document.querySelector('edit-link');
const deleteLinks = document.querySelector('delete-link');
let editingId = null;

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }
    // create POST /todo { description: string }
    // get get /todo/1 - 1 это id
    // getAll get /todo
    // update put /todo/1 - 1 это id { description: string }
    // delete delete /todo/1 - 1 это id
    //console.log(await Todos.getAll());
    fetchTasks();
}

async function fetchTasks() {
    var tasks = await Todos.getAll();
    tasks = tasks.data;
    const taskTable = document.getElementById("task-table");

    while (taskTable.rows.length > 1) {
        taskTable.deleteRow(1);
    }

    tasks.forEach(e => {
        // Создаем tr
        const taskItem = document.createElement("tr");
        const taskIdTd = document.createElement("td");
        const taskNameTd = document.createElement("td");
        const taskCompleteTd = document.createElement("td");
        const taskActionsTd = document.createElement("td");
        // Создаем чекбокс для отметки о завершении

        taskIdTd.appendChild(document.createTextNode(e.id));
        taskCompleteTd.appendChild(document.createTextNode(e.completed ? "Да" : "Нет"));
        taskNameTd.appendChild(document.createTextNode(e.description));
        // Создаем ссылки для изменения и удаления задачи
        const editLink = document.createElement("a");
        editLink.href = "";
        editLink.textContent = "Изменить";
        editLink.setAttribute("data-id", e.id);

        // открываем модальную форму и устанавливаем изначальное значение чекбокса и имени
        editLink.addEventListener('click', async function (e) {
            e.preventDefault();
            editTodoModal.style.display = "block";
            editingId = this.getAttribute("data-id");
            const todo = await Todos.getById(editingId);
            editTodoName.value = todo.data.description;
            editCompletedCheckbox.checked = todo.data.completed;
        })

        const deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.textContent = "Удалить";
        deleteLink.setAttribute("data-id", e.id);

        deleteLink.addEventListener('click', async function (e) {
            e.preventDefault();
            await Todos.delete(this.getAttribute("data-id"));
            fetchTasks();
        })


        taskActionsTd.appendChild(editLink);
        taskActionsTd.appendChild(document.createTextNode("\t"));
        taskActionsTd.appendChild(deleteLink);

        taskItem.appendChild(taskIdTd);
        taskItem.appendChild(taskNameTd);
        taskItem.appendChild(taskCompleteTd);
        taskItem.appendChild(taskActionsTd);
        // Добавляем элемент tr в table
        taskTable.appendChild(taskItem);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}

addTodoButton.addEventListener('click', () => {
    addTodoModal.style.display = 'block';
});

closeAddTodo.addEventListener('click', () => {
    addTodoModal.style.display = 'none';
})

closeEditTodo.addEventListener('click', () => {
    editTodoModal.style.display = 'none';
    editingId = null;
});

addTodoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const todoName = document.getElementById("todo-name-add").value;
    await Todos.add({ description: todoName });
    fetchTasks();
    addTodoForm.reset();
});

editCompletedCheckbox.addEventListener('click', async function (e) {
    e.preventDefault();
    const response = await Todos.update(editingId, { completed: editCompletedCheckbox.checked });
    if (response.ok) {
        editCompletedCheckbox.checked = !editCompletedCheckbox.checked;
        fetchTasks();
    }
    else {
        console.error("Ошибка обновления статуса задачи");
    }
})
