// const fs=require('fs');
// const http=require('http');
// const path=require('path');
// const router=require('./router');

// const server=http.createServer((req,res)=>{

//     router(req,res);     
// });
// server.listen(3000,()=>{
//     console.log("Servet running at http://localhost:3000");

    
// })

const http = require('http');
const router = require('./router');
const { connectDB } = require("./db");

const server = http.createServer((req, res) => {
    router(req, res);
});

connectDB().then(() => {
    server.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
});
