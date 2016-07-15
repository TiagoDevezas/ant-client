<template>
  <div class="latest-news-container" v-if="newsData">
    <p class="latest-news-heading">Últimas notícias</p>
    <div class="latest-news" v-for="news in newsData">
      <h2 class="news-title"><a href="{{ news.link }}">{{ news.title }}</a></h2>
      <p class="news-meta">
        <span class="news-source">{{ news.school }}</span>
        <span class="news-date">- {{ news.date.split(', ')[1] + ' às ' + news.date.split(', ')[2] }}</span>
      </p>
      <span class="separator" v-if="$index !== newsData.length - 1">&middot;</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['newsData']
  }
</script>

<style>

.latest-news-container {
  width: 100%;
  text-align: center;
  padding-right: 20px;
}

.separator {
  display: inline-block;
  font-size: 18px;
}

.latest-news-heading {
  margin-top: 15px;
  margin-bottom: 0;
  line-height: 40px;
  font-size: 16px;
  color: #4C4C4C;
}

.latest-news {
  margin-bottom: 0;
}

.news-title {
  font-size: 15px;
  font-weight: normal;
  /*color: #333;*/
  line-height: 18px;
  margin: 0;
  padding: 0;
  /*padding-left: 10px;*/
}

.news-title a {
  text-decoration: none;
}

.news-title a:hover {
  text-decoration: underline;
}

.news-meta {
  font-size: 13px;
  line-height: 16px;
  margin: 0;
}

.news-source {
  color: #0c1f3a;
}

.news-date {
  color: #808080;
}
  
</style>