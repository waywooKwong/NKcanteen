<template>
  <div>
    <h2>选择食堂</h2>
    <div v-for="canteen in canteens" :key="canteen">
      <button @click="selectCanteen(canteen)">{{ canteen }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canteens: ['食堂A', '食堂B', '食堂C']
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
button {
  margin: 5px;
}
</style>
