<template>
  <div>
    <h2>选择楼层</h2>
    <div class="container">
      <div v-for="floor in floors" :key="floor" class="floor-item">
        <div class="floor-content">
          <img :src="`src/picture/floor/${floor}.jpg`" alt="加载中"> 
          <button @click="selectFloor(floor)">{{ floor }}</button>
        </div>
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
</style>
