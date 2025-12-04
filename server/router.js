const path = require('path');
const fs = require('fs');
const { getTodo, addTodo, deleteTodo, updateTodo } = require('./controllers');

// Simple render function to serve files
function render(res, filename, contentType = "text/html") {
    const filePath = path.join(__dirname, "../public", filename);

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Server Error");
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
}

module.exports = (req, res) => {
    const { method, url } = req;

    // Static routes
    if (method === "GET" && url === "/") return render(res, "index.html");

    if (url === "/Todo.css") return render(res, "Todo.css", "text/css");

    if (url === "/script.js") return render(res, "script.js", "text/javascript");

    // API routes
    if (method === "GET" && url === "/api/todos") return getTodo(req, res);

    if (method === "POST" && url === "/api/todos") return addTodo(req, res);

    if (method === "DELETE" && url.startsWith("/api/todos/")) {
        const id = url.split("/")[3];
        return deleteTodo(req, res, id);
    }
    if (method === 'PATCH' && url.startsWith('/api/todos/')) {
  const id = url.split('/')[3];
  return updateTodo(req, res, id);
}

    // 404 for other routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
};
