<template>
  <div id="form-wrapper"> 
    <div id="search-form-embeddable" class="flex" style="min-width: {{formMinWidth}}px; max-width: {{widthValue}}px;transform-origin: 0 0;transform: scale({{scaleValue}});">
      <div class="logo shrink">
        <a href="http://ant.fe.up.pt" title="ANT - Pesquisa de Informação na Universidade do Porto">
          <img src="../assets/ant_logo.svg" alt="ANT - Pesquisa de Informação na Universidade do Porto" width="50px">
        </a>
      </div>
      <search-form is-embedded="true" placeholder-text="Pesquisar no ANT"></search-form>
    </div>
<!--     {{ widthValue }}
    {{ scaleValue }}
    {{ formHeight }} -->
    <div id="slidecontainer">
      Largura: <input type="range" min="{{formMinWidth}}" max="{{initialWidth}}" v-model="widthValue" step="75">
      Escala: <input type="range" min="0.5" max="1" v-model="scaleValue" step="0.01">
    </div>
    <button @click.prevent="generateEmbedCode">Gerar código</button>
    <p v-if="embedCode">{{ embedCode }}</p>
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
        formMinWidth: 400,
        formHeight: 0,
        widthValue: undefined,
        scaleValue: 1,
        initialWidth: undefined,
        embedCode: ''
      }
    },
    ready () {
      console.log(window.location.origin)
      this.initialWidth = document.getElementById('search-form-embeddable').offsetWidth
      this.formHeight = document.getElementById('search-form-home').getBoundingClientRect().height
    },
    watch: {
      'initialWidth': function (val, oldVal) {
        this.widthValue = val
        this.embedCode = null
      },
      'scaleValue': function (val, oldVal) {
        this.formHeight = document.getElementById('search-form-home').getBoundingClientRect().height
        this.embedCode = null
      }
    },
    methods: {
      generateEmbedCode () {
        this.embedCode = '<iframe src="' + window.location.origin + '/embed-form?width=' + this.widthValue + '&scale=' + this.scaleValue + '"' + ' height="' + this.formHeight + 'px"' + ' width="' + this.widthValue + 'px"' + ' scrolling="no" frameborder="0">' + '</iframe>'
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
  #form-wrapper {
    margin: 0 auto;
    max-width: 1080px;
  }
  #slidecontainer {
    max-width: 300px;
  }
</style>

