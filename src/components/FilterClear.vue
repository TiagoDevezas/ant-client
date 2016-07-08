<template>
  <div class="dropdown" @click="clearFilters">
    <span class="dropdown-label">{{ btnLabel }}</span>
  </div>
</template>

<script>
  export default {
    props: ['activeFilters', 'btnLabel'],
    methods: {
      clearFilters () {
        let currentQuery = this.$route.query
        this.activeFilters.forEach(filter => {
          currentQuery[filter] = undefined
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