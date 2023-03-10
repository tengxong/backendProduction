const express = require('express')
const app = express()
const bodyPaser = require('body-parser')
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = 3000

const connection = mysql.createConnection({
    host: 'mydb.cu6unrorcuye.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '1234jack',
    database: 'vite',
})

connection.connect()

app.use(
    cors({
        origin: "https://frond-end.vercel.app",
        credentials: true, // ເປີດ
    })
);

app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());

app.use(cookieParser())

app.get('/:id', (req, res) => {
    var id = req.params.id;
    var params = [id]

    var sql = 'SELECT * FROM user WHERE id= ?'

    connection.query(sql, params, (err, rows, fields) => {
        if (err) throw err
        res.send(rows)
    })
})

// chapter 14. ການທົດລອງອັບເດດຂໍ້ມູນ
app.put("/updateuser", (req, res) => {
    var username = req.body.username;
    let {firsname, lastname} = req.body;
    var email = req.body.email;
    var password = req.body.password;
    var title = req.body.title;
    var id = req.body.id;
    var params = [username,firsname,lastname,email, password, title,id];
    var sql = 'UPDATE user SET username= ?, firsname= ?, lastname= ?,email= ?, password= ?, titil=? WHERE id= ?';
    connection.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });

})

//  login page
app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var params = [email, password];
    var sql = "SELECT id FROM user WHERE email = ? AND password = ?";
    connection.query(sql, params, (err, rows, fields) => {
        if (err) {
            throw err;
        } else {
            if (rows.length > 0) {
                res.cookie("login", rows[0].id); // Using cookie
                let data = {
                    status: 200,
                    message: "success",
                };
                res.send(data);
            } else {
                res.send("faild");
            }
        }
    });
})

//Route Cookie
app.post("/isLoggedIn", (req, res) => {
    console.log(req.cookies);
    if (req.cookies.login) {
        let data = {
            status: 200,
            message: "logged in",
        };
        res.send(data);
    } else {
        res.send("no cookie");

    }
    res.send("login");
});
app.listen(port)