const addBtn = document.getElementById('addBtn');
const todoInput = document.getElementById('todo-input');

addBtn.addEventListener('click', () => {
    const text = todoInput.value;
    

    if(text === '') {
        alert('Please enter a todo item');
        return;
    }
    console.log(text);
})
    