import { createRouter, createWebHistory } from 'vue-router'
import LoginUser from '@/components/LoginComponets/LoginUser.vue'
import RegisterUser from '@/components/RegisterComponets/RegisterUser.vue'
import Home from '@/components/LoginComponets/Home.vue'
import CanteenSelection from '@/components/UserComponets/CanteenSelection.vue'
import FloorSelection from '@/components/UserComponets/FloorSelection.vue'
import SeatSelection from '@/components/UserComponets/SeatSelection.vue'
import Summary from '@/components/UserComponets/Summary.vue'
import Layout from '@/components/AdminComponets/Admin.vue'
import Category from '@/components/UserComponets/Category.vue'
import LayoutHome from '@/components/AdminComponets/LayoutHome.vue'
import LoginAdmin from '@/components/LoginComponets/LoginAdmin.vue'
import RegisterAdmin from '@/components/RegisterComponets/RegisterAdmin.vue'
import SelectOpeate from '@/components/UserComponets/SelectOpeate.vue'
import Order from '@/components/UserComponets/Order.vue'
const routes = [
  {
    path: '/',
    redirect: '/home', // 添加默认重定向
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/LoginUser',
    component: LoginUser,
  },
  {
    path: '/LoginAdmin',
    component: LoginAdmin,
  },
  {
    path: '/RegisterUser',
    component: RegisterUser,
  },
  {
    path: '/canteen',
    component: CanteenSelection,
  },
  {
    path: '/floor',
    component: FloorSelection,
  },
  {
    path: '/seat',
    component: SeatSelection,
  },
  {
    path: '/summary',
    component: Summary,
  },
  {
    path: '/admin',
    component: Layout,

    children: [
      {
        path: '',
        component: LayoutHome,
        props: true,
      },

      {
        path: 'category/:id',
        component: Category,
        props: true,
      },
    ],
    props: true,
  },
  {
    path: '/RegisterAdmin',
    component: RegisterAdmin,
  },
  {
    path: '/selectopeate',
    component: SelectOpeate,
  },
  {
    path: '/order',
    component: Order,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
