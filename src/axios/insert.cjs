// node insert.cjs 运行当前文件，测试数据插入是否正常
const axios = require('axios');

const reservation = {
  canteen: 'test_canteen5',
  floor: 'test_Floor5',
  seatgroup: 'Group A',
  seatnumber: '299',
  time: 10 
};

axios.post('http://localhost:3000/reserve', reservation)
  .then(response => {
    console.log('Reservation saved successfully:', response.data.message);
  })
  .catch(error => {
    console.error('Failed to save reservation:', error.response.data.error);
  });
