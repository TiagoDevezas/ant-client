<template>
<div id="pagination">
  <div class="pagination-wrapper">  
    <ul class="page-navigation">
      <li v-if="currPage > 1">
        <a v-link="{ name: 'search', query: generatePreviousQuery }">
<!--         <a v-link="{ name: 'search', query: { q: this.$route.query.q, tipoentidade: this.$route.query.tipoentidade, start: this.startPage - 10 }}"> -->
          <i class="material-icons">chevron_left</i>
        </a>
      </li>
      <li v-for="page in getPages">
        <a :class="{'active': isStartPage(page.pageNum)}" v-link="{ name: 'search', query: page.query }">
          {{ page.pageNum }}
        </a>
      </li>
      <li v-if="currPage < numPages">
        <a v-link="{ name: 'search', query: generateNextQuery }">
<!--         <a v-link="{ name: 'search', query: { q: this.$route.query.q, tipoentidade: this.$route.query.tipoentidade, start: (this.startPage + 10) }}"> -->
          <i class="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
  export default {
    props: ['numPages', 'currPage', 'startPage', 'totalResults'],
    computed: {
      generatePreviousQuery () {
        let currentQuery = JSON.parse(JSON.stringify(this.$route.query))
        currentQuery['start'] = this.startPage - 10
        return currentQuery
      },
      generateNextQuery () {
        let currentQuery = JSON.parse(JSON.stringify(this.$route.query))
        currentQuery['start'] = this.startPage + 10
        return currentQuery
      },
      getPages () {
        let startPage
        let endPage
        let pageArray = []
        let currentPage = this.currPage
        let totalPages = this.numPages

        if (totalPages < 10) {
          startPage = 1
          endPage = totalPages
        } else {
          if (currentPage <= 6) {
            startPage = 1
            endPage = 10
          } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9
            endPage = totalPages
          } else {
            startPage = currentPage - 5
            endPage = currentPage + 4
          }
        }
        for (let i = startPage; i <= endPage; i++) {
          let currentQuery = JSON.parse(JSON.stringify(this.$route.query))
          currentQuery['start'] = i * 10 - 10
          pageArray.push({query: currentQuery, pageNum: i })
        }
        return pageArray
      }
    },
    methods: {
      isStartPage (page) {
        if (+page === 1 && !this.$route.query.start) {
          return true
        } else if (+this.$route.query.start === page * 10 - 10) {
          return true
        }
      }
    }
  }
</script>

<style>
  #pagination {
    padding-top: 0.5em;
    position: relative;
    padding-left: 94px;
    /*margin-bottom: 70px;*/
  }

  .pagination-wrapper {
    display: inline-block;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    position: relative;
    word-wrap: break-word;
    /*box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);*/
    background-color: #fff;
    /*border: 1px solid #dbdbdb;*/
  }

  .page-navigation {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
  }
  
  .page-navigation li {
    display: inline-flex;
  }

  .page-navigation li a {
    text-decoration: none;
    color: #699EF6;
    font-size: 1em;
    padding: .5em;
  }

  .page-navigation i.material-icons {
    display: inline-flex;
    vertical-align: middle;
  }

  .page-navigation li a.active {
    color: #111;
  }

</style>