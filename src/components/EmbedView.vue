<template>
  <div id="form-wrapper">
    <p>É fácil colocar a caixa de pesquisa do ANT no seu site. Ajuste os valores e copie e cole o código na sua página.</p>
    <div id="search-form-embeddable" class="flex" style="min-width: {{formMinWidth}}px;transform-origin: 0 0;transform: scale({{scaleValue}});max-width: {{widthValue}}px;">
      <div class="logo shrink">
        <a href="http://ant.fe.up.pt" title="ANT - Pesquisa de Informação na Universidade do Porto">
          <img src="../assets/ant_logo.svg" alt="ANT - Pesquisa de Informação na Universidade do Porto" style="max-width:50px;">
        </a>
      </div>
      <search-form is-embedded="true" placeholder-text="Pesquisar no ANT"></search-form>
    </div>
    <div id="slidecontainer">
      <div class="flex four">
        <span class="one-fourth">Largura: </span>      
        <div id="width-slider" class="three-fourth">
        </div>
      </div>
      <div class="flex four">
        <span class="one-fourth">Escala: </span>      
        <div id="scale-slider" class="three-fourth">
        </div>
      </div>
    </div>
    <p id="embed-code" class="embed-code" v-if="embedCode">{{ embedCode }}</p>
    <a href="" id="copy-clipboard" @click.prevent="copyToClipboard">Copiar para o clipboard</a>
  </div>
</template>

<script>
  import SearchForm from './SearchForm'
  import noUiSlider from 'nouislider'

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
        embedCode: '',
        widthSlider: '',
        scaleSlider: '',
        scaledWidth: undefined
      }
    },
    ready () {
      this.initialWidth = document.getElementById('search-form-embeddable').getBoundingClientRect().width
      this.formHeight = document.getElementById('search-form-home').getBoundingClientRect().height
      this.createSliders()
    },
    watch: {
      'initialWidth': function (val, oldVal) {
        this.generateEmbedCode()
      },
      'scaleValue': function (val, oldVal) {
        this.formHeight = document.getElementById('search-form-home').getBoundingClientRect().height
        this.scaledWidth = this.widthValue * val
        this.generateEmbedCode()
      },
      'widthValue': function (val, oldVal) {
        this.generateEmbedCode()
      }
    },
    methods: {
      generateEmbedCode () {
        let embedWidth = this.scaledWidth || this.widthValue
        this.embedCode = '<iframe src="' + window.location.origin + '/embed-form?width=' + this.widthValue + '&scale=' + this.scaleValue + '"' + ' height="' + this.formHeight + 'px"' + ' width="' + embedWidth + 'px"' + ' scrolling="no" frameborder="0" allowtransparency="true">' + '</iframe>'
      },
      createSliders () {
        let widthSlider = document.getElementById('width-slider')
        let scaleSlider = document.getElementById('scale-slider')
        noUiSlider.create(widthSlider, {
          start: [this.initialWidth],
          step: 75,
          range: {
            'min': [this.formMinWidth],
            'max': [this.initialWidth]
          },
          format: {
            to: (val) => {
              return Math.round(val * 1e1) / 1e1
            },
            from: (val) => {
              return Math.round(val * 1e1) / 1e1
            }
          }
        })
        widthSlider.noUiSlider.on('update', (values) => {
          this.$set('widthValue', values[0])
        })
        this.$set('widthSlider', widthSlider)

        noUiSlider.create(scaleSlider, {
          start: [1],
          step: 0.05,
          range: {
            'min': [0.5],
            'max': [1]
          },
          format: {
            to: (val) => {
              return Math.round(val * 1e2) / 1e2
            },
            from: (val) => {
              return Math.round(val * 1e2) / 1e2
            }
          }
        })
        scaleSlider.noUiSlider.on('update', (values) => {
          this.$set('scaleValue', values[0])
        })
        this.$set('scaleSlider', scaleSlider)
      },
      copyToClipboard () {
        let range = document.createRange() // create new range object
        let el = document.getElementById('embed-code')
        range.selectNodeContents(el) // set range to encompass desired element text
        let selection = window.getSelection() // get Selection object from currently user selected text
        selection.removeAllRanges() // unselect any user selected text (if any)
        selection.addRange(range) // add range to Selection object to select it
        document.execCommand('copy')
        alert('Código copiado com sucesso.')
        // alert('Código copiado: ' + window.getSelection().toString())
      }
    }
  }
</script>

<style scoped>
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
    max-width: 400px;
  }

  #slidecontainer > .flex {
    align-items: center;
  }

  .flex > span {
    padding: 0px 10px !important;
  }

  .embed-code {
    background-color: #F7F7F7;
    padding: 20px;
    border-radius: 5px;
  }

  .flex.four:first-of-type {
    margin-bottom: 10px;
  }

  #copy-clipboard {
    border-radius: 5px;
    padding: 15px;
    color: #777;
    background-color: #f0f0f0;
  }

  #copy-clipboard:hover {
    color: #111;
  }
</style>

