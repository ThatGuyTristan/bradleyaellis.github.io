import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err)
};

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: {  name: 'Recipe' }
  },
  {
    path: '/recipe/',
    name: 'Recipe',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Recipe.vue')
  },
  {
    path: '/recipes/search/:query',
    name: "RecipeList",
    component: () => import( /* webpackChunkName: "search" */ '@/views/RecipeList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
