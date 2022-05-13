//Inyectamos la dependencia express
const express= require('express'); 
let app = express();
//Toca decirle que puerto usar 
let PORT = process.env.PORT || 3000;
//Tenemos que usar contenido estatico 
app.use('/assets', express.static(__dirname + '/public')); 
//Aqui vamos a parsear  datos dentro del body 
app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'ejs');// EJS como motor de busqueda
//
app.get('/',(req,res)=>{
  res.send(`<!DOCTYPE html> <html lang="en"> <head><link rel="stylesheet" href="/assets/style.css"> 
  <title>Document</title> </head>
  <body> <h1>Hola mundo !!! </h1>
  </body> </html>`)
});
//Aqui cambiamos al metodo res.render pasando parametros ID y Qstr 
app.get('/person/:id',(req,res) => {
  res.render('person', {ID: req.params.id, MESSAGE: req.query.message, TIMES:req.query.times })
});
// get que nos ayuda a renderizar
app.get('/student', (req, res) => {
  res.render('index')
});
// Ruta /student que pasara al metodo HTTP en POST
app.post('/student', express.urlencoded({ extended: false}),(req,res) => {
  res.send(`First Name es: ${req.body.fname}, 
  Last Name es: ${req.body.lname}, Middle Name es: ${req.body.mname}`)
  
});

// Aqui lo que hacemos es nuestro endpoint que responde a la peticion /personjson
//Con esto podemos imprimir en pantalla el objeto 
app.post("/personjson", express.json({type: '*/*'}),(req, res) => {
  console.log('El objeto contiene:' , (req.body));
  console.log('Nombre:' ,req.body.firstname);
  console.log('Apellido:' ,req.body.lastname);
});
//levantamos el puerto
app.listen(PORT);