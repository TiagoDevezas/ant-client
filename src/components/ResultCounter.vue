<template>
  <div id="results-counter" v-if="count">
    <span style="line-height: 18px;">{{ count }} resultados ({{ timeToSearch }} segundos)</span>
    <slot></slot>
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
    display: flex;
    align-content: center;
  }
</style>