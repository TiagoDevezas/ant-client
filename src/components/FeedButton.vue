<template>
  <span class="feed-icon">
    <a :href="generateFeedLink" class="feed-link">
      <i class="material-icons" title="Subscrever feed">rss_feed
      </i> 
    </a> 
  </span>
</template>

<script>
export default {
  props: ['query', 'entityType'],
  data () {
    return {
    }
  },
  computed: {
    generateFeedLink () {
      let baseURL = 'http://ant.fe.up.pt/api/search/atom'
      if (this.query) {
        baseURL += '?q=' + this.query
        if (this.entityType) {
          baseURL += '&tipoentidade=' + this.entityType
        }
      }
      return baseURL
    }
  }
}
</script>

<style lang="scss">
  .feed-icon {
/*    position: absolute;
    top: 5px;
    right: 10px;*/
    display: inline-flex;
    width: 18px;
    height: 18px;
    z-index: 100;
    margin-left: 10px;
    /*border: 1px solid rgba(0, 0, 0, .15);*/
    background-color: #e19126;
    border-radius: 20%;
  }
  .feed-link {
    color: #fff;
    &:visited, &:focus, &:active {
      color: #fff;
    }
    /*cursor: pointer;*/
  }
  .feed-link i.material-icons {
    font-size: 18px;
  }
</style>