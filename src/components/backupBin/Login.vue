<!-- src/components/Login.vue -->
<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
        <br>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // 在这里可以添加登录逻辑，比如发送登录请求到后端验证用户名和密码
        // 假设登录成功，直接调用传入的回调函数
        this.$emit('login-success');
      }
    }
  };
  </script>
  
  <style scoped>
  /* 可以添加一些样式 */
  </style>
  