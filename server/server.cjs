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
    user: 'QT',
    password: '1234',
    database: 'dblab01' //注意在 SCHEMAS 确认
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

    // 1. 首先向 admins 表插入数据
    const adminSql = 'INSERT INTO admin (adminname, password, windowID) VALUES (?, ?, ?)';
    db.query(adminSql, [adminname, password, windowID], (adminErr, adminResult) => {
        if (adminErr) {
            res.status(500).send({ error: 'Failed to save admin' });
            return;
        }

        // 2. 如果插入成功，再向 windows 表插入数据
        const windowSql = 'INSERT INTO windows (window_id) VALUES (?)';
        db.query(windowSql, [windowID], (windowErr, windowResult) => {
            if (windowErr) {
                // 如果向 windows 表插入数据失败，可以在这里处理错误
                res.status(500).send({ error: 'Failed to save window' });
                return;
            }

            // 如果两个表的插入都成功，则返回成功响应
            res.json({ success: true, data: { admin: adminResult, window: windowResult } });
        });
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
    const sql = 'SELECT windowID FROM admin WHERE adminname = ? AND password = ?';
    db.query(sql, [adminname, password], (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Failed to login' });
        return;
      } else if (result.length > 0) {
        res.json({ success: true, windowID: result[0].windowID });
      } else {
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
    const imageUrl = `/${req.file.filename}`;
    console.log('收到的数据：', req.body);
    const sql = 'INSERT INTO front_menu (win_id,name, price, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [win_id, name, price, imageUrl], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Failed to save dish' });
            return;
        }
        res.status(201).send({ message: 'Dish saved successfully', imageUrl });
    });
});

app.post('/windowupdate', (req, res) => {
    const { windowid, canteen, floor, manager_phone, manager_email, manager_wechat, window_name } = req.body;
    console.log('收到的窗口数据：', req.body); // 添加此行
    const sql = 'UPDATE windows SET canteen = ?, floor = ?, manager_phone = ?, manager_email = ?, manager_wechat = ?, window_name = ? WHERE window_id = ?';
    db.query(sql, [canteen, floor, manager_phone, manager_email, manager_wechat, window_name, windowid], (err, result) => {
      if (err) {
        console.error('更新窗口信息时出错：', err); // 添加此行
        res.status(500).send({ error: 'Failed to update window' });
        return;
      }
      console.log('窗口信息更新成功'); // 添加此行
      res.status(201).send({ message: 'window update successfully', canteen });
    });
  });
  

//查询当前窗口菜单
app.get('/dishes', (req, res) => {
    const windowID = req.query.windowID;
    
    if (!windowID) {
      res.status(400).send({ error: 'windowID is required' });
      return;
    }
  
    const sql = 'SELECT * FROM front_menu WHERE win_id = ?';
    db.query(sql, [windowID], (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Failed to fetch menu' });
        return;
      }
      res.json(result); // 将菜品数据作为 JSON 对象发送回客户端
    });
  });
  
// 获取指定窗口数据
app.get('/window', (req, res) => {
    const windowID = req.query.windowID;
    console.log(windowID)
    if (!windowID) {
      res.status(400).send({ error: 'windowID is required' });
      return;
    }
  
    const sql = 'SELECT * FROM windows WHERE window_id = ?';
    db.query(sql, [windowID], (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Failed to fetch windows' });
        return;
      }
      console.log(result)
      res.json(result); // 将窗口数据作为 JSON 对象发送回客户端
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






//点菜
app.get('/windows', (req, res) => {
    const sql = 'SELECT win_id, GROUP_CONCAT(name SEPARATOR ", ") AS names FROM front_menu GROUP BY win_id ORDER BY win_id';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Failed to fetch windows' });
            return;
        }
        res.status(200).send(results);
    });
});

app.get('/menu_items', (req, res) => {
    const sql = 'SELECT * FROM front_menu';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Failed to fetch menu items' });
            return;
        }
        res.status(200).send(results);
    });
});

app.post('/order', (req, res) => {
    const { window, queueNumber, items } = req.body;
    const sql = 'INSERT INTO orders (window_id, dish_name, quantity, total_price) VALUES (?, ?, ?, ?)';

    db.beginTransaction(err => {
        if (err) {
            res.status(500).send({ error: 'Failed to start transaction' });
            return;
        }

        const promises = items.map(item => {
            return new Promise((resolve, reject) => {
                db.query(sql, [window, item.name, item.quantity, item.totalPrice], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        });

        Promise.all(promises)
            .then(results => {
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).send({ error: 'Failed to commit transaction' });
                        });
                    }
                    res.status(201).send({ message: 'Order saved successfully' });
                });
            })
            .catch(err => {
                db.rollback(() => {
                    res.status(500).send({ error: 'Failed to save order' });
                });
            });
    });
});




