<template>
  <div>
    <h2>选择座位</h2>
    <div v-for="group in seatGroups" :key="group.name" class="seat-group">
      <h3>{{ group.name }} 组</h3>
      <div class="seats">
        <div v-for="seat in group.seats" :key="seat.number" :class="seatClass(seat)" @click="handleSeatClick(seat)">
          {{ seat.number }}
        </div>
      </div>
    </div>
    <button @click="goToSummary">查看预约</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seatGroups: [
        { name: 'A', seats: [] },
        { name: 'B', seats: [] },
        { name: 'C', seats: [] },
        { name: 'D', seats: [] }
      ],
      reservations: [],
      seatsPerGroup: 30 // 可以调整的参数
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
    updateSeats(floor) {
      const seatsData = [];
      for (let i = 1; i <= this.seatsPerGroup; i++) {
        const randomStatus = Math.random() < 0.3 ? 'reserved' : (Math.random() < 0.5 ? 'ending' : 'available');
        seatsData.push({ number: i.toString(), status: randomStatus });
      }

      this.seatGroups.forEach(group => {
        group.seats = seatsData.map(seat => ({ ...seat, group: group.name }));
      });
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
    handleSeatClick(seat) {
      if (seat.status === 'available') {
        const reservationTime = prompt("请输入预约时间 (分钟):");
        if (reservationTime) {
          this.reserveSeat(seat, reservationTime);
          this.reservations.push({ canteen: this.canteen, floor: this.floor, seat: `${seat.group}${seat.number}`, time: reservationTime });
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
        }, 60000); // 1 minute before the end of the reservation
      }, (time - 1) * 60000); // Change to 'ending' status 1 minute before the reservation ends
    },
    goToSummary() {
      this.$router.push({ path: '/summary', query: { reservations: JSON.stringify(this.reservations) } });
    }
  }
};
</script>

<style scoped>
.seat-group {
  margin-bottom: 20px;
  text-align: center; /* Ensure group title is centered */
}
.seats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 340px; /* Adjust to fit 8 seats per row */
  margin: 0 auto; /* Center the seats container */
}
.seat {
  width: 40px;
  height: 40px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  cursor: pointer;
}
.seat.available {
  background-color: green;
}
.seat.reserved {
  background-color: red;
  cursor: not-allowed;
}
.seat.ending {
  background-color: yellow;
  cursor: not-allowed;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
