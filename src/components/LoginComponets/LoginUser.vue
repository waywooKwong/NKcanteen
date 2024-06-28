<template>
  <div class="mainWindow">
    <div class="registerTitle">{{ login }}</div>
    <input type="text" class="username" v-model="username" placeholder="在此处输入用户名" />
    <input type="password" class="password" v-model="password" placeholder="在此处输入密码" />
    <button type="submit" class="btn_submit" @click="loginUser">登录</button>
    <div class="check-container">
      <input type="checkbox" class="btn_check" v-model="checkbox" />
      <label for="checkbox" class="label_check">记住密码</label>
      <p class="fgPassword" @click="registerUser">点我注册</p>
    </div>
  </div>
</template>

<script>
import bkImg from '@/assets/background02.jpg'
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      checkbox: false,
      login: 'Login',
    }
  },
  methods: {
    loginUser() {
      if (this.username === '' || this.password === '') {
        alert('用户名或密码不能为空')
        return
      }
      axios
        .post('http://localhost:3000/loginuser', {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.data.success) {
            const jump = window.confirm('登录成功，是否跳转？')
            console.log(res.data)

            if (jump) {
              this.$router.push('/canteen')
            } else {
              console.log('success!')
            }
          } else {
            alert('用户名或密码错误')
          }
        })
        .catch((err) => {
          console.log(err)
          alert('登录失败，请检查服务器连接')
        })
    },
    registerUser() {
      this.$router.push('/RegisterUser')
      console.log('hello')
    },
  },
  mounted() {
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundImage = `url(${bkImg})`
  },
  beforeUnmount() {
    document.body.style.backgroundImage = ''
  },
}
</script>

<style scoped>
body {
  margin: 0;
  background-image: url('@/assets/bk_img.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.mainWindow {
  margin: 200px auto;
  width: 400px;
  height: 450px;
  background: linear-gradient(135deg,
      rgba(168, 237, 234, 0.8) 0%,
      rgba(254, 214, 227, 0.8) 100%);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 30px;
  align-items: center;
}

.registerTitle {
  display: block;
  margin-bottom: 80px;
  font-size: 36px;
}

.username,
.password {
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ddd;
  padding: 0 15px;
  margin: 10px 0;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.username:focus,
.password:focus {
  border-color: #6200ea;
  box-shadow: 0 2px 4px rgba(98, 0, 234, 0.2);
}

.username::placeholder,
.password::placeholder {
  color: #aaa;
}

.username:hover,
.password:hover {
  border-color: #6200ea;
}

.btn_submit {
  width: 335px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ddd;
  padding: 0 15px;
  margin: 10px 0;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #6200ea;
  color: #fff;
  transition: all 0.3s ease;
}

.btn_submit:focus {
  box-shadow: 0 2px 4px rgba(98, 0, 234, 0.2);
}

.btn_submit:hover {
  border-color: cadetblue;
  background-color: #a6b3ff;
}

.check-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  margin: 10px 0;
}

.label_check {
  font-size: 14px;
  color: black;
  margin-left: 5px;
}

.fgPassword {
  margin-left: auto;
  font-size: 14px;
  color: black;
}

.fgPassword:hover {
  color: #6200ea;
  text-decoration: underline;
  text-decoration-color: #6200ea;
}
</style>
