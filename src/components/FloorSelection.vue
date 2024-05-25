<template>
  <div>
    <h2>选择楼层</h2>
    <div v-for="floor in floors" :key="floor">
      <button @click="selectFloor(floor)">{{ floor }}</button>
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
button {
  margin: 5px;
}
</style>
 