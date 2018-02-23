import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Locales from './locales/locales'

import App from './components/App'
import MainView from './components/MainView'
import SearchView from './components/SearchView'
import AboutView from './components/AboutView'
import EmbedView from './components/EmbedView'
import EmbedFormView from './components/EmbedFormView'
import NotFoundView from './components/NotFoundView'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueI18n)

Vue.config.lang = 'pt'

// set locales
Object.keys(Locales).forEach(function (lang) {
  Vue.locale(lang, Locales[lang])
})

let router = new VueRouter(
  {
    history: true
    // root: '/beta/'
  }
  )

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
  },
  '/embed': {
    name: 'embed',
    component: EmbedView
  },
  '/embed-form': {
    name: 'embed-form',
    component: EmbedFormView
  },
  '*': {
    component: NotFoundView
  }
})

router.beforeEach(function (transition) {
  window.scrollTo(0, 0)
  transition.next()
})

router.afterEach(function (transition) {
  if (window.ga) {
    window.ga('send', 'pageview', { page: transition.to.path })
  }
  // console.log('Successfully navigated to: ' + transition.to.path)
})

router.start(App, '#app')
