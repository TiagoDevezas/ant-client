<template>
  <div id="results-counter" v-show="count">
    <span style="line-height: 1;">{{ count }} resultados ({{ timeToSearch }} segundos)</span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['count', 'timeToSearch']
  }
</script>

<style>
  #results-counter {
    font-size: 0.8em;
    color: #888888;
    text-align: left;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    padding: 10px 0 11px 10px;
    z-index: 1;
    transition: top 220ms ease-in-out;
  }
</style>