const path=require('path')
const fs=require('fs')
const {getTodo,addTodo}=require('./controllers')

module.exports = (req,res)=>{

    //frontend  files
      if(req.method === "GET" && req.url === "/")
      {
        fs.readFile(path.join(__dirname,"public","index.html"),"utf-8",(err,data)=>{
            res.end(data);
        })
      }
      else if(req.url === "/Todo.css")
      {
        fs.readFile(path.join(__dirname,"public","Todo.css"),"utf-8",(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/css"});
            res.end(data);
        })
      }
       else if(req.url === "/script.js")
      {
        fs.readFile(path.join(__dirname,"public","script.js"),"utf-8",(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/javascript"});
            res.end(data);
        })
      }

      //api routes

      else if(req.method === "GET" && req.url === "/api/todos"){
        getTodo(req,res)
      }
      else if(req.method === "POST" && req.url === "/api/todos"){
        addTodo(req,res)
      }
     
      else{
        res.writeHead(404);
        res.end("404 Not Found")
      }
}