// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(__dirname, "storage.json");

// function readTodos() {
//     if (!fs.existsSync(filePath)) {
//         fs.writeFileSync(filePath, JSON.stringify([]));
//     }

//     const data = fs.readFileSync(filePath, "utf8");
//     return JSON.parse(data || "[]");
// }

// function saveTodos(todos) {
//     fs.writeFile(filePath, JSON.stringify(todos, null, 2), err => {
//         if (err) console.log("Write error:", err);
//     });
// }

// function getTodo(req, res) {
//     const todos = readTodos();

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(todos));
// }

// function addTodo(req, res) {
//     let body = "";

//     req.on("data", chunk => {
//         body += chunk.toString();
//     });

//     req.on("end", () => {
//         const data = JSON.parse(body);

//         const todos = readTodos();

//         const newTodo = {
//             id: Date.now(),
//             task: data.task
//         };

//         todos.push(newTodo);

//         saveTodos(todos);

//         res.writeHead(201, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(newTodo));
//     });
// }

// function deleteTodo(req, res, id) {
//     let todos = readTodos();

//     todos = todos.filter(todo => todo.id != id);

//     saveTodos(todos);

//     res.writeHead(200);
//     res.end("Deleted");
// }


// function updateTodo(req, res, id) {
//     let body = "";
//     req.on("data", chunk => body += chunk.toString());
//     req.on("end", () => {
//         const data = JSON.parse(body); 
//         const todos = readTodos();
//         const idx = todos.findIndex(t => String(t.id) === String(id));
//         if (idx === -1) {
//             res.writeHead(404, { "Content-Type": "text/plain" });
//             return res.end("Not found");
//         }

//         // update only provided fields
//         if (typeof data.completed !== "undefined") todos[idx].completed = !!data.completed;
//         if (typeof data.task !== "undefined") todos[idx].task = data.task;

//         saveTodos(todos);

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(todos[idx]));
//     });
// }


// module.exports = {
//     getTodo,
//     addTodo,
//     deleteTodo,
//     updateTodo
// };


const { getDB } = require("./db");
const { ObjectId } = require("mongodb");

async function getTodo(req, res) {
    const db = getDB();
    const todos = await db.collection("todos").find().toArray();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
}

function addTodo(req, res) {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        const data = JSON.parse(body);
        const db = getDB();

        const newTodo = {
            task: data.task,
            completed: false
        };

        const result = await db.collection("todos").insertOne(newTodo);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ...newTodo, _id: result.insertedId }));
    });
}

async function deleteTodo(req, res, id) {
    const db = getDB();
    await db.collection("todos").deleteOne({ _id: new ObjectId(id) });

    res.writeHead(200);
    res.end("Deleted");
}

function updateTodo(req, res, id) {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        const data = JSON.parse(body);
        const db = getDB();

        await db.collection("todos").updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );

        const updated = await db.collection("todos").findOne({ _id: new ObjectId(id) });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updated));
    });
}

module.exports = { getTodo, addTodo, deleteTodo, updateTodo };
