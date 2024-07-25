const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();
const path = require('path');
const port = 3000; // 这是固定的端口，最好不要修改

// 1. 此处修改数据库的相关配置
// 2. 根据需求 create table
const db = mysql.createConnection({
    host: 'localhost',
    user: 'myTestuser',
    password: 'asd123456',
    database: 'dbsclabtest2024' //注意在 SCHEMAS 确认
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.use(cors());
app.use(bodyParser.json());

app.post('/reserve', (req, res) => {
    const { canteen, floor, seatgroup, seatnumber, time } = req.body;
    const sql = 'INSERT INTO reservation (id, canteen, floor, seatgroup, seatnumber, time) VALUES (NULL, ?, ?, ?, ?, ?)';
    db.query(sql, [canteen, floor, seatgroup, seatnumber, time], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to save reservation' });
            return;
        }
        res.status(201).send({ message: 'Reservation saved successfully' });
    });
});

//定时删除
app.delete('/reserve', (req, res) => {
    const { canteen, floor, seatgroup, seatnumber, time } = req.body; // 修改这里
    const sql = 'DELETE FROM reservation WHERE canteen = ? and floor = ? and seatgroup = ? and seatnumber = ? and time = ?';
    db.query(sql, [canteen, floor, seatgroup, seatnumber, time], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to delete reservation' });
            return;
        }
        res.status(200).send({ message: 'Reservation deleted successfully' });
    });
});

//从数据库读取信息
app.get('/reservations', (req, res) => {
    const { canteen, floor } = req.query;
    const sql = 'SELECT * FROM reservation WHERE canteen = ? and floor = ?';
    db.query(sql, [canteen, floor], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Failed to fetch reservations' });
            return;
        }
        res.status(200).send(results);
    });
});

app.post('/addUser', (req, res) => {
    const { username, password } = req.body;

    //3. 此处根据需求修改 SQL 语句
    const sql = 'insert into user (username, password) values (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to save reservation' });
            return;
        }
        res.json({ success: true, data: result, username: username, password: password });
    });
});

app.post('/addAdmin', (req, res) => {
    const { adminname, password, windowID } = req.body;

    //3. 此处根据需求修改 SQL 语句
    const sql = 'insert into admin (adminname, password, windowID) values (?, ?, ?)';
    db.query(sql, [adminname, password, windowID], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to save reservation' });
            return;
        }
        res.json({ success: true, data: result, adminname: adminname, password: password });
    });
});

app.post('/loginuser', (req, res) => {
    const { username, password } = req.body;

    //3. 此处根据需求修改 SQL 语句
    const sql = 'select * from user where username = ? and password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to save reservation' });
            return;
        }
        else if (result.length > 0) { // 修正拼写错误
            res.json({ success: true, data: result, username: username, password: password });
        }
        else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

app.post('/loginadmin', (req, res) => {
    const { adminname, password } = req.body;

    //3. 此处根据需求修改 SQL 语句
    const sql = 'select * from admin where adminname = ? and password = ?';
    db.query(sql, [adminname, password], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to save reservation' });
            return;
        }
        else if (result.length > 0) { // 修正拼写错误
            res.json({ success: true, data: result, adminname: adminname, password: password });
        }
        else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


app.post('/dishes', upload.single('image'), (req, res) => {
    const { win_id, name, price } = req.body;
    const imageUrl = `/server/public/${req.file.filename}`;

    const sql = 'INSERT INTO front_menu (win_id,name, price, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [win_id, name, price, imageUrl], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to save dish' });
            return;
        }
        res.status(201).send({ message: 'Dish saved successfully', imageUrl });
    });
});

// GET 请求处理
app.get('/dishes', (req, res) => {
    // 从数据库中获取菜品数据
    db.query('SELECT * FROM front_menu', (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to fetch menu' });
            return;
        }
        res.json(result); // 将菜品数据作为 JSON 对象发送回客户端
    });
});

app.get('/orders', (req, res) => {
    const windowId = req.query.windowId;

    if (!windowId) {
        res.status(400).send({ error: 'windowId is required' });
        return;
    }

    const sql = 'SELECT * FROM orders WHERE window_id = ?';
    db.query(sql, [windowId], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to fetch orders' });
            return;
        }
        res.json(result); // 将订单数据作为 JSON 对象发送回客户端
    });
});


// 删除菜品
app.delete('/dishes_delete', (req, res) => {
    const id = req.body.id;
    const sql = 'DELETE FROM front_menu WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to delete dish' });
            return;
        }
        res.status(200).send({ message: 'Dish deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});