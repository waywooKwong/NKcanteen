<template>
  <div>
    <h2>选择食堂</h2>
    <div class="container">
      <div v-for="canteen in canteens" :key="canteen" class="canteen-item">
        <div class="canteen-content">
          <!-- 图片路径设置要准确！！ -->
          <img :src="`src/picture/canteen/${canteen}.jpg`" alt="加载中"> 
          <button @click="selectCanteen(canteen)">
            {{ canteen }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canteens: ['食堂A', '食堂B', '食堂C'],
    };
  },
  methods: {
    selectCanteen(canteen) {
      this.$router.push({ path: '/floor', query: { canteen } });
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.canteen-item {
  margin: 10px;
  flex: 0 0 calc(33.333% - 20px);
  /* 三列布局，每列占据宽度的三分之一，减去边距 */
  box-sizing: border-box;
  text-align: center;
}

/* 图片和文本打包成容器，便于管理排版 */
.canteen-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  margin-bottom: 10px;
  width: 350px;
  height: 170px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
}
</style>
