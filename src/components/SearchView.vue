<template>
  <about-link link-text="Sobre" link-path="about"></about-link>
  <div id="search">
  <div id="header-wrapper">
    <div id="header">
      <div class="header-search-wrap">
        <a v-link="'/'" id="header-logo-wrap">
          <span class="header-logo">ANT Pesquisa de Informação na Universidade do Porto</span>
        </a>
        <search-form :query-params="$route.query.q" class="search-top"></search-form>
      </div>
    </div>
    <result-filter :query-params="$route.query" :entity-types="getEntityTypes" :filter-data="data.queryData.filteredFacetsCount"></result-filter>
  </div>
  <div class="content-wrap-results">
    <search-tools :filter-data="data.queryData.filteredFacetsCount"></search-tools>
    <div class="cw"> 
      <div class="results-wrapper">
        <result-empty v-if="data.queryData.count === 0"></result-empty>
        <div v-if="data.queryData.count > 0">        
          <result-counter
            v-if="data.entities.length"
            :count="data.queryData.count"
            :curr-page="data.queryData.page"
            :time-to-search="timeToSearch">
            <feed-button :query="$route.query.q" :entity-type="$route.query.tipoentidade"></feed-button>
          </result-counter>
          <div class="results">
            <result-item v-for="entity in data.entities" :metadata="entity" :category="data.queryData.category">
            </result-item>
          </div>
        </div>
      </div>
      <result-paginator
        v-if="data.queryData.pages > 1"
        :num-pages="data.queryData.pages"
        :curr-page="data.queryData.page"
        :start-page="data.queryData.start"
        :total-results="data.queryData.count">
      </result-paginator>
    </div>
  </div>
  </div>
</template>

<script>
import store from '../store'
import SearchForm from './SearchForm'
import ResultItem from './ResultItem'
import ResultCounter from './ResultCounter'
import ResultPaginator from './ResultGPaginator'
import ResultFilter from './ResultFilter'
import ResultEmpty from './ResultEmpty'
import AboutLink from './AboutLink'
import FeedButton from './FeedButton'
import SearchTools from './SearchTools'

export default {
  components: {
    SearchForm,
    ResultItem,
    ResultCounter,
    ResultPaginator,
    ResultFilter,
    ResultEmpty,
    AboutLink,
    FeedButton,
    SearchTools
  },

  data () {
    return {
      data: {
        entities: [],
        queryData: []
      },
      timeToSearch: 0,
      facets: [],
      error: ''
    }
  },
  computed: {
    getEntityTypes () {
      let entityTypes = []
      entityTypes.push({value: 'todos', label: 'Todos'})
      let facetsCount = this.facets
      for (let i in facetsCount) {
        entityTypes.push({ value: facetsCount[i].label, count: facetsCount[i].value, label: facetsCount[i].label + 's'})
      }
      if (this.data.queryData.count === 0) {
        let entity = this.$route.query.tipoentidade
        if (entity) {
          entityTypes.push({value: entity, count: 0, label: entity.charAt(0).toUpperCase() + entity.slice(1) + 's'})
        }
      }
      return entityTypes
    },
    generateFeedLink () {
      if (this.data.queryData.count > 0) {
        const element = document.getElementById('rss-link')
        if (this.$route.query.tipoentidade === 'Notícia') {
          if (element) {
            element.parentNode.removeChild(element)
          }
          const feedLink = document.createElement('link')
          feedLink.href = 'http://ant.fe.up.pt/api/search/atom?q=' + this.$route.query.q + '&tipoentidade=' + this.$route.query.tipoentidade
          feedLink.rel = 'alternate'
          feedLink.title = 'Feed RSS de ant.fe.up.pt - Pesquisa: ' + this.$route.query.q + ' Filtro: ' + this.$route.query.tipoentidade
          feedLink.type = 'application/rss+xml'
          feedLink.id = 'rss-link'
          document.head.appendChild(feedLink)
        } else {
          if (element) {
            element.parentNode.removeChild(element)
          }
        }
      }
    }
  },
  watch: {
    'data.queryData': function (val, oldVal) {
      if (val && this.$route.query.q) {
        this.logSearchData()
      }
    }
  },
  route: {
    data (transition) {
      document.title = this.$route.query.q + ' - ANT'
      this.$broadcast('routeChange', transition)
      store.getData(this)
    }
  },
  methods: {
    logSearchData () {
      // console.log(this.data.queryData.length)
      let values = {
        query: this.$route.query.q.toString(),
        query_category: this.data.queryData.category.toString(),
        results_page: this.$route.query.start ? (this.$route.query.start / 10 + 1).toString() : '1',
        results_count: this.data.queryData.count.toString(),
        client_user_agent: window.navigator.userAgent.toString(),
        client_resolution: (window.screen.width + 'x' + window.screen.height).toString()
      }
      if (process.env.NODE_ENV === 'development') {
        values.is_test = true
      }
      this.$http.post('http://ant.fe.up.pt/api/log/event/search', values, {emulateJSON: true})
    }
  }
}

</script>

<style lang="scss">
  #search {
    height: 100%;
  }
  #header-wrapper {
    box-shadow: 0 1px 0 rgba(0,0,0,0.15);
    background-color: #f7f7f7;
    padding: 16px 0 0;
    position: relative;
    z-index: 15;
  }
  #header {
    position: relative;
    padding: 0 7px;
    max-width: 1008px;
    margin-left: 0;
    margin-right: auto;
  }
  .header-search-wrap {
    position: relative;
    margin-bottom: 3px;
    margin-top: 1px;
    padding: 0 94px;
    max-width: 634px;
  }
  #header-logo-wrap {
    height: 50px;
    margin: auto;
    margin-left: 3.5px;
    left: 0;
    display: block;
    width: 94px;
    position: absolute;
    top: 0;
  }
  .header-logo {
    background-image: url("../assets/ant-logo.svg");
    background-size: 50px 50px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
    margin-top: -10px;
    margin: -4px auto auto;
    position: relative;
    text-align: center;
    color: transparent;
    text-indent: -9999px;
    font-size: 0px;
    display: block;
  }
  .content-wrap-results {
    margin: 0 auto 40px auto;
    position: relative;
    /*background-color: #fefefe;*/
  }
  .cw {
    position: relative;
    padding: 0 7px;
    max-width: 800px;
    margin-left: 0;
    margin-right: auto;
    z-index: 0;
  }
  .results-wrapper {
    padding-top: 0.5em;
    position: relative;
    padding-left: 94px;
  }
  .results {
    margin: 34px 0 0;
  }
</style>
