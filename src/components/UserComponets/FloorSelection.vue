<template>
  <div id="backbody">
    <div class="scroll-banner">
      <div class="scroll-content">
        欢迎来到NKcanteen！最新消息：食堂将于6月10日举行端午节特别活动，敬请期待！
      </div>
    </div>
    <h1>NKcanteen</h1>
    <h2>选择楼层</h2>
    <div class="container">
      <div v-for="floor in floors" :key="floor" class="floor-item">
        <div class="floor-content">
          <img :src="`src/assets/images/floor/${floor}.jpg`" alt="加载中" />
          <button @click="selectFloor(floor)">{{ floor }}</button>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>本食堂负责人：理科组团</p>
      <p>联系方式: 123-456-7890</p>
      <p>地址: 天津市津南区同砚路38号</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      floors: [],
    }
  },
  computed: {
    canteen() {
      return this.$route.query.canteen
    },
  },
  watch: {
    canteen: {
      immediate: true,
      handler(newCanteen) {
        this.updateFloors(newCanteen)
      },
    },
  },
  methods: {
    updateFloors(canteen) {
      if (canteen === '食堂A') {
        this.floors = ['1楼', '2楼', '3楼']
      } else if (canteen === '食堂B') {
        this.floors = ['1楼', '2楼']
      } else if (canteen === '食堂C') {
        this.floors = ['1楼']
      }
    },
    selectFloor(floor) {
      this.$router.push({
        path: '/selectopeate',
        query: { canteen: this.canteen, floor },
      })
    },
  },
}
</script>

<style src="src/assets/seat.css" scoped></style>
<!-- <style scoped>
#backbody {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.1); /* 设置接近透明的深色背景 */
  min-height: 100vh; /* 使背景覆盖整个视口 */
  padding-bottom: 100px; /* 确保内容不被footer遮挡 */
  /* background-image: url('src/picture/canteen/background.png'); 替换为你的背景图片路径 */
  /* background-size: cover;
  background-position: center;
  background-attachment: fixed; 背景图片固定，不随滚动条移动 */

}
h1 {
  color: rgb(126,12,110);
}
h2 {
  margin-bottom: 10px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.floor-item {
  margin: 10px;
  flex: 0 0 calc(33.333% - 20px);
  /* 三列布局，每列占据宽度的三分之一，减去边距 */
  box-sizing: border-box;
  text-align: center;
}

.floor-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  margin: 10px;
  width: 350px;
  height: 170px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
}

.scroll-banner {
  width: 100%;
  overflow: hidden;
  background-color: rgba(240, 240, 240, 0.8); /* 半透明背景颜色 */
  padding: 10px 0; /* 上下内边距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  margin-bottom: 20px; /* 下方外边距 */
}

.scroll-content {
  display: inline-block;
  white-space: nowrap;
  animation: scroll 15s linear infinite; /* 滚动动画 */
}

@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.footer {
  width: 100%;
  background-color: rgba(240, 240, 240, 0.8); /* 半透明背景颜色 */
  padding: 10px 0; 
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  z-index: 1000; /* 确保footer在最上层 */
}
</style> -->
