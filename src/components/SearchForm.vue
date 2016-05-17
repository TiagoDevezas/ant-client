<template>
<div id="search-form">  
  <form id="search-form-home" @submit.prevent="showResults" :class="['animated', { 'focused': formFocused, 'unfocused': !formFocused, 'shake': shakeForm }]">
    <input id="search-input-home" type="text" v-model="queryParams" @focus="highlightForm" @blur="unhighlightForm" placeholder="Introduza a sua pesquisa">
    <input id="search-button-home" :class="['material-icons', {'btn-highlight': buttonFocused}]" tabindex="2" value="search" type="submit">
  </form>
</div>
</template>

<script>
export default {
  props: ['queryParams', 'isFocused'],

  data () {
    return {
      formFocused: false,
      buttonFocused: false,
      shakeForm: false
    }
  },
  methods: {
    showResults () {
      this.$el.childNodes[1][0].blur()
      this.formFocused = false
      this.buttonFocused = false
      this.shakeForm = false
      if (this.queryParams.length) {
        this.$router.go({
          name: 'search',
          query: {q: this.queryParams, tipoentidade: this.$route.query.tipoentidade}
        })
      } else {
        this.$el.childNodes[1][0].focus()
        this.$set('shakeForm', true)
        this.removeShakeClass()
      }
    },
    highlightForm () {
      this.formFocused = true
    },
    unhighlightForm () {
      this.formFocused = false
    },
    removeShakeClass () {
      const that = this
      setTimeout(function () {
        that.shakeForm = false
      }, 1500)
    }
  },
  watch: {
    'queryParams': function (val, oldVal) {
      if (val !== oldVal && val.length > 0 && this.formFocused) {
        this.buttonFocused = true
      } else {
        this.buttonFocused = false
      }
      // if the form input has no value, use value from the query
      if (!val && this.$route.query.q) {
        this.$set('queryParams', this.$route.query.q)
      }
    }
  },
  ready () {
    if (this.isFocused) {
      this.$el.childNodes[1][0].focus()
    }
  }
}
</script>

<style>
  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  @keyframes shake {
    0%, 100% {transform: translateX(0);}
    10%, 30%, 50%, 70%, 90% {transform: translateX(-10px);}
    20%, 40%, 60%, 80% {transform: translateX(10px);}
  }

  .shake {
    animation-name: shake;
  }

  #search-form-home, .unfocused {
    font-size: 1.14em;
    padding: 0.5em 3.5em 0.5em 0.75em;
    box-sizing: border-box;
    border-radius: 2px;
    display: block;
    position: relative;
    height: 2.8em;
    background-color: #ffffff;
    border: 1px solid #d0d0d0;
  }
  #search-form-home.focused {
    border: 1px solid #4285f4;
  }
  #search-input-home {
    font-size: 1.1em;
    font-weight: normal;
    color: #333333;
    display: block;
    width: 100%;
    background: none;
    outline: none;
    border: none;
    padding: 0;
    height: 100%;
    position: relative;
    z-index: 1;
    top: -1px;
  }

  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color:    #ddd;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
     color:    #ddd;
     opacity:  1;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
     color:    #ddd;
     opacity:  1;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
     color:    #ddd;
  }

  #search-button-home {
    border-radius: 2px;
    min-width: 26px;
    color: #aaa;
    font-size: 1.25em;
    padding: 0 0.64em 0 0.54em;
    height: auto;
    min-height: 1.4em;
    margin: 2px 0;
    /*line-height: 1.5;*/
    background-color: transparent;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 2px;
    left: auto;
    z-index: 2;
    outline: none;
    width: 2em;
    display: block;
    cursor: pointer;
    background: transparent;
    text-align: center;
    border: none;
    color: #111111;
    font-size: 1.3em;
  }

  #search-button-home:hover, .btn-highlight {
    background: #4285f4 !important;
    color: #ffffff !important;
  }

  .search-top #search-form-home {
    background-color: #fff;
    height: 38px;
    padding-left: 9px;
    font-size: 1em;
  }
</style>