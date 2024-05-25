// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CanteenSelection from '../components/CanteenSelection.vue';
import FloorSelection from '../components/FloorSelection.vue';
import SeatSelection from '../components/SeatSelection.vue';
import Summary from '../components/Summary.vue';

const routes = [
  { path: '/', component: CanteenSelection },
  { path: '/floor', component: FloorSelection },
  { path: '/seat', component: SeatSelection },
  { path: '/summary', component: Summary }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
