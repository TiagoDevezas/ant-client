<template>
<div class="flex">
  <person-picture v-if="entityType === 'Pessoal' || entityType === 'Estudante'" :title="metadata.description" :link="metadata.link" :photo-url="metadata.document.photo_url"></person-picture>
  <div :class="['no-bottom-padding', {
    'full': entityType !== 'Pessoal' || entityType !== 'Estudante',
    'four-fifth': entityType === 'Pessoal' || entityType === 'Estudante'
    }]">
    <result-link-title :metadata="metadata" :category="category"></result-link-title>
    <result-sources :metadata="metadata" :is-toggled="toggled"></result-sources>
    <result-attributes :is-toggled="toggled" :metadata="metadata" :labels="setVisibleAttrs(entityType)">
    </result-attributes>
  </div>
  <div class="full no-bottom-padding">
    <more-content></more-content>
  </div>
</div>
</template>

<script>
  import defaults from '../defaults'

  import PersonPicture from './PersonPicture'
  import ResultLinkTitle from './ResultLinkTitle'
  import ResultSources from './ResultSources'
  import ResultAttributes from './ResultAttributes'
  import MoreContent from './MoreContent'

  export default {
    props: ['metadata', 'entityType', 'category'],
    components: {
      ResultAttributes,
      PersonPicture,
      ResultLinkTitle,
      ResultSources,
      MoreContent
    },
    data () {
      return {
        toggled: false,
        clicked: false
      }
    },
    events: {
      'isToggled' (val) {
        this.toggled = !this.toggled
        this.sendClickData()
      }
    },
    methods: {
      setVisibleAttrs (entityType) {
        let labels
        switch (entityType) {
          case 'Pessoal':
            labels = {
              primary: {
                line_1: ['code', 'acronym'],
                line_2: ['institutional_emails', 'telephone', 'alternative_telephone', 'voip', 'rooms']
              },
              secondary: ['status'],
              special: ['positions', 'teaching', 'functions', 'research']
            }
            return labels
          case 'Estudante':
            labels = {
              primary: {
                line_1: ['code']
              },
              secondary: ['sites'],
              special: ['courses']
            }
            return labels
          case 'Sala':
            labels = {
              primary: {
                line_1: ['people_in_charge'],
                line_2: ['building', 'floor']
              },
              secondary: [],
              special: ['usage', 'telephone', 'code', 'active', 'area_m2']
            }
            return labels
          case 'Departamento':
            labels = {
              primary: {
                line_1: ['person_in_charge']
              },
              secondary: [],
              special: ['acronym', 'room', 'code', 'fax', 'email', 'telephone', 'address']
            }
            return labels
          case 'Notícia':
            labels = {
              primary: {
                line_1: [],
                line_2: []
              }
            }
            return labels
          case 'Curso':
            labels = {
              primary: {
                line_1: ['predominant_scientific_areas'],
                line_2: ['directors']
              }
            }
            return labels
          case 'Cadeira':
            labels = {
              primary: {
                line_1: ['courses_in_charge'],
                line_2: ['teachers']
              },
              special: ['study_plan']
            }
            return labels
        }
      },
      sendClickData () {
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
          this.$http.post(defaults.log_click_url, values, {emulateJSON: true})
          this.clicked = true
        }
        if (arguments.length > 0 && arguments[0]) {
          values['target_url'] = arguments[0]
          this.$http.post(defaults.log_click_url, values, {emulateJSON: true})
        }
      }
    },
    ready () {
      this.setVisibleAttrs(this.entityType)
    }
  }
</script>

<style>
  .no-bottom-padding {
    padding-bottom: 0;
  }
</style>
