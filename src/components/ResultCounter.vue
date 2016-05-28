<template>
  <div id="results-counter" v-if="count">
    {{ count }} resultados ({{ timeToSearch }} segundos)
  </div>
</template>

<script>
  export default {
    props: ['count', 'currPage', 'timeToSearch']
  }
</script>

<style>
  #results-counter {
    font-size: 0.8em;
    color: #888888;
    text-align: left;
    padding-left: 10px;
  }
</style>