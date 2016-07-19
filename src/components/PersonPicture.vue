<template>
  <div class="shrink no-bottom-padding">
    <img :src="displayUrl" :alt="setAltText" :title="title" width="75px">
  </div>
</template>

<script>
  import defaults from '../defaults'
  
  export default {
    props: ['title', 'link', 'photoUrl'],
    data () {
      return {
        displayUrl: ''
      }
    },
    methods: {
      getPicture () {
        let photoUrl = 'https://sigarra.up.pt/feup/pt/fotografias_service.foto?pct_cod=' + this.link.split('=')[1]
        let promise = this.$http({url: defaults.photo_service + photoUrl, method: 'GET'})
        promise.then(res => {
          if (res.ok) {
            this.$set('displayUrl', photoUrl)
          } else {
            return promise.reject()
          }
        }, (res) => {
          this.$set('displayUrl', defaults.img_placeholder)
        })
      }
    },
    computed: {
      setAltText () {
        return 'Foto de ' + this.title
      }
    },
    ready () {
      this.$set('displayUrl', defaults.img_placeholder)
      this.getPicture()
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