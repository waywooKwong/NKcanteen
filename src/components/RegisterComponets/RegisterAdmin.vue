<template>
  <div class="mainWindow">
    <div class="registerTitle">{{ login }}</div>
    <input type="text" class="adminname" v-model="adminname" placeholder="在此处输入注册用户名" />
    <input type="password" class="password" v-model="password" placeholder="在此处输入注册密码" />
    <input type="text" class="windowID" v-model="windowID" placeholder="在此输入窗口号" />
    <button type="submit" class="btn_submit" @click="registerAdmin">
      注册新用户
    </button>
    <div class="check-container">
      <p class="backRegister" @click="LoginAdmin">返回登录</p>
    </div>
  </div>
</template>

<script>
import bkImg from '@/assets/background02.jpg'
import axios from 'axios'
export default {
  data() {
    return {
      adminname: '',
      password: '',
      windowID: '',
      checkbox: false,
      login: 'Register',
    }
  },
  methods: {
    registerAdmin() {
      if (this.adminname == '' || this.password == '') {
        alert('用户名或密码不能为空')
        return
      }
      if (this.password.length < 6) {
        alert('密码长度不能小于6位')
        return
      }
      axios
        .post('http://localhost:3000/addAdmin', {
          adminname: this.adminname,
          password: this.password,
          windowID: this.windowID,
        })
        .then((res) => {
          if (res.data.success) {
            alert('注册成功')
            this.$router.push('/LoginAdmin')
          } else {
            alert('请重新设置用户名即密码')
          }
        })
        .catch((err) => {
          console.error('Login error:', err)
          alert('注册失败，请重试')
        })
    },
    LoginAdmin() {
      this.$router.push('/LoginAdmin')
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
  margin-bottom: 20px;
  font-size: 36px;
}

.adminname,
.password,
.windowID {
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

.adminname:focus,
.password:focus,
.windowID:focus {
  border-color: #6200ea;
  box-shadow: 0 2px 4px rgba(98, 0, 234, 0.2);
}

.adminname::placeholder,
.password::placeholder .windowID::placeholder {
  color: #aaa;
}

.adminname:hover,
.password:hover,
.windowID:hover {
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
