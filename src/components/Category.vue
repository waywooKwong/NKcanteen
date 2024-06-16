<template>
  <router-view></router-view>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>
            <router-link :to="{ path: '/admin' }"> 首页 </router-link>
          </el-breadcrumb-item>

          <el-breadcrumb-item>{{ categoryName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 菜单管理 -->

      <div v-if="categoryId === '1'" class="menu-management">
        <!-- 显示菜单列表 -->
        <div class="menu-list">
          <h2>菜单列表</h2>
          <ul>
            <li v-for="(item, index) in menu" :key="index">
              <img :src="item.image" alt="菜品图片" />
              <div>
                <div class="name">{{ item.name }}</div>
                <div class="price">{{ item.price }} 元</div>

                <el-button @click="removeItem(index)" type="primary">
                  <el-icon>
                    <Delete />
                  </el-icon>
                  删除
                </el-button>

                <el-button
                  type="primary"
                  @click="(showDetailDialog = true), (selectedDish = item)"
                >
                  <el-icon>
                    <More />
                  </el-icon>
                  详细
                </el-button>
              </div>
            </li>
            <!-- 添加按钮 -->
            <li class="add-button" @click="showAddForm = true">
              <div>添加新菜品</div>
            </li>
          </ul>
        </div>
        <el-dialog v-model="showDetailDialog" title="详细信息" width="500px">
          <div class="Detail-Dialog" v-if="selectedDish">
            <img :src="selectedDish.image" alt="菜品图片" />
            <div>
              <div class="name">{{ selectedDish.name }}</div>
              <div class="price">{{ selectedDish.price }} 元</div>
              <div class="taste-rating">
                <span class="demonstration">辣度：</span>
                <el-rate v-model="value1" :colors="colors" />
              </div>
              <div class="taste-rating">
                <span class="demonstration">酸度：</span>
                <el-rate v-model="value2" :colors="colors" />
              </div>
            </div>
          </div>
        </el-dialog>

        <el-dialog v-model="showAddForm" title="添加菜品" width="500">
          <template #footer>
            <div class="add-item-form">
              <form @submit.prevent="addItem">
                <label
                  >请输入菜品名称：
                  <input
                    type="text"
                    v-model="newItem.name"
                    placeholder="请输入菜品名称"
                  />
                </label>
                <label
                  >请输入菜品价格：
                  <input
                    type="number"
                    v-model.number="newItem.price"
                    placeholder="请输入菜品价格"
                  />
                </label>
                <label
                  >请选择菜品图片：
                  <input type="file" @change="handleFileChange" />
                </label>
                <button type="submit">添加</button>
                <button type="button" @click="showAddForm = false">取消</button>
              </form>
            </div>
          </template>
        </el-dialog>
      </div>

      <!-- 窗口管理 -->
      <div v-if="categoryId === '2'" class="window-management">
        <h2>
          窗口信息
          <el-button @click="showEditForm = true">修改</el-button>
        </h2>
        <el-descriptions :title="''" :column="2" :size="size" border>
          <el-descriptions-item label="窗口ID">{{
            windowID
          }}</el-descriptions-item>
          <el-descriptions-item label="食堂">{{
            myWindow.canteen
          }}</el-descriptions-item>
          <el-descriptions-item label="楼层">{{
            myWindow.floor
          }}</el-descriptions-item>
          <el-descriptions-item label="负责人电话">{{
            myWindow.manager_phone
          }}</el-descriptions-item>
          <el-descriptions-item label="负责人邮箱">{{
            myWindow.manager_email
          }}</el-descriptions-item>
          <el-descriptions-item label="负责人微信">{{
            myWindow.manager_wechat
          }}</el-descriptions-item>
          <el-descriptions-item label="窗口名称">{{
            myWindow.window_name
          }}</el-descriptions-item>
        </el-descriptions>

        <!-- 修改窗口信息对话框 -->
        <el-dialog v-model="showEditForm" title="修改窗口信息" width="500">
          <template #footer>
            <div class="edit-item-form">
              <form @submit.prevent="editWindow">
                <label
                  >食堂：
                  <input
                    type="text"
                    v-model="editWindowData.canteen"
                    placeholder="请输入食堂名称"
                  />
                </label>
                <label
                  >楼层：
                  <input
                    type="number"
                    v-model="editWindowData.floor"
                    placeholder="请输入楼层"
                  />
                </label>
                <label
                  >负责人电话：
                  <input
                    type="text"
                    v-model="editWindowData.manager_phone"
                    placeholder="请输入负责人电话"
                  />
                </label>
                <label
                  >负责人邮箱：
                  <input
                    type="email"
                    v-model="editWindowData.manager_email"
                    placeholder="请输入负责人邮箱"
                  />
                </label>
                <label
                  >负责人微信：
                  <input
                    type="text"
                    v-model="editWindowData.manager_wechat"
                    placeholder="请输入负责人微信"
                  />
                </label>
                <label
                  >窗口名称：
                  <input
                    type="text"
                    v-model="editWindowData.window_name"
                    placeholder="请输入窗口名称"
                  />
                </label>
                <button type="submit">保存</button>
                <button type="button" @click="showEditForm = false">
                  取消
                </button>
              </form>
            </div>
          </template>
        </el-dialog>
      </div>

      <!-- 排队系统 -->
      <div v-if="categoryId === '3'" class="queue-system">
        <h2>我的订单</h2>
        <ul>
          <li v-for="order in orders" :key="order.id">
            <div>订单号：{{ order.id }}</div>
            <div>菜品：{{ order.dish_name }}</div>
            <div>数量：{{ order.quantity }}</div>
            <div>总价：{{ order.total_price }} 元</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'
import type { ComponentSize } from 'element-plus'
const size = ref<ComponentSize>('default')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

// 分类数据，包含 ID 和名称
const categories = [
  { id: 1, name: '我的菜单' },
  { id: 2, name: '我的窗口' },
  { id: 3, name: '我的订单' },
]

// 菜单数据，使用 ref 创建响应式数据
const menu = ref([])
const orders = ref([])
const selectedDish = ref(null)

const value1 = ref(0)
const value2 = ref(0)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])

const showAddForm = ref(false)
const showDetailDialog = ref(false)
const showEditForm = ref(false)
const route = useRoute()
const router = useRouter()
const store = useStore()
const categoryId = ref(null)
const categoryName = ref(null)

const windowID = store.state.windowID

// 新菜品的数据，使用 ref 创建响应式数据
const newItem = ref({
  win_id: windowID,
  name: '',
  price: 0,
  image: null,
})
const editWindowData = ref({
  canteen: '',
  floor: 0,
  manager_phone: '',
  manager_email: '',
  manager_wechat: '',
  window_name: '',
})
const myWindow = ref({
  window_id: windowID,
  canteen: '',
  floor: 0,
  manager_phone: '',
  manager_email: '',
  manager_wechat: '',
  window_name: '',
})

// 获取窗口数据
function fetchWindows(windowID) {
  console.log('Fetching window with ID:', windowID) // 添加调试信息
  axios
    .get(`http://localhost:3000/window`, { params: { windowID } })
    .then((response) => {
      const windowData = response.data[0] // 获取数组中的第一个对象
      console.log('API response:', windowData) // 打印 API 响应

      // 检查 windowData 是否存在并包含预期的属性
      if (windowData) {
        myWindow.value.window_id = windowData.window_id || ''
        myWindow.value.canteen = windowData.canteen || ''
        myWindow.value.floor = windowData.floor || 0
        myWindow.value.manager_phone = windowData.manager_phone || ''
        myWindow.value.manager_email = windowData.manager_email || ''
        myWindow.value.manager_wechat = windowData.manager_wechat || ''
        myWindow.value.window_name = windowData.window_name || ''
        console.log('Updated myWindow:', myWindow.value) // 打印更新后的 myWindow
      } else {
        console.error('No window data found')
      }
    })
    .catch((error) => {
      console.error('Failed to fetch window:', error)
    })
}

// 在 onMounted 和 afterEach 中调用 fetchWindows
onMounted(() => {
  updateCategoryName(route.params.id)
  fetchMenu()
  if (categoryId.value === '2') {
    fetchWindows(windowID)
  }
  if (categoryId.value === '3') {
    fetchOrders()
  }
})

router.afterEach((to) => {
  if (to.params.id !== categoryId.value) {
    updateCategoryName(to.params.id)
    if (to.params.id === '2') {
      fetchWindows(windowID)
    }
    if (to.params.id === '3') {
      fetchOrders()
    }
  }
})
watch(
  () => route.params.id,
  (newId) => {
    if (newId === '2') {
      fetchWindows(windowID)
    }
  }
)

// 根据分类 ID 更新分类名称
function updateCategoryName(id) {
  categoryId.value = id
  const category = categories.find((category) => category.id === Number(id))
  if (category) {
    categoryName.value = category.name
  } else {
    categoryName.value = '未知分类' // 如果找不到对应的分类，显示默认名称
  }
}

// 获取菜单数据
function fetchMenu() {
  axios
    .get('http://localhost:3000/dishes', { params: { windowID } })
    .then((response) => {
      menu.value = response.data
    })
    .catch((error) => {
      console.error('Failed to fetch menu:', error)
    })
}

// 获取订单数据
function fetchOrders() {
  axios
    .get(`http://localhost:3000/orders?windowId=${windowID}`)
    .then((response) => {
      orders.value = response.data
    })
    .catch((error) => {
      console.error('Failed to fetch orders:', error)
    })
}

// 添加菜品方法
const addItem = () => {
  const exists = menu.value.some((item) => item.name === newItem.value.name)

  if (exists) {
    alert('该菜品名称已存在，请输入不同的名称。')
  } else {
    const formData = new FormData()
    formData.append('win_id', newItem.value.win_id)
    formData.append('name', newItem.value.name)
    formData.append('price', String(newItem.value.price))
    formData.append('image', newItem.value.image)

    // 发送 POST 请求到后端
    axios
      .post('http://localhost:3000/dishes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        newItem.value.image = response.data.imageUrl
        // 添加完毕后清空表单数据
        newItem.value = { win_id: windowID, name: '', price: 0, image: null }
        showAddForm.value = false // 关闭表单
        fetchMenu()
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }
}

// 删除菜品方法
const removeItem = (index) => {
  const dish = menu.value[index]
  const dishId = dish.id
  axios
    .delete(`http://localhost:3000/dishes_delete`, { data: { id: dishId } })
    .then((response) => {
      console.log(response.data)
      menu.value.splice(index, 1) // 从前端列表中移除项目
    })
    .catch((error) => {
      console.error('Failed to delete dish:', error)
      alert('Failed to delete dish. Please try again.')
    })
}

const editWindow = () => {
  const windowData = {
    windowid: windowID,
    canteen: editWindowData.value.canteen,
    floor: editWindowData.value.floor,
    manager_phone: editWindowData.value.manager_phone,
    manager_email: editWindowData.value.manager_email,
    manager_wechat: editWindowData.value.manager_wechat,
    window_name: editWindowData.value.window_name,
  }

  axios
    .post('http://localhost:3000/windowupdate', windowData)
    .then((response) => {
      console.log(response.data)
      showEditForm.value = false // 关闭表单
      fetchWindows(windowID)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
}

// 处理上传文件变化
const handleFileChange = (event) => {
  newItem.value.image = event.target.files[0]
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';
.top-category {
  .container {
    margin-bottom: 20px;
    .bread-container {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .menu-management {
      display: flex;
      gap: 20px;
    }

    .window-management {
      .el-descriptions {
        margin-top: 30px;
      }
      .cell-item {
        display: flex;
        align-items: center;
      }
      .margin-top {
        margin-top: 30px;
      }
    }
    .menu-list {
      flex: 1;

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding: 0;
        list-style: none;
      }

      li {
        background: #f9f9f9;
        border: 2px solid $xtxColor;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 375px;
        text-align: center;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
        }

        img {
          width: 100%;
          height: 375px;
          object-fit: contain;
          border-bottom: 2px solid $xtxColor;
        }

        div {
          padding: 10px;
        }

        .name {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }

        .price {
          font-size: 16px;
          color: #666;
          margin: 10px 0;
        }

        button {
          background: #b20197;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: #c600c3;
          }
        }

        a {
          display: inline-block;
          margin-top: 10px;
          color: #b20197;
          text-decoration: none;
          transition: color 0.3s;

          &:hover {
            color: #c600c3;
          }
        }
      }

      .add-button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #e0e0e0;
        border-radius: 8px;
        width: 375px;
        height: 600px;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: #d0d0d0;
        }

        div {
          font-size: 18px;
          color: #333;
        }
      }
    }

    .add-item-form {
      flex: 1;

      form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
        margin-top: 20px;

        label {
          font-size: 16px;
          color: #333;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          input {
            width: 400px;
            margin-top: 5px;
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
        }

        button {
          background: #b20197;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: #c600c3;
          }

          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }
      }
    }

    .Detail-Dialog {
      .taste-rating {
        padding: 30px 0;
        text-align: center;
        border-right: solid 1px var(--el-border-color);
        display: inline-block;
        width: 49%;
        box-sizing: border-box;
      }

      .taste-rating:last-child {
        border-right: none;
      }

      .taste-rating .demonstration {
        display: block;
        color: var(--el-text-color-secondary);
        font-size: 14px;
        margin-bottom: 20px;
      }
    }

    .queue-system {
      ul {
        list-style: none;
        padding: 0;

        li {
          background: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 10px;

          div {
            margin-bottom: 5px;
          }
        }
      }
    }
    .edit-item-form {
      flex: 1;

      form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
        margin-top: 20px;

        label {
          font-size: 16px;
          color: #333;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          input {
            width: 400px;
            margin-top: 5px;
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
        }

        button {
          background: #b20197;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: #c600c3;
          }

          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
