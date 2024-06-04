<template>
  <div>
    <h2>选择食堂</h2>
    <div v-for="canteen in canteens" :key="canteen">
      <button @click="selectCanteen(canteen)">
        {{ canteen }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canteens: ['canteen1', 'canteen2', 'canteen3']
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
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
}
</style>