<template>
  <div id="results-counter" v-if="count">
    Página {{ currPage }} de {{ count }} resultados
  </div>
</template>

<script>
  export default {
    props: ['count', 'currPage']
  }
</script>

<style>
  #results-counter {
    font-size: 0.8em;
    color: #888888;
    text-align: right;
  }
</style>