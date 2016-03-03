<template>
<div id="search-form">  
  <form id="search-form-home" @submit="showResults" :class="{ 'focused': formFocused, 'unfocused': !formFocused }">
    <input id="search-input-home" type="text" v-model="queryParams" @focus="highlightForm" @blur="unhighlightForm">
  </form>
</div>
</template>

<script>
export default {
  props: ['queryParams', 'isFocused'],

  data () {
    return {
      formFocused: false
    }
  },

  methods: {
    showResults () {
      this.$route.router.go({
        name: 'search',
        query: {q: this.queryParams}
      })
    },
    highlightForm () {
      this.formFocused = true
    },
    unhighlightForm () {
      this.formFocused = false
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
  #search-form-home, .unfocused {
    font-size: 1.14em;
    padding-right: 3.5em;
    box-sizing: border-box;
    border-radius: 2px;
    display: block;
    position: relative;
    height: 2.8em;
    background-color: #ffffff;
    border: 1px solid #d0d0d0;
    padding-left: 0.75em;
  }
  #search-form-home.focused {
    border: 1px solid #d9230f;
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
  .search-top #search-form-home {
    background-color: #f7f7f7;
    height: 38px;
    padding-left: 9px;
    font-size: 1em;
  }
</style>