const express = require('express')
const mysql = require('mysql')
const methodOverride = require('method-override')
const path = require('path')
const port = 4321
const app = express()

require('dotenv').config()

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const db = mysql.createConnection ({    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});
   
  db.connect((err) => {
    if (err) { throw err;}
    console.log('Connecté à la base MySQL');
});

global.db = db;

//app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname,'./public')));
// CONTROLLER
const {getCars, getSingleCar, getUpdateCar, postUpdateCar, getAddCar, postAddCar} = require('./routes/cars')

// ROUTES
app.get('/', getCars)
app.get('/cars/singlecar/:id', getSingleCar)
app.get('/cars/update/:id', getUpdateCar)
app.put('/cars/update/:id', postUpdateCar)
app.get('/cars/add', getAddCar)
app.post('/cars/add', postAddCar)


// app.get('/', function (req, res) {
//     res.send('Hello World')
//   })
   
  app.listen(port, console.log(`localhost run on port:${port}`))