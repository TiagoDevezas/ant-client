import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './components/App'
import MainView from './components/MainView'
import SearchView from './components/SearchView'

Vue.use(VueRouter)
Vue.use(VueResource)

export var router = new VueRouter()

router.map({
  '/': {
    name: 'home',
    component: MainView
  },
  '/search': {
    name: 'search',
    component: SearchView
  }
})

router.afterEach(function (transition) {
  console.log('Successfully navigated to: ' + transition.to.path)
})

router.start(App, '#app')
