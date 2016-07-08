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
        this.$root.$broadcast('toggleFacetsBar', this.isToggled)
      }
    },
    events: {
      'clickButton' () {
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
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #eee;
  border: 1px solid #aaa;
}

.search-tools-button > div:hover {
  background-color: #ddd;
}

.search-button-active {
  background-color: #cfcfcf !important;
  &:hover {
    background-color: #c1c1c1 !important;
  }
}
  
</style>