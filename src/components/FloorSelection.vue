<template>
  <div>
    <h2>选择楼层</h2>
    <div v-for="floor in floors" :key="floor">
      <div class="floor-content">
      <img :src="`src/picture/floor/${floor}.jpg`" alt="加载中"> 
      <button @click="selectFloor(floor)">{{ floor }}</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      floors: []
    };
  },
  computed: {
    canteen() {
      return this.$route.query.canteen;
    }
  },
  watch: {
    canteen: {
      immediate: true,
      handler(newCanteen) {
        this.updateFloors(newCanteen);
      }
    }
  },
  methods: {
    updateFloors(canteen) {
      if (canteen === '食堂A') {
        this.floors = ['1楼', '2楼', '3楼'];
      } else if (canteen === '食堂B') {
        this.floors = ['1楼', '2楼'];
      } else if (canteen === '食堂C') {
        this.floors = ['1楼'];
      }
    },
    selectFloor(floor) {
      this.$router.push({ path: '/seat', query: { canteen: this.canteen, floor } });
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}

.floor-item {
  margin-bottom: 20px;
}

/* 图片和文本打包成容器，便于管理排版 */
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
</style>
 