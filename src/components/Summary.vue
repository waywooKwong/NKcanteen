<template>
    <div>
      <h2>已选择的预约</h2>
      <div v-for="reservation in reservations" :key="reservation.seat">
        <p>食堂: {{ reservation.canteen }}</p>
        <p>楼层: {{ reservation.floor }}</p>
        <p>座位: {{ reservation.seat }}</p>
        <p>预约时间: {{ reservation.time }} 分钟</p>
      </div>
      <router-link to="/">返回</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reservations: []
      };
    },
    created() {
      this.reservations = JSON.parse(this.$route.query.reservations || '[]');
    }
  };
  </script>
  
  <style scoped>
  h2 {
    margin-bottom: 10px;
  }
  div {
    margin-bottom: 20px;
  }
  </style>
  