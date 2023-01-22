const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const mysql = require ('mysql')
const cookieParser = require ('cookie-parser')
const cors = require('cors')
const port = 3000

const connection = mysql.createConnection({
  host: 'mydb.cu6unrorcuye.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '1234jack',
  database: 'vite',
})

connection.connect()

app.use(bodyPaser.urlencoded({extended:false}));
  app.use(bodyPaser.json());

  app.use(cookieParser())

app.get('/', (req, res)=> {
    res.send('hello')
})

app.listen(port)