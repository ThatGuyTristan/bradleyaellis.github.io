import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recipes/:id',
    name: 'Recipe',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Recipe.vue')
  },
  {
    path: '/recipes/search',
    name: "Search",
    component: () => import( /* webpackChunkName: "search" */ '@/views/RecipeList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
