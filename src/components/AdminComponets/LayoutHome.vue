<template>
  <div>
    <div class="block text-center">
      <span class="demonstration"></span>
      <el-carousel
        height="400px"
        motion-blur
        :interval="4000"
        type="card"
        autoplay="true"
      >
        <el-carousel-item v-for="dish in menu" :key="dish.id">
          <div class="carousel-content">
            <img :src="dish.image" alt="dish.name" class="carousel-image" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const store = useStore()
const windowID = store.state.windowID

const menu = ref([])

const fetchMenu = async () => {
  try {
    const response = await axios.get('http://localhost:3000/dishes', {
      params: { windowID },
    })
    menu.value = response.data
  } catch (error) {
    console.error('Failed to fetch menu:', error)
  }
}

onMounted(fetchMenu)
</script>

<style scoped>
@import '@/styles/common.scss';
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 1.5;
  margin: 10px 0;
  text-align: center;
}

.el-carousel__item p {
  color: #475669;
  opacity: 0.75;
  text-align: center;
}

.carousel-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.carousel-image {
  width: auto;
  height: 400px;
  object-fit: cover;
}
</style>
