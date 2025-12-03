const list= document.getElementById('display');

fetchTodos()
function fetchTodos(){
    fetch("/api/todos")
    .then(res=>res.json())
    .then(data =>{
         list.innerHTML = "";
         data.forEach(todo => {
            innerHTML+=`
            ${todo.task}
            `
         });
    })
}
function addTodo()
{
   const input=document.getElementById("todo-input") 
   const task=input.ariaValueMax;

   fetch("/api/todos",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({task})
   })
    .then(()=>{
        task = ""
        fetchTodos()
    });
}
  