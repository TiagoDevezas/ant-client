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
         <div class="dropdown" v-if="extraAttributes.length || levelTwoAttributes.length">
           <a @click.prevent="toggleDropdown"><i class="material-icons md-custom">arrow_drop_down</i></a>
           <div :class="['dropdown-panel', {'dropdown-open': dropdownOpen}]" @click="toggleAccordion">
             <span class="dropdown-text">{{ toggleText }}</span>
           </div>
         </div>
       </div>
       <div class="result-snippet">

        <div v-if="metadata.type.label !== 'Notícia'">          
         <p>{{ metadata.sources.join(', ') }}</p>
         <span v-for="attr in defaultAttributes">
           <p v-if="attr.value !== metadata.description"><span class="attr-label">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q }}}</p>
         </span>
        </div>

        <div v-if="metadata.type.label === 'Notícia' && defaultAttributes.length">
          <p class="news-meta">
            <span class="news-source">
              {{ metadata.sources.join(', ') }}
            </span>
            <span class="news-date">
              - {{ defaultAttributes[0].value.split(', ')[1] + ' às ' + defaultAttributes[0].value.split(', ')[2] }}
            </span>
          </p>
          <p v-if="!toggled">
            {{{ defaultAttributes[1].value | cleanMarkup | stripTags | highlightQuery $route.query.q | truncateText 20 }}}
          </p>
          <p v-if="toggled">
            {{{ defaultAttributes[1].value | cleanMarkup | highlightQuery $route.query.q }}}
          </p>
        </div>

       </div>
        <div class="result-more-data" :class="{ 'toggle': toggled }">
          <span v-for="attr in extraAttributes">
            <p v-if="attr.value !== metadata.description && attr.label !== 'Faculdade'"><span class="attr-label">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q }}}</p>
          </span>
          <div class="result-l2-attributes">
            <div class="l2-attribute" v-for="attrs in levelTwoAttributes">
              <span v-for="attr in attrs">
                <p v-if="attr.value !== metadata.description"><span class="attr-label">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q }}}</p>
              </span>
            </div>
          </div>
        </div>
     </div>     
    </div>
  <div class="result-more" v-if="extraAttributes.length || levelTwoAttributes.length" :class="{ 'visible': toggled, 'invisible': !toggled }">
    <div class="result-more-toggled" v-if="toggled" @click="toggleAccordion">
      <i class="material-icons">arrow_drop_up</i>
    </div>
  </div>
</div>
</template>

<script>
import { cleanMarkup, highlightQuery, truncateText, stripTags } from '../filters'

export default {
  filters: { cleanMarkup, highlightQuery, truncateText, stripTags },
  props: ['metadata', 'category'],
  data () {
    return {
      defaultAttributes: [],
      extraAttributes: [],
      levelTwoAttributes: [],
      toggled: false,
      clicked: false,
      dropdownOpen: false
    }
  },
  methods: {
    toggleDropdown (evt) {
      this.dropdownOpen = !this.dropdownOpen
    },
    closeDropdowns (evt) {
      if (this.dropdownOpen && (evt.target.className.indexOf('dropdown-panel') === -1 && evt.target.className !== 'dropdown-text')) {
        this.dropdownOpen = false
      }
    },
    toggleAccordion () {
      this.toggled = !this.toggled
      if (this.dropdownOpen) {
        this.dropdownOpen = false
      }
      this.sendClickData()
    },
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
        values.test = true
      }

      if (!this.clicked && arguments.length === 0) {
        this.$http.post('http://ant.fe.up.pt/api/log/event/click', values, {emulateJSON: true})
        this.clicked = true
      }
      if (arguments.length > 0 && arguments[0]) {
        values['target_url'] = arguments[0]
        this.$http.post('http://ant.fe.up.pt/api/log/event/click', values, {emulateJSON: true})
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
    window.addEventListener('mousedown', this.closeDropdowns, false)
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
  position: relative;
}

.dropdown {
  display: inline-block;
  position: relative;
}

.dropdown-panel {
  display: none;
  position: absolute;
  top: 18px;
  left: 0;
  right: auto;
  z-index: 1000;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.2);
  font-size: 13px;
  padding: 6px 0;
  position: absolute;
  white-space: nowrap;
  z-index: 10;
  -moz-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  cursor: pointer;
}

.dropdown-panel:hover {
  background-color: #D8D8D8;
}

.dropdown-open {
  display: inline-block;
}

.dropdown-text {
  padding: 0 10px;
  color: #1a0dab;
}

span.result-url {
  display: inline-block;
  color: #0C1F3A;
  max-width: 550px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}

.material-icons.md-custom {
  font-size: 20px;
  vertical-align: middle;
  cursor: pointer;
  margin-top: -8px;
}

.result-snippet, .result-more-data {
  font-size: 0.85em;
  color: #666;
  line-height: 1.38;
  margin: 0 0 0.1em;
}

.result-more-toggled {
  width: 100%;
  text-align: center;
  cursor: pointer;
  /*margin-top: -20px;*/
  border-bottom: 1px solid #eee;
  margin-top: 10px;
}

.result-more-toggled:hover {
  background-color: #F7F7F7;
}

.result p {
  margin: 0 0 5px;
  line-height: 1.3;
  max-width: 650px;
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
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.result-more-data p:first-of-type {
  margin-top: 0;
}
.result-more-data.toggle {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0); 
  transition-delay: 0s;
}

.invisible {
  display: none;
}

.visible {
  display: block;
}

.result-more {
  height: 20px;
  color: #1a0dab;
}
.l2-attribute {
  background-color: #F4F4F4;
  padding: 1em;
  border-radius: 3px;
  margin-bottom: 25px;
  border: 1px solid #F1F1F1;
}

.l2-attribute:first-of-type {
  margin-top: 25px;
}

.l2-attribute:last-of-type {
  margin-bottom: 0;
}

.attr-label {
  color: #222;
  font-size: 14px;
}

.highlight {
  color: #555;
  font-weight: bolder;
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