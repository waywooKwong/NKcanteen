<template>
  <div class="container">
    <transition name="fade" mode="out-in">
      <img
        :src="currentImg"
        :key="currentImg"
        alt="Dynamic Image"
        class="background-img"
      />
    </transition>
    <div class="options">
      <p @mouseover="changeImg('img2')" @click="chooseSeat" class="option">
        座位预定
      </p>
      <p @mouseover="changeImg('img1')" @click="chooseDish" class="option">
        菜品选择
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentImg: '/src/assets/images/select/img1.jpg',
      img: {
        img1: '/src/assets/images/select/img1.jpg',
        img2: '/src/assets/images/select/img2.jpg',
      },
    }
  },
  computed: {
    floor() {
      return this.$route.query.floor
    },
    canteen() {
      return this.$route.query.canteen
    },
  },
  methods: {
    changeImg(imgName) {
      this.currentImg = this.img[imgName]
    },
    chooseSeat() {
      this.$router.push({
        path: '/seat',
        query: {
          floor: this.floor,
          canteen: this.canteen,
        },
      })
    },
    chooseDish() {
      this.$router.push({
        path: '/Order',
        query: {
          floor: this.floor,
          canteen: this.canteen,
        },
      })
    },
  },
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: linear-gradient(120deg, #7e0c6e 0%, #c0c0c0 100%);
}

.options {
  height: 200px;
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.option {
  font-size: 24px;
  color: #333;
  margin: 20px 0;
  cursor: pointer;
  transition: color 0.7s;
}

.option:hover {
  color: #ffffff;
}

.background-img {
  width: 60%;
  height: auto;
  height: 80vh;
  object-fit: cover;
  border-radius: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
