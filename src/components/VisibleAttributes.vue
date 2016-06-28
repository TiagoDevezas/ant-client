<template>
<p>Hello from component</p>
<div class="result-more-data" :class="{ 'toggle': isToggled }">
  <span>This will be hidden</span>
  <span>This will also be hidden</span>
</div>
</template>

<script>
  export default {
    props: ['isToggled']
  }
</script>

<style>
</style>