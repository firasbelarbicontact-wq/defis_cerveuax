import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import GamePage from '../views/GamePage.vue';
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { 
    path: '/game/:name', 
    name: 'GamePage', 
    component: GamePage 
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;