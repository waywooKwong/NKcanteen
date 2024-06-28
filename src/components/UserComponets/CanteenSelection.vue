<template>
  <div id="backbody">
    <div class="scroll-banner">
      <div class="scroll-content">
        欢迎来到NKcanteen！最新消息：食堂将于6月10日举行端午节特别活动，敬请期待！
      </div>
    </div>
    <h1>NKcanteen</h1>
    <h2>选择食堂</h2>
    <div class="container">
      <div v-for="canteen in canteens" :key="canteen" class="canteen-item">
        <div class="canteen-content">
          <!-- 图片路径设置要准确！！ -->
          <img :src="`src/assets/images/canteen/${canteen}.jpg`" alt="加载中" />
          <button @click="selectCanteen(canteen)">
            {{ canteen }}
          </button>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>食堂负责人：大厨小组</p>
      <p>联系方式: 123-456-7890</p>
      <p>地址: 天津市津南区同砚路38号</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canteens: ['食堂A', '食堂B', '食堂C'],
    }
  },
  methods: {
    selectCanteen(canteen) {
      this.$router.push({ path: '/floor', query: { canteen } })
    },
  },
}
</script>

<style src="src/assets/seat.css" scoped></style>
