const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const cors = require("cors")

const STATUS = Object.freeze({
    INCOMPLETE: "INCOMPLETE",
    COMPLETE: "COMPLETE"
});

const app = express();
app.use(express.json());
app.use(cors())

function readFilePromisified(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(path, "utf-8", (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } catch(err) {
            reject(err);
        }
    });
}

function writeFilePromisified(path, content) {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(path, content, "utf-8", err => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch(err) {
            reject(err);
        }
    });
}

app.get("/get-all-todos", async (req, res) => {
    try {
        const data = await readFilePromisified("data.json");
        if (data != "") {
            todos = JSON.parse(data);
        } else {
            todos = []
        }
        res.json(todos);
    } catch (err) {
        console.log(err);
        res.status(404).send([]);
    }
})

app.post("/create-todo", async (req, res) => {
    try {
        let data = await readFilePromisified("data.json");
        if (data != "") {
            todos = JSON.parse(data);
        } else (
            todos = []
        )
        if (req.body.todo != null) {
            const newTodo = {
                "id": uuidv4(),
                "todo": req.body.todo,
                "status": STATUS.INCOMPLETE 
            };
            todos.push(newTodo)
            await writeFilePromisified("data.json", JSON.stringify(todos));
        }
        res.json(todos);
    } catch (err) {
        console.log(err);
        todos = []
        if (req.body.todo != null) {
            const newTodo = {
                "id": uuidv4(),
                "todo": req.body.todo,
                "status": STATUS.INCOMPLETE 
            };
            todos.push(newTodo)
            await writeFilePromisified("data.json", JSON.stringify(todos));
        }
        res.send(todos);
    }
})

app.delete("/delete-all-todos", async (req, res) => {
    writeFilePromisified("data.json", "");
    res.send("Deleted all todos");
})

app.delete("/delete-todo", async (req, res) => {
    try {
        const id = req.body.id;
        let data = await readFilePromisified("data.json");
        if (data != "") {
            todos = JSON.parse(data);
            if (id != null) {
                index = todos.findIndex(todo => todo.id == id)
                if (index >= 0) {
                    todos.splice(index, 1);
                    await writeFilePromisified("data.json" ,JSON.stringify(todos));
                }
            }
        } else {
            todos = []
        }
        res.json(todos);
    } catch (err) {
        console.log(err);
        res.status(404).send([]);
    }
})

app.put("/edit-todo", async (req, res) => {
    try {
        const id = req.body.id;
        const updated_todo = req.body.todo;
        let data = await readFilePromisified("data.json");
        if (data != "") {
            todos = JSON.parse(data);
            if (id != null) {
                index = todos.findIndex(todo => todo.id == id);
                if (index >= 0) {
                    todos[index].todo = updated_todo;
                    await writeFilePromisified("data.json", JSON.stringify(todos));
                }
            }
        } else {
            todos = []
        }
        res.json(todos);
    } catch (err) {
        console.log(err);
        res.status(404).send([]);
    }
})

app.put("/edit-todo-status", async (req, res) => {
    try {
        const id = req.body.id;
        let data = await readFilePromisified("data.json");
        if (data != "") {
            todos = JSON.parse(data);
            if (id != null) {
                index = todos.findIndex(todo => todo.id == id)
                if (index >= 0) {
                    if (todos[index].status == STATUS.INCOMPLETE) {
                        todos[index].status = STATUS.COMPLETE;
                    } else {
                        todos[index].status = STATUS.INCOMPLETE;
                    }
                    await writeFilePromisified("data.json", JSON.stringify(todos));
                }
            }
        } else {
            todos = []
        }
        res.json(todos);
    } catch (err) {
        console.log(err);
        res.status(404).send([]);
    }
})

app.listen(3000)