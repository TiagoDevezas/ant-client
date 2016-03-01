<template>
  <div id="search">
  <div id="header-wrapper">
    <div id="header">
      <div class="header-search-wrap">
        <a v-link="'/'" id="header-logo-wrap">
          <span class="header-logo">ANT Pesquisa Orientada a Entidades</span>
        </a>
        <search-form :query-params="queryParams.q" class="search-top"></search-form>
      </div>
    </div>
  </div>
  <div class="content-wrap-results">
    <div class="cw">
      <div class="results-wrapper">
        <result-counter
          v-if="data.entities.length"
          :count="data.metadata.count"
          :curr-page="data.metadata.page">
        </result-counter>  
        <div class="results">
          <result-item v-for="(index, entity) in data.entities | orderBy 'rank'" :metadata="entity">
          </result-item>
        </div>
      </div>
      <result-paginator
        v-if="data.entities.length"
        :num-pages="data.metadata.pages"
        :curr-page="data.metadata.page"
        :start-page="data.metadata.start"
        :total-results="data.metadata.count">
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

export default {
  components: {
    SearchForm,
    ResultItem,
    ResultCounter,
    ResultPaginator
  },

  data () {
    return {
      data: {
        entities: [],
        metadata: []
      },
      queryParams: {
        q: '',
        start: ''
      }
    }
  },
  route: {
    data () {
      this.data.entities = []
      this.data.metadata = []
      store.getEntitiesWithMetadata(this)
      this.$set('queryParams.q', this.$route.query.q)
    }
  }
}

</script>

<style>
  #search {
    height: 100%;
  }
  #header-wrapper {
    box-shadow: 0 1px 0 rgba(0,0,0,0.15);
    background-color: #fff;
    padding: 16px 0;
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
    margin: 0 auto;
    position: relative;
    /*background-color: #fefefe;*/
  }
  .cw {
    position: relative;
    padding: 0 7px;
    max-width: 1008px;
    margin-left: 0;
    margin-right: auto;
  }
  .results-wrapper {
    padding-top: 0.5em;
    position: relative;
    padding-left: 94px;
  }
  .results {
    margin: 0.5em 0 0;
  }
</style>
