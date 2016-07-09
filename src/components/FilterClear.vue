<template>
  <div class="dropdown" @click="clearFilters">
    <span class="dropdown-label">{{ btnLabel }}</span>
  </div>
</template>

<script>
  export default {
    props: ['activeFilters', 'btnLabel'],
    methods: {
      // Remove all active facet filters from URL
      clearFilters () {
        let currentQuery = this.$route.query
        this.activeFilters.forEach(filter => {
          currentQuery[filter] = undefined
          if (['dd', 'dw', 'dm', 'dy'].indexOf(filter) !== -1) {
            currentQuery['d'] = undefined
            currentQuery['sd'] = undefined
            currentQuery['ed'] = undefined
            this.$dispatch('removeFromActiveFilters', filter)
          }
        })
        this.$router.go({
          name: 'search',
          query: currentQuery
        })
      }
    }
  }
</script>

<style></style>