<template>
  <div id="embed-form-wrapper">    
    <div class="flex" style="width: {{$route.query.width}}px;transform-origin: 0 0;transform: scale({{$route.query.scale}});">
      <div class="logo shrink">
        <a href="http://ant.fe.up.pt" title="ANT - Pesquisa de Informação na Universidade do Porto">
          <img src="../assets/ant_logo.svg" alt="ANT - Pesquisa de Informação na Universidade do Porto" width="50px">
        </a>
      </div>
      <search-form is-embedded="true" placeholder-text="Pesquisar no ANT"></search-form>
    </div>
  </div>
</template>

<script>
  import SearchForm from './SearchForm'

  export default {
    components: {
      SearchForm
    },
    data () {
      return {
        formMinWidth: 400
      }
    }
  }
</script>

<style>
  #embed-form-wrapper {
    padding-left: 10px;
  }
</style>
