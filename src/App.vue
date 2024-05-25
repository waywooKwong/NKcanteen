<template>
  <div id="app">
    <h1>座位预约系统</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  margin-bottom: 20px;
}
</style>

<!-- <template>
    <div id="app">
      <SeatBooking :total-seats="50" />
    </div>
  </template>
  
  <script>
  import SeatBooking from './components/SeatBooking.vue';
  
  export default {
    name: 'App',
    components: {
      SeatBooking,
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
   -->