const STATUS = Object.freeze({
    INCOMPLETE: "INCOMPLETE",
    COMPLETE: "COMPLETE"
});

async function fetchTodos() {
    const res = await fetch("http://localhost:3000/get-all-todos", {
        method: "GET",
    });
    const todos = await res.json();
    render(todos);
}

async function addTodo() {
    const new_todo = document.getElementById("input").value;
    if (new_todo != null && new_todo != "") {
        const res = await fetch("http://localhost:3000/create-todo", {
            method: "POST",
            body: JSON.stringify({
                "todo": new_todo
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const todos = await res.json();
        render(todos);
    }
}

async function deleteTodo(id) {
    const res = await fetch("http://localhost:3000/delete-todo", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id": id
        })
    });
    const todos = await res.json();
    render(todos);
}

async function deleteAllTodos() {
    const res = await fetch("http://localhost:3000/delete-all-todos", {
        method: "DELETE"
    });
    const response = await res.text()
    alert(response);
    render([]);
}

async function updateStatus(id) {
    const res = await fetch("http://localhost:3000/edit-todo-status", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id": id
        })
    });
    const todos = await res.json();
    render(todos);
}

async function updateTodo(id) {
    const new_todo = document.getElementById(id).childNodes[0].value;
    const res = await fetch("http://localhost:3000/edit-todo", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id": id,
            "todo": new_todo
        })
    });
    const todos = await res.json();
    render(todos);
}

function editTodo(id) {
    todo_element = document.getElementById(id);
    todo = todo_element.childNodes[0].innerHTML;

    const edit_box = document.createElement("input");
    edit_box.value = todo;

    const done_button = document.createElement("button");
    done_button.setAttribute("onClick", `updateTodo("${id}")`);
    done_button.innerHTML = "Done";

    todo_element.innerHTML = "";
    todo_element.appendChild(edit_box);
    todo_element.appendChild(done_button);
}

function render(todos) {
    todo_body = document.getElementById("body")
    todo_body.innerHTML = "";
    document.getElementById("input").value = "";
    todo_incomplete = todos.filter(todo => todo.status == STATUS.INCOMPLETE);
    todo_complete = todos.filter(todo => todo.status == STATUS.COMPLETE);
    sorted_todo = [];
    todo_incomplete.forEach(todo => {sorted_todo.push(todo)});
    todo_complete.forEach(todo => {sorted_todo.push(todo)});
    renderTodos(sorted_todo);
}

function renderTodos(todos) {
    for (i = 0; i < sorted_todo.length; i++) {
        const todo_element = document.createElement("div")
        todo_element.setAttribute("id",sorted_todo[i].id)
        if (sorted_todo[i].status == STATUS.INCOMPLETE) {
            todo_element.innerHTML = `<span>${sorted_todo[i].todo}</span>`
        } else {
            todo_element.innerHTML = `<span><s>${sorted_todo[i].todo}</s></span>`
        }

        const delete_span = document.createElement("span")
        const delete_button = document.createElement("button")
        delete_button.innerHTML = "Delete"
        delete_button.setAttribute("onClick", `deleteTodo("${sorted_todo[i].id}")`)
        delete_span.appendChild(delete_button)

        const edit_span = document.createElement("span")
        const edit_button = document.createElement("button")
        edit_button.innerHTML = "Edit"
        edit_button.setAttribute("onClick", `editTodo("${sorted_todo[i].id}")`)
        edit_span.appendChild(edit_button)

        const update_status_span = document.createElement("span")
        const update_status_button = document.createElement("button")
        if (sorted_todo[i].status == STATUS.INCOMPLETE) {
            update_status_button.innerHTML = "Done"
        } else {
            update_status_button.innerHTML = "Undo"
        }
        update_status_button.setAttribute("onClick", `updateStatus("${sorted_todo[i].id}")`)
        update_status_span.appendChild(update_status_button)

        todo_element.appendChild(delete_span)
        if (sorted_todo[i].status == STATUS.INCOMPLETE) {
            todo_element.appendChild(edit_span)
        }
        todo_element.appendChild(update_status_span)
        todo_body.appendChild(todo_element)
    }
}