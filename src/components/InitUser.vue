<template>
  <div class="mainWindow">
    <div class="registerTitle">{{ login }}</div>
    <input
      type="text"
      class="username"
      v-model="username"
      placeholder="在此处输入注册用户名"
    />
    <input
      type="password"
      class="password"
      v-model="password"
      placeholder="在此处输入注册密码"
    />
    <button type="submit" class="btn_submit" @click="registerUser">
      注册新用户
    </button>
    <div class="check-container">
      <p class="backRegister" @click="register">返回登录</p>
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
      login: 'Register',
    }
  },
  methods: {
    registerUser() {
      if (this.username == '' || this.password == '') {
        alert('用户名或密码不能为空')
        return
      }
      if (this.password.length < 6) {
        alert('密码长度不能小于6位')
        return
      }
      axios
        .post('http://localhost:3000/addUser', {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.data.success) {
            alert('注册成功')
            this.$router.push('/registeruser')
          } else {
            alert('请重新设置用户名即密码')
          }
        })
        .catch((err) => {
          console.error('Login error:', err)
          alert('注册失败，请重试')
        })
    },
    register() {
      this.$router.push('/registeruser')
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
.mainWindow {
  margin: 200px auto;
  width: 400px;
  height: 450px;
  background: linear-gradient(
    135deg,
    rgba(168, 237, 234, 0.8) 0%,
    rgba(254, 214, 227, 0.8) 100%
  );
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

.backRegister {
  margin-left: auto;
  font-size: 14px;
  color: black;
}

.backRegister:hover {
  color: #6200ea;
  text-decoration: underline;
  text-decoration-color: #6200ea;
}
</style>
