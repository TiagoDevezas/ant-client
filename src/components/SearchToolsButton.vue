<template>
  <li class="search-tools-button">
    <div @click="toggleSearchOptions" :class="{ 'search-button-active': isToggled }">
      Ferramentas de Pesquisa
    </div>
  </li>
</template>

<script>
  export default {
    data () {
      return {
        isToggled: false
      }
    },
    methods: {
      toggleSearchOptions () {
        this.$set('isToggled', !this.isToggled)
        let facetBar = document.getElementById('search-tools')
        let resultCounter = document.getElementById('results-counter')
        if (this.isToggled && facetBar && resultCounter) {
          facetBar.classList.add('show')
          resultCounter.classList.add('slide-out')
        } else if (!this.isToggled && facetBar && resultCounter) {
          facetBar.classList.remove('show')
          resultCounter.classList.remove('slide-out')
        }
        this.$root.$broadcast('toggleFacetsBar', this.isToggled)
      }
    },
    events: {
      'toggleButton' () {
        this.toggleSearchOptions()
      }
    }
  }
</script>

<style lang="scss">

.search-tools-button {
  color: #666;
  text-decoration: none;
  font-size: .75em;
  text-transform: none;
  font-weight: 600;
}

.search-tools-button > div {
  display: inline;
  padding: 5px 5px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid transparent;
}

.search-tools-button > div:hover {
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #aaa;
}

.search-button-active {
  background-color: #cfcfcf !important;
  &:hover {
    background-color: #c1c1c1 !important;
  }
}
  
</style>