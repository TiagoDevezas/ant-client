<template>
  <div class="shrink no-bottom-padding">
    <img :src="getPicture" :alt="setAltText" :title="title" width="75px">
  </div>
</template>

<script>
  export default {
    props: ['title', 'link'],
    computed: {
      getPicture () {
        return 'https://sigarra.up.pt/feup/pt/fotografias_service.foto?pct_cod=' + this.link.split('=')[1] + ''
      },
      setAltText () {
        return 'Foto de ' + this.title
      }
    }
  }
</script>

<style>
  .shrink {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    max-width: 100%;
  }
</style>