<template>
  <li class="search-tools-button">
    <div @click="toggleSearchOptions">Ferramentas de Pesquisa</div>
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
        this.$root.$broadcast('toggleSearchOptions', this.isToggled)
      }
    }
  }
</script>

<style>

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
  
</style>