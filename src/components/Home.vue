<template>
  <header class="page-title">NK Canteen</header>
  <link
    href="https://fonts.googleapis.com/css2?family=Pacifico&family=Courgette&family=Dancing+Script&display=swap"
    rel="stylesheet"
  />
  <div class="button-container">
    <button type="button" class="userRegister" @click="userRegister">
      用户登录
    </button>
    <button type="button" class="adminRegister" @click="adminRegister">
      管理员登录
    </button>
  </div>
</template>

<script>
import bkImg from '@/assets/nk.jpg'
export default {
  data() {
    return {
      msg: '管理页面',
      note: -1,
    }
  },
  methods: {
    userRegister() {
      this.$router.push('/registeruser')
    },
    adminRegister() {
      this.$router.push('/registeradmin')
    },
  },
  mounted() {
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundImage = `url(${bkImg})`
    document.body.style.backgroundPosition = 'center'
    document.body.style.backgroundRepeat = 'no-repeat'
  },
  beforeUnmount() {
    document.body.style.backgroundImage = ''
  },
}
</script>

<style scoped>
.page-title {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: 'Courgette', 'Dancing Script', 'Arial', sans-serif; /* 设置多种字体备选方案 */
  font-size: 5em;
  font-weight: bold;
  color: #ffffff;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

button {
  background-color: #4caf50;
  /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.userRegister {
  margin-right: 50px;
  background-color: #008cba;
  /* Blue */
}

.userRegister:hover {
  background-color: #007bb5;
}

.adminRegister {
  margin-left: 50px;
  background-color: #f44336;
  /* Red */
}

.adminRegister:hover {
  background-color: #e53935;
}
</style>
