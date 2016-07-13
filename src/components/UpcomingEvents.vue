<template>
  <div class="upcoming-events-container" v-if="eventsData">
    <p class="latest-news-heading">Próximos eventos</p>
    <div class="latest-news" v-for="event in eventsData">
      <h2 class="news-title"><a href="{{ event.link }}">{{ event.title }}</a></h2>
      <p class="news-meta">
        <span class="news-source">{{ event.school }}</span>
      </p>
      <p class="news-meta">
        <span class="news-date">{{ formatDates(event.start_date, event.end_date) }} {{ formatLocation(event.location) }}</span>
      </p>
      <span class="separator" v-if="$index !== eventsData.length - 1">&middot;</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['eventsData'],
    methods: {
      formatDates (sd, ed) {
        if (sd === ed) {
          return sd.split(', ')[1]
        } else {
          return sd.split(', ')[1] + ' a ' + ed.split(', ')[1]
        }
      },
      formatLocation (location) {
        if (location) {
          return 'em ' + location
        }
      }
    }
  }
</script>

<style>
  .upcoming-events-container {
    width: 100%;
    text-align: center;
    padding-left: 20px;
  }
</style>