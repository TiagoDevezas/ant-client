<template>
  <div class="columns">
    <div class="column is-12">
      {{ sources.join(', ') }}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['sources']
  }
</script>