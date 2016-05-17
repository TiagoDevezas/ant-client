<template>
  <div class="latest-news-container">
    <p class="latest-news-heading">Últimas notícias</p>
    <div class="latest-news" v-for="news in newsData">
      <h2 class="news-title"><a href="{{ news.link }}">{{ news.description }}</a></h2>
      <p class="news-meta">
        <span class="news-source">{{ news.sources.join(', ')}}</span>
        <span class="news-date">- {{ news.date.split(', ')[1] + ' às ' + news.date.split(', ')[2] }}</span>
      </p>
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
  text-align: center;
}

.latest-news-heading {
  margin-top: 35px;
  margin-bottom: 0;
  line-height: 40px;
  font-size: 18px;
  color: #4C4C4C;
}

.latest-news {
  margin-bottom: 16px;
}

.news-title {
  font-size: 16px;
  font-weight: normal;
  color: #333;
  line-height: 18px;
  margin: 0;
  /*padding-left: 10px;*/
}

.news-title a {
  text-decoration: none;
  color: #1a0dab;
}

.news-meta {
  font-size: 14px;
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