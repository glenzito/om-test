
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryDetailView from '../views/CountryDetailView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/country/:countryName',
    name: 'countryDetail',
    component: CountryDetailView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

