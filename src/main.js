import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './components/App'
import MainView from './components/MainView'
import SearchView from './components/SearchView'
import AboutView from './components/AboutView'

Vue.use(VueRouter)
Vue.use(VueResource)

export var router = new VueRouter({history: true})

router.map({
  '/': {
    name: 'home',
    component: MainView
  },
  '/search': {
    name: 'search',
    component: SearchView
  },
  '/about': {
    name: 'about',
    component: AboutView
  }
})

router.afterEach(function (transition) {
  if (window.ga) {
    window.ga('send', 'pageview', { page: transition.to.path })
  }
  // console.log('Successfully navigated to: ' + transition.to.path)
})

router.start(App, '#app')
