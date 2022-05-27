import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Index from '../components/Index.vue'
import Mine from '../components/Mine.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Classify from '../components/Classify.vue'
import Doctor from '../components/Doctor.vue'
import Order from '../components/Order.vue'
import Change from '../components/Changepassword.vue'
import User from '../components/User.vue'
import List from '../components/List.vue'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/order', component: Order },
  { path: '/changepassword', component: Change },
  { path: '/user', component: User },
  {
    path: '/home',
    component: Home,
    redirect: './index',
    children: [
      { path: '/index', component: Index },
      { path: '/mine', component: Mine },
      { path: '/classify', component: Classify },
      { path: '/doctor', component: Doctor },
      { path: '/list', component: List },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
