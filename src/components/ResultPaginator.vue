<template>
  <div id="pagination">
    <div class="pagination-wrapper">
      <div class="pagination-separator" v-if="currPage > 1">
        <a v-link="{ name: 'search', query: { q: this.$route.query.q, start: 0 }}">
          <i class="material-icons">first_page</i>
        </a>
      </div>
      <div class="pagination-separator" v-if="currPage > 1">
        <a v-link="{ name: 'search', query: { q: this.$route.query.q, start: (this.startPage - 10) }}">
          <i class="material-icons">chevron_left</i>
        </a>
      </div>
      <p class="pagination-separator pagination-counter" class="page-count">Página {{ currPage }} de {{ numPages }}</p>
      <div class="pagination-separator" v-if="currPage < numPages">
        <a v-link="{ name: 'search', query: { q: this.$route.query.q, start: (this.startPage + 10) }}">
          <i class="material-icons">chevron_right</i>
        </a>
      </div>
      <div class="pagination-separator" v-if="currPage < numPages">
        <a v-link="{ name: 'search', query: { q: this.$route.query.q, start: lastPage }}">
          <i class="material-icons">last_page</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['numPages', 'currPage', 'startPage', 'totalResults'],
    computed: {
      lastPage () {
        return Math.floor(this.totalResults / 10) * 10
      }
    },
    methods: {
    }
  }
</script>

<style>
  #pagination {
    padding-top: 0.5em;
    position: relative;
    padding-left: 94px;
    margin-bottom: 2em;
  }

  .pagination-wrapper {
    display: inline-block;
    box-sizing: border-box;
    /*padding: 0.5em 0;*/
    margin: 0;
    position: relative;
    word-wrap: break-word;
    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
    background-color: #fff;
    border: 1px solid #dbdbdb;
  }

  .pagination-separator {
    vertical-align: middle;
    border-right: 1px solid #dbdbdb;
    float: left;
  }

  .pagination-separator:not(p):hover {
    background-color: #eee;
  }

  .pagination-counter {
    padding: 0.5em 1em;
    line-height: 30px;
    margin: 0;
    font-size: 0.8em;
    color: #888888;
  }

  .pagination-separator a {
    display: block;
    padding: 0.5em 1em;
    text-decoration: none;
    color: #d9230f;
  }

  .pagination-separator a:hover {
    color: #a91b0c;
  }

  .pagination-separator i.material-icons {
    display: inline-block;
    vertical-align: middle;
    
  }

</style>