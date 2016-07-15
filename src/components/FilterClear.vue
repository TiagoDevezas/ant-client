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
          if (['dd', 'dw', 'dm', 'dy', 'dr', 'cr'].indexOf(filter) !== -1) {
            currentQuery['s'] = undefined
            currentQuery['d'] = undefined
            currentQuery['sd'] = undefined
            currentQuery['ed'] = undefined
            currentQuery['cr'] = undefined
            currentQuery['min_credits'] = undefined
            currentQuery['max_credits'] = undefined
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