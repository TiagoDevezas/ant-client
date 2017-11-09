<template>
  <div> 
    {{ value }}
    {{ value2 }}
    <div id="slidecontainer">
      <input type="range" min="{{formMinWidth}}" max="{{initialWidth}}" v-model="value" step="50">
      <input type="range" min="0.5" max="1" v-model="value2" step="0.1">
    </div>
    <div id="search-form-embeddable" class="flex" style="min-width: {{formMinWidth}}px; max-width: {{value}}px;transform-origin: 0 0;transform: scale({{value2}});">
      <div class="logo shrink">
        <a href="http://ant.fe.up.pt" title="ANT - Pesquisa de Informação na Universidade do Porto">
          <img src="../assets/ant_logo.svg" alt="ANT - Pesquisa de Informação na Universidade do Porto" width="50px">
        </a>
      </div>
      <search-form is-embedded="true" placeholder-text="Pesquisar no ANT"></search-form>
    </div>
    <button @click.prevent="updateForm">Click me</button>
  </div>
</template>

<script>
  // Create new component on another route and when user clicks to generate code trigger an event and changes the component

  import SearchForm from './SearchForm'

  export default {
    components: {
      SearchForm
    },
    data () {
      return {
        formMinWidth: 400,
        defaultScale: 1,
        value: undefined,
        value2: 1,
        initialWidth: undefined
      }
    },
    ready () {
      this.initialWidth = document.getElementById('search-form-embeddable').offsetWidth
      console.log(this.initialWidth)
    },
    watch: {
      'initialWidth': function (val, oldVal) {
        this.value = val
      }
    },
    methods: {
      updateForm () {
        this.$broadcast('updateForm', 1)
      }
    }
  }
</script>

<style>
  #search-form-embeddable {
    padding: 10px;
    /*width: 500px;*/
/*    transform: scale(0.75);
    transform-origin: 0 0;*/
  }
</style>

