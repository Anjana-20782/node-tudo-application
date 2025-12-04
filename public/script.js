const list = document.getElementById('display');

function fetchTodos() {
    fetch("/api/todos")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";
            data.forEach(todo => {
                list.innerHTML += `
                <div class="details">

               
                     <input type="checkbox" id="cb-${todo.id}" ${todo.completed ? 'checked' : ''} onclick="toggleTodo(${todo.id}, this.checked)">
                      <span class="${todo.completed ? 'completed' : ''}">${todo.task}</span>
                    </div>
                    <button id="delete" onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
                `;
            });
        });
}


function toggleTodo(id, checked) {
    fetch("/api/todos/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: checked })
    })
    .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
    })
    .then(()=> fetchTodos())
    .catch(err => {
        console.error(err);
        alert('Could not update todo');
        fetchTodos();
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
