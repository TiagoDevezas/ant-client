<template>
  <div class="columns is-gapless is-multiline is-marginless">
    <div class="column is-12 has-bottom-margin">
      <h2 class="title is-5"><a href="{{ metadata.link }}" @click="sendClickData(metadata.link)">{{ metadata.description }}</a></h2>
    </div>
    <div class="column is-narrow">
      <span class="tag is-small is-{{ metadata.type.label | lowercase }}">{{ metadata.type.label }}</span>
    </div>
    <div class="column">
      <span class="result-url">{{ metadata.link }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['metadata', 'category'],
    methods: {
      sendClickData (event) {
        let values = {
          active_query: this.$route.query.q.toString(),
          active_query_category: this.category.toString(),
          active_results_page: this.$route.query.start ? (this.$route.query.start / 10 + 1).toString() : '1',
          clicked_result_rank: this.metadata.rank.toString(),
          clicked_result_score: this.metadata.score.toString(),
          clicked_result_uri: this.metadata.uri.toString(),
          client_user_agent: window.navigator.userAgent.toString(),
          client_resolution: (window.screen.width + 'x' + window.screen.height).toString(),
          Referer: document.referrer
        }

        if (process.env.NODE_ENV === 'development') {
          values.is_test = true
        }

        if (!this.clicked && arguments.length === 0) {
          this.$http.post('http://ant.fe.up.pt/api/log/event/click', values, {emulateJSON: true})
          this.clicked = true
        }
        if (arguments.length > 0 && arguments[0]) {
          values['target_url'] = arguments[0]
          this.$http.post('http://ant.fe.up.pt/api/log/event/click', values, {emulateJSON: true})
        }
      }
    }
  }
</script>

<style lang="scss">
  span.result-url {
    margin-left: 5px;
    display: inline-block;
    color: #0C1F3A;
    max-width: 450px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 20px;
  }
  .has-bottom-margin {
    margin-bottom: 3px !important;
  }
  .tag {
    background: #69707a;
    color: #f5f7fa;
  }
  .is-sala {
    background: #9B59B6;
    color: white;
  }
  .is-estudante {
    background: #2ECC71;
    color: white;
  }
  .is-funcionário {
    background: #1ABC9C;
    color: white;
  }
  .is-notícia {
    background: #F39C12;
    color: white;
  }
  .is-curso {
    background: #E67E22;
    color: white;
  }
  .is-cadeira {
    background: #C0392B;
    color: white;
  }
</style>