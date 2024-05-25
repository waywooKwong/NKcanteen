<template>
  <div>
    <h2>选择座位</h2>
    <div v-for="seat in seats" :key="seat">
      <button @click="selectSeat(seat)">{{ seat }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seats: []
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
      if (floor === '1楼') {
        this.seats = ['1号', '2号', '3号'];
      } else if (floor === '2楼') {
        this.seats = ['4号', '5号', '6号'];
      } else if (floor === '3楼') {
        this.seats = ['7号', '8号', '9号'];
      }
    },
    selectSeat(seat) {
      this.$router.push({ path: '/summary', query: { canteen: this.canteen, floor: this.floor, seat } });
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
button {
  margin: 5px;
}
</style>
