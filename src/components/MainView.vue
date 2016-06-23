<template>
  <about-link link-text="Sobre" link-path="about"></about-link>
  <div class="wrapper">  
    <div class="columns is-marginless is-desktop">
      <div class="column is-half is-offset-one-quarter is-paddingless">
        <a v-link="{name: 'home'}" id="logo-link">
          ANT Pesquisa de Informação na Universidade do Porto
        </a>
      </div>
    </div>
    <div class="columns is-marginless is-desktop">
      <div class="column is-half is-offset-one-quarter center-text is-paddingless">
        <p class="app-name">ANT</p>
      </div>
    </div>
    <div class="columns is-marginless is-desktop">
      <div class="column is-6 is-offset-3 center-text">
        <search-form is-focused="true"></search-form>
      </div>
    </div>
    <div class="columns is-marginless is-desktop">
      <div class="column is-half is-offset-one-quarter center-text">
        <p class="app-description">Pesquisa de Informação na Universidade do Porto.</p>
      </div>
    </div>
    <div class="columns is-marginless is-desktop">
      <div class="column is-half is-offset-one-quarter">
        <latest-news :news-data="latestNews"></latest-news>
      </div>
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
    padding-top: 200px;
    padding-bottom: 60px;
  }
  #logo-link {
    background-image: url("../assets/ant-logo.svg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 150px 100px;
    height: 100px;
    display: block;
    text-indent: -9999px;
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