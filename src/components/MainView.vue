<template>
  <div class="wrapper">
    <div class="content-wrap">
      <div class="content-container">
        <div class="logo-wrap">
          <a v-link="'/'" id="logo-link">
            ANT Pesquisa Orientada a Entidades
          </a>
        </div>
        <div class="text-wrap">
          <p class="app-name">ANT</p>
        </div>
        <div class="search-wrap">
          <search-form is-focused="true"></search-form>
        </div>
        <div class="text-wrap">
          <p class="app-description">Pesquisa orientada a entidades.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from './SearchForm'

export default {
  name: 'MainView',

  components: {
    SearchForm
  },
  ready () {
    document.title = 'ANT - Pesquisa orientada a entidades'
  }
}
</script>

<style>
  .wrapper {
    height: 100%;
    min-height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .content-wrap {
    position: absolute;
    margin: auto;
    width: 100%;
    top: 24%;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .content-container {
    position: relative;
    margin: 0 auto;
    max-width: 1008px;
    padding: 0 7px;
  }
  .logo-wrap, .text-wrap {
    position: relative;
    display: block;
    max-width: 300px;
    margin: auto;
    margin-bottom: 0.8em;
  }

  .text-wrap {
    margin-bottom: 0;
    text-align: center;
  }
  .app-name {
    margin: 0;
    font-size: 35px;
    line-height: 1;
    color: #4C4C4C;
  }
  .app-description {
    font-size: 1em;
    line-height: 1;
    color: #A3A3A3;
  }

  #logo-link {
    background-image: url("../assets/ant-logo.svg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 150px 100px;
    width: 150px;
    height: 100px;
    margin: auto;
    display: block;
    position: relative;
    text-align: center;
    color: transparent;
    text-indent: -9999px;
    font-size: 0px;
  }
  .search-wrap {
    padding: 1.3em 0.8em 1em;
    max-width: 634px;
    margin: 0 auto;
    display: block;
    float: none;
    width: 70%;
  }
</style>