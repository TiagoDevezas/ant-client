<template>
  <div class="upcoming-events-container">
    <p class="latest-news-heading">Próximos eventos</p>
    <div class="latest-news" v-for="event in eventsData">
      <h2 class="news-title"><a href="{{ event.link }}">{{ event.title }}</a></h2>
      <p class="news-meta">
        <span class="news-source">{{ event.school }}</span>
        <!-- <span class="news-date">- {{ news.date.split(', ')[1] + ' às ' + news.date.split(', ')[2] }}</span> -->
      </p>
      <span class="separator" v-if="$index !== eventsData.length - 1"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['eventsData']
  }
</script>

<style>
  .upcoming-events-container {
    width: 100%;
    text-align: center;
    padding-left: 20px;
  }
</style>