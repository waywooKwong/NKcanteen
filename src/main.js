import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import axios from './axios/server.cjs';  // 导入 server.js 文件

createApp(App).use(router).mount('#app');
