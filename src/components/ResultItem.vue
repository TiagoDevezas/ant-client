<template>
<div class="result">
  <div class="result-body">
    <div class="result-left">
      <div class="result-picture" v-if="metadata.type.label === 'Estudante' || metadata.type.label === 'Funcionário'">
        <div class="image-wrapper" v-if="metadata.metadata.decorations.photo" style="float: left; width: 75px;">
          <img :src="metadata.metadata.decorations.photo" :alt="setAltText" :title="metadata.description" width="90%">  
        </div>
      </div>
    </div>
    <div class="result-right" :class="{'pad-left': metadata.metadata.decorations.photo}">
      <div class="result-title">
         <div class="tag tag-{{ metadata.type.label | lowercase }}">{{ metadata.type.label }}</div>
         <h2><a href="{{ metadata.link }}" @click="sendClickData">{{ metadata.description }}</a></h2>
       </div>
       <div class="result-link">
         <span class="result-url">{{ metadata.link }}</span>
       </div>
       <div class="result-snippet">
         <p>{{ metadata.sources.join(', ') }}</p>
         <span v-for="attr in defaultAttributes">
           <p v-if="attr.value !== metadata.description"><strong>{{ attr.label }}:</strong> {{{ attr.value }}}</p>
         </span>
       </div>
        <div class="result-more-data" :class="{ 'toggle': toggled }">
          <span v-for="attr in extraAttributes">
            <p v-if="attr.value !== metadata.description && attr.label !== 'Faculdade'"><strong>{{ attr.label }}:</strong> {{{ attr.value }}}</p>
          </span>
          <div class="result-l2-attributes">
            <div class="l2-attribute" v-for="attrs in levelTwoAttributes">
              <span v-for="attr in attrs">
                <p v-if="attr.value !== metadata.description"><strong>{{ attr.label }}:</strong> {{{ attr.value }}}</p>
              </span>
            </div>
          </div>
        </div>
     </div>     
    </div>
  <div class="result-more" @click="toggleAccordion" v-if="extraAttributes.length || levelTwoAttributes.length">
    <div class="more-icon">
      <i class="material-icons">{{ toggleIcon }}</i>
    </div>
    <div class="more-text">{{ toggleText }}</div>
  </div>
</div>
</template>

<script>
export default {
  props: ['metadata', 'category'],
  data () {
    return {
      defaultAttributes: [],
      extraAttributes: [],
      levelTwoAttributes: [],
      toggled: false,
      clicked: false
    }
  },
  methods: {
    toggleAccordion () {
      this.toggled = !this.toggled
      this.sendClickData()
    },
    sendClickData (event) {
      if (event.button === 0 || event.button === 1) {
        const values = {
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
        if (!this.clicked && arguments.length === 0) {
          this.$http.post('http://ant.fe.up.pt/api/log/event/click', values, {emulateJSON: true})
          this.clicked = true
        }
        if (arguments.length > 0 && arguments[0]) {
          values['target_url'] = arguments[0]
          this.$http.post('http://ant.fe.up.pt/api/log/event/click', values, {emulateJSON: true})
        }
      }
    },
    filterByLabels (attrsArray, labelsToFilter) {
      let filtered = []
      let unfiltered = []
      for (let j in attrsArray) {
        if (attrsArray[j].value.constructor === Array) attrsArray[j].value = attrsArray[j].value.join(', ')
        for (let i in labelsToFilter) {
          if (attrsArray[j].label === labelsToFilter[i]) {
            attrsArray[j].order = i
            filtered.push(attrsArray[j])
          }
        }
      }
      unfiltered = attrsArray.filter(function (obj) {
        return filtered.indexOf(obj) === -1
      })
      filtered.sort(function (a, b) {
        return a.order - b.order
      })
      this.$set('defaultAttributes', filtered)
      this.$set('extraAttributes', unfiltered)
    },
    setVisibleAttrs (entityType) {
      let attrsArray = this.metadata.metadata.decorations.attributes
      let labelsToFilter = []
      switch (entityType) {
        case 'Funcionário':
          labelsToFilter = ['Estado', 'Sala']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Estudante':
          labelsToFilter = ['Código']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Sala':
          labelsToFilter = ['Edifício', 'Piso']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Departamento':
          labelsToFilter = ['Responsável']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Notícia':
          labelsToFilter = ['Data de Publicação', 'Conteúdo']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Curso':
          labelsToFilter = ['Área Científica', 'Duração']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Cadeira':
          labelsToFilter = ['Ativo', 'Professor']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
      }
    }
  },
  computed: {
    toggleText () {
      return !this.toggled ? 'Ver mais' : 'Ver menos'
    },
    toggleIcon () {
      return !this.toggled ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
    },
    getPicture () {
      return 'https://sigarra.up.pt/feup/pt/fotografias_service.foto?pct_cod=' + this.metadata.link.split('=')[1] + ''
    },
    setAltText () {
      return 'Foto de ' + this.metadata.description
    }
  },
  ready () {
    this.setVisibleAttrs(this.metadata.type.label)
    // console.log(this.filterByLabels(this.metadata.metadata.decorations.attributes, ['Faculdade']))
    // this.$set('defaultAttributes', this.metadata.metadata.decorations.attributes)
    // this.$set('extraAttributes', this.metadata.metadata.decorations.attributes)
    this.$set('levelTwoAttributes', this.metadata.metadata.decorations.levelTwoAttributes)
  }
}
</script>

<style>
.result {
  box-sizing: border-box;
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-tap-highlight-color: transparent;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0.3em;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
  position: relative;
  word-wrap: break-word;
  /*box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);*/
  background-color: #fff;
  /*cursor: pointer;*/
}

.result-body {
  display: flex;
  flex-direction: row;
}

.result-right {
  flex-grow: 1;
}

.result-title {
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  /*margin-bottom: 0.2em;*/
  max-width: 100%;
}
.result-title h2 {
  font-size: 18px;
  font-weight: normal;
  color: #333;
  line-height: 1;
  margin: 0;
  /*padding-left: 10px;*/
}

.result-title h2 a {
  text-decoration: none;
  color: #1a0dab;
}

.result-title h2 a:hover {
  text-decoration: underline;
}

.result-title h2 a:visited {
  color: #609;
}

.result-link {
  font-size: 1.1em;
  line-height: 1.3;
  max-width: 650px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

span.result-url {
  color: #0C1F3A;
}

.result-snippet, .result-more-data {
  font-size: 0.85em;
  color: #666;
  line-height: 1.38;
  margin: 0 0 0.1em;
}

.result p {
  margin: 0 0 5px;
  line-height: 1.3;
}

.result-icon {
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  margin-top: -3px;
  width: 16px;
  margin-right: 0.3em;
}
.result-icon-img {
  vertical-align: middle;
  max-width: 16px;
  margin-top: 0;
}
.result-url {
  color: #555;
  font-size: 0.8em;
}
.result-more-data {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}
.result-more-data p:first-of-type {
  margin-top: 0;
}
.result-more-data.toggle {
  max-height: 9000px;
}
.result-more {
  border-bottom: 1px solid #ebebeb;
  cursor: pointer;
  height: 0px;
  margin-bottom: -0.5em;
  overflow: hidden;
  padding: 15px 0;
  text-align: center;
  position: relative;
  clear: both;
  display: block;
}
.l2-attribute {
  background-color: #F4F4F4;
  padding: 1em;
  border-radius: 3px;
  margin-bottom: 1em;
  border: 1px solid #F1F1F1;
}
.l2-attribute p:last-of-type {
  margin-bottom: 0;
}
.more-icon {
  margin-left: 0;
  height: 6px;
  width: 24px;
  margin-right: auto;
  position: relative;
  top: -12px;
  color: #777;
}
.more-text {
  top: 7px;
  left: 20px;
  right: 0;
  text-align: left;
  color: #777;
  font-size: 0.8em;
  margin: 0 15px;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pad-left {
  padding-left: 10px;
}

.tag {
  background: #69707a;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  color: #f5f7fa;
  display: inline-block;
  font-size: .7em;
  line-height: 1.2em;
  padding: 4px 10px;
  white-space: nowrap;
  top: 0;
  font-weight: bold;
  float: right;
}
.tag-sala {
  background: #9B59B6;
  color: white;
}
.tag-estudante {
  background: #2ECC71;
  color: white;
}
.tag-funcionário {
  background: #1ABC9C;
  color: white;
}
.tag-notícia {
  background: #F39C12;
  color: white;
}
.tag-curso {
  background: #E67E22;
  color: white;
}
.tag-cadeira {
  background: #C0392B;
  color: white;
}
</style>