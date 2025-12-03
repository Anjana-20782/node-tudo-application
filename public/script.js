const list = document.getElementById('display');

function fetchTodos() {
    fetch("/api/todos")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";
            data.forEach(todo => {
                list.innerHTML += `
                <div class="details">
                    <p>${todo.task}</p>
                    <button id="delete" onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
                `;
            });
        });
}

function addTodo() {
    const input = document.getElementById("todo-input");
    const task = input.value.trim();

    if (!task) return alert("Enter a task");

    fetch("/api/todos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ task })
    })
        .then(() => {
            input.value = "";
            fetchTodos();
        });
}

fetchTodos();


function deleteTodo(id){

    const yes=confirm("Are you sure you want to delete the task?")

    if(!yes)
    {
        return;
    }
    
    fetch("/api/todos/" + id, {
        method:"DELETE"
    })
    .then(()=>fetchTodos());
}
