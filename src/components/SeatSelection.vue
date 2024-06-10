<template>
  <div id="backbody">
    <div class="scroll-banner">
      <div class="scroll-content">
        欢迎来到NKcanteen！最新消息：食堂将于6月10日举行端午节特别活动，敬请期待！
      </div>
    </div>
    <h1>NKcanteen</h1>
    <h2>选择座位</h2>
    <div class="container">
      <div v-for="group in seatGroups" :key="group.name" class="seat-group">
        <h3>{{ group.name }} 组</h3>
        <div class="seats">
          <div v-for="seat in group.seats" :key="seat.number" :class="seatClass(seat)" @click="handleSeatClick(seat)">
            {{ seat.number }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>本楼层负责人：楼层负责人</p>
      <p>联系方式: 123-456-7890</p>
      <p>地址: 天津市津南区同砚路38号</p>
    </div>
    <button @click="goToSummary">查看预约</button>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      seatGroups: [
        { name: 'A', seats: [] },
        { name: 'B', seats: [] },
        { name: 'C', seats: [] },
        { name: 'D', seats: [] },
        { name: 'E', seats: [] },
        { name: 'F', seats: [] }
      ],
      reservations: [],
      seatsPerGroup: 32 // 可以调整的参数
    };
  },
  computed: {
    floor() {
      return this.$route.query.floor;
    },
    canteen() {
      return this.$route.query.canteen;
    }
  },
  watch: {
    floor: {
      immediate: true,
      handler(newFloor) {
        this.updateSeats(newFloor);
      }
    }
  },
  methods: {
    async fetchReservations() {
      try {
        const basicInfo = {
          canteen: this.canteen,
          floor: this.floor,
        };
        // 控制台打印当前信息
        console.log('当前食堂：', this.canteen, '\n当前楼层：', this.floor);

        // 使用axios.get发送带有查询参数的请求时，需要将参数放在配置对象的params属性中
        const response = await axios.get('http://localhost:3000/reservations', { params: basicInfo });
        const reservations = response.data;
        this.updateSeatsStatus(reservations);
      } catch (error) {
        console.error('Failed to fetch reservations', error);
      }
    },
    updateSeatsStatus(reservations) {
      this.seatGroups.forEach(group => {
        group.seats.forEach(seat => {
          const reservation = reservations.find(res => res.seatgroup === group.name && res.seatnumber === seat.number);
          if (reservation) {
            seat.status = 'reserved';
            setTimeout(() => {
              seat.status = 'ending';
              setTimeout(() => {
                seat.status = 'available';
              }, 60000); // 预约结束一分种前，座位变黄
            }, (reservation.time - 1) * 60000); // 预约结束一分钟之前都是不可预约状态
          } else {
            seat.status = 'available';
          }
        });
      });
    },
    updateSeats(floor) {
      // 初始化所有座位为可用状态
      this.seatGroups.forEach(group => {
        group.seats = [];
        for (let i = 1; i <= this.seatsPerGroup; i++) {
          group.seats.push({ number: i.toString(), status: 'available', group: group.name });
        }
      });
      // 获取预约信息并更新座位状态
      this.fetchReservations();
    },

    seatClass(seat) {
      if (seat.status === 'reserved') {
        return 'seat reserved';
      } else if (seat.status === 'ending') {
        return 'seat ending';
      } else {
        return 'seat available';
      }
    },
    async handleSeatClick(seat) {
      if (seat.status === 'available') {
        let reservationTime;
        do {
          reservationTime = prompt("请输入预约时间 (分钟):");
          if (reservationTime === null) return; // 用户取消输入
          if (!/^\d+$/.test(reservationTime) || Number(reservationTime) > 60) {
            alert("请输入有效的时间，且不可大于60分钟。");
          } else {
            reservationTime = Number(reservationTime);
          }
        } while (!/^\d+$/.test(reservationTime) || reservationTime > 60);

        try {
          this.reserveSeat(seat, reservationTime);
          const reservation = {
            canteen: this.canteen,
            floor: this.floor,
            seatgroup: seat.group,
            seatnumber: seat.number,
            time: reservationTime,
          };
          this.reservations.push(reservation);
          await axios.post('http://localhost:3000/reserve', reservation);

          // 预约时间结束后删除预约记录
          setTimeout(async () => {
            try {
              await axios.delete('http://localhost:3000/reserve', {
                params: {
                  canteen: this.canteen,
                  floor: this.floor,
                  seatgroup: seat.group,
                  seatnumber: seat.number,
                  time: reservationTime,
                }
              });
            } catch (error) {
              console.log('Failed to delete reservation', error);
            }
          }, reservationTime * 60000);
        } catch (error) {
          console.log('Failed to reserve seat', error);
        }
      } else {
        alert("此座位不可预约");
      }
    },
    reserveSeat(seat, time) {
      seat.status = 'reserved';
      setTimeout(() => {
        seat.status = 'ending';
        setTimeout(() => {
          seat.status = 'available';
        }, 60000); // 预约结束一分种前，座位变黄
      }, (time - 1) * 60000); // 预约结束一分钟之前都是不可预约状态
    },
    goToSummary() {
      this.$router.push({ path: '/summary', query: { reservations: JSON.stringify(this.reservations) } });
    }
  }
};
</script>

<!-- 引入外部样式表 -->
<style src="../assets/seat.css"></style>

<!-- 定义局部样式 -->
<style scoped>
button {
  margin: 30px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
}
</style>