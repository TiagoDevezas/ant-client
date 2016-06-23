<template>
  <about-link link-text="Sobre" link-path="about"></about-link>
  <div class="wrapper flex">  
    <div class="full">   
      <a v-link="{name: 'home'}" id="logo-link">
        ANT Pesquisa de Informação na Universidade do Porto
      </a>
    </div>
    <div class="full center-text">
      <span class="app-name">ANT</span>
    </div>
    <div class="flex form-container">
      <div class="full is-paddingless">
        <search-form is-focused="true"></search-form>
      </div>
    </div>
    <div class="full center-text">
        <span class="app-description">Pesquisa de Informação na Universidade do Porto.</span>
    </div>
    <div class="full">
        <latest-news :news-data="latestNews"></latest-news>
    </div>
  </div>
  <div id="footer" class="center-text">
    InfoLab, FEUP
  </div>
</template>

<script>
import store from '../store'
import SearchForm from './SearchForm'
import LatestNews from './LatestNews'
import AboutLink from './AboutLink'

export default {
  name: 'MainView',
  components: {
    SearchForm,
    LatestNews,
    AboutLink
  },
  data () {
    return {
      latestNews: []
    }
  },
  ready () {
    document.title = 'ANT - Pesquisa de Informação na Universidade do Porto'
    store.getLatestNews(this, 3)
  }
}
</script>

<style lang="scss"> 
  .wrapper {
    padding: 150px 10px 60px 10px;
    .form-container {
      margin: 0 auto;
      max-width: 650px;
    }
  }
  #logo-link {
    background-image: url("../assets/ant-logo.svg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 150px 100px;
    height: 100px;
    width: 150px;
    display: block;
    text-indent: -9999px;
    margin: 0 auto;
  }
  .center-text {
    text-align: center;
  }
  .is-paddingless {
    padding: 0;
  }
  .app-name {
    font-size: 35px;
    color: #4C4C4C;
  }
  .app-description {
    font-size: 16px;
    line-height: 1;
    color: #A3A3A3;
  }
  #footer {
    position: absolute;
    bottom: 0;
    left: 0;
    line-height: 50px;
    width: 100%;
    background-color: #F7F7F7;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
    color: #444444;
    font-size: 14px;
  }
</style>