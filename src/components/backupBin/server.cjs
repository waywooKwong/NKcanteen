const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'testuser',
  password: '2211992',  
  database: 'dbtestuser'
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
  const { canteen, floor, seatgroup, seatnumber, time } = req.query; // 修改这里
  const sql = 'DELETE FROM reservation WHERE canteen = ? and floor = ? and seatgroup = ? and seatnumber = ? and time = ?';
  db.query(sql, [canteen, floor, seatgroup, seatnumber, time], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Failed to delete reservation' });
      return;
    }
    res.status(200).send({ message: 'Reservation deleted successfully' });
  });
});




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
