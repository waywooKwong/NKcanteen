<!-- src/App.vue -->
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import Login from './components/Login.vue';

const router = useRouter(); // 获取路由实例

const loggedIn = ref(false);

const handleLoginSuccess = () => {
  loggedIn.value = true;
  // 登录成功后，进行页面跳转
  router.push('/welcome'); // 假设 '/welcome' 是欢迎页面的路由路径
};
</script>

<template>
  <header v-if="loggedIn">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main v-if="loggedIn">
    <TheWelcome />
  </main>

  <Login v-else @login-success="handleLoginSuccess" />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
