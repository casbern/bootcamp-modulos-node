const express = require("express"); //nome da dependencia que vc quer usar.

const server = express();

server.use(express.json());

//Query params = ?test=1;
//Route params = /users/1;
//Request body = {"name": "Cassia"};

//=============Query Params=========================

// server.get ("/test", (req, res) => {

//   const name = req.query.name;

//   return res.json({"message": `Hello ${name}`});
// })
// server.listen(3000);

//=============Rout Params=========================

const users = ["cassia", "stefaninho", "erica", "cristina"];

server.use((req, res, next) => {
  console.time('Request');
  console.log('Method: ${req.method}; URL: ${req.url} ');

  next();

  console.timeEnd('Request');

})

function checkUserExist(req, res, next) {
    if(!req.body.name) {
      return res.status(400).json({error: 'user name is required'});
    }

    return next();
}

function checkUserInArray(req,res,next) {
const user = users[req.params.index]; 

  if(!user) {
    return res.status(400).json({error: 'user name does not exist'});
  }

  req.user = user;

  return next();
}

server.get ("/test", (req, res) => {
  return res.json(users);
})

server.get ("/test/:index", checkUserInArray, (req, res) => {

  //const id = req.params.id; or
  //const {index} = req.params;

  //return res.json(users[index]);

  return res.json(req.user);

})

//=============Request body=========================


//===========CRUD de Novo Usuario===============

 server.post("/users", checkUserExist, checkUserInArray, (req, res) => {

  const {name} = req.body;

  users.push(name);

  return res.json(users);

 })

 server.put("/users/:index", checkUserExist, checkUserInArray, (req, res) => {

  const {index} = req.params;

  const {name} = req.body;

  users[index] = name;

  return res.json(users); 


 })

 server.delete("/users/:index", checkUserInArray, (req, res) => {
  const {index} = req.params;

  users.splice(index, 1);

  //return res.json(users);
  return res.send();


 })


server.listen(3000);

