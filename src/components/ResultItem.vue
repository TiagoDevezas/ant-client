<template>
<div class="result">
  <span v-for="value in metadata.document">
      {{ value | json }} <br>
  </span>
  <div class="result-body">
    <div class="result-left">
      <div class="result-picture" v-if="metadata.type.label === 'Estudante' || metadata.type.label === 'Funcionário'">
        <div class="image-wrapper" style="float: left; width: 75px;">
          <img :src="getPicture" :alt="setAltText" :title="metadata.description" width="100%">  
        </div>
      </div>
    </div>
    <div class="result-right" :class="{'pad-left': getPicture}">
      <div class="result-title">
         <h2><a href="{{ metadata.link }}" @click="sendClickData">{{ metadata.description }}</a></h2>
       </div>
       <div class="result-link">
         <div class="tag tag-{{ metadata.type.label | lowercase }}">{{ metadata.type.label }}</div>
         <span class="result-url">{{ metadata.link }}</span>
         <div class="dropdown" v-if="extraAttributes.length || levelTwoAttributes.length">
           <a @click.prevent="toggleDropdown"><i class="material-icons md-custom">arrow_drop_down</i></a>
           <div :class="['dropdown-panel', {'dropdown-open': dropdownOpen}]" @click="toggleAccordion">
             <span class="dropdown-text">{{ toggleText }}</span>
           </div>
         </div>
       </div>
       <div class="result-snippet">

       <!-- Sala -->

        <div v-if="metadata.type.label === 'Sala' && defaultAttributes.length">
          <p>
            <span v-if="defaultAttributes[0].value">{{{ defaultAttributes[0].value + ', '  | highlightQuery $route.query.q }}}</span>
            <span>{{{ metadata.sources.join(', ') | highlightQuery $route.query.q | isSearchable defaultAttributes[0] $route.query.q }}}</span>
          </p>
          <p v-if="defaultAttributes[1].value">
            <span class="attr-label">{{ defaultAttributes[1].label }}:</span> {{{ defaultAttributes[1].value | cleanMarkup | highlightQuery $route.query.q  | isSearchable defaultAttributes[1] $route.query.q }}}
          </p>
          <p>
            <span v-if="defaultAttributes[2].value">
              <span class="attr-label">{{ defaultAttributes[2].label }}:</span> {{{ defaultAttributes[2].value + '. ' | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[2] $route.query.q}}}
            </span>
            <span v-if="defaultAttributes[3].label">
              <span class="attr-label">{{ defaultAttributes[3].label }}:</span> {{{ defaultAttributes[3].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[3] $route.query.q }}}
            </span>
          </p>
        </div>

        <!-- Funcionário -->

        <div v-if="metadata.type.label === 'Funcionário' && defaultAttributes.length">
          <p>
            <span v-if="!toggled">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q | truncateSources }}}</span>
            <span v-if="toggled">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q }}}</span>
          </p>
          <p>
            <span v-if="defaultAttributes[0].value">
              <span class="attr-label">{{ defaultAttributes[0].label }}:</span> {{{ defaultAttributes[0].value + ', ' | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[0] $route.query.q }}}
            </span>
            <span v-if="defaultAttributes[1].value">
              <span class="attr-label">{{ defaultAttributes[1].label }}:</span> {{{ defaultAttributes[1].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[1] $route.query.q }}}
            </span>
          </p>
          <p style="display: flex;">
            <span v-if="defaultAttributes[2].value" style="display: flex; align-items: flex-end;">
              <span class="attr-label" style="display: inline-flex; margin-right: 3px;">{{{ defaultAttributes[2].label + ':' | iconify 'mail_outline' }}}</span>
              <span style="display: inline-flex; margin-right: 10px;">
                {{{ defaultAttributes[2].value.split(',')[0] + ' ' | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[2] $route.query.q }}}
              </span>
            </span>
            <span v-if="defaultAttributes[3].value" style="display: flex; align-items: flex-end;">
              <span class="attr-label" style="display: inline-flex; margin-right: 3px;">{{{ defaultAttributes[3].label + ':' | iconify 'phone' }}}</span>
              <span style="display: inline-flex; margin-right: 10px;">
                {{{ defaultAttributes[3].value.split(',')[0] + ' ' | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[3] $route.query.q }}}
              </span>
            </span>
            <span v-if="defaultAttributes[4].value" style="display: flex; align-items: flex-end;">
              <span class="attr-label" style="display: inline-flex; margin-right: 3px;">{{{ defaultAttributes[4].label + ':' | iconify 'business' }}}</span>
              <span style="display: inline-flex; margin-right: 10px;">
                {{{ defaultAttributes[4].value.split(',')[0] + ' ' | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[4] $route.query.q}}}
              </span>
            </span>
          </p>
        </div>

        <!-- Departamento -->

        <div v-if="metadata.type.label === 'Departamento' && defaultAttributes.length">
          <p>
            <span v-if="!toggled">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q | truncateSources }}}</span>
            <span v-if="toggled">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q }}}</span>
          </p>
          <p>
            <span v-if="defaultAttributes[0].value">
              <span class="attr-label">{{ defaultAttributes[0].label }}:</span> {{{ defaultAttributes[0].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[0] $route.query.q }}}
            </span>
          </p>
        </div>


        <!-- Notícia -->
        
        <div v-if="metadata.type.label === 'Notícia' && defaultAttributes.length">
          <p class="news-meta">
            <span class="news-source">
              {{{ metadata.sources.join(', ') }}}
            </span>
            <span class="news-date" v-if="defaultAttributes[0].value">
              - {{ defaultAttributes[0].value.split(', ')[1] + ' às ' + defaultAttributes[0].value.split(', ')[2] }}
            </span>
          </p>
          <p v-if="!toggled && defaultAttributes[1].value">
            {{{ defaultAttributes[1].value | cleanMarkup | stripTags | highlightQuery $route.query.q | truncateText 20 }}}
          </p>
          <p v-if="toggled && defaultAttributes[1].value">
            {{{ defaultAttributes[1].value | cleanMarkup | highlightQuery $route.query.q }}}
          </p>
        </div>

        <!-- Outros -->

        <div v-if="metadata.type.label !== 'Notícia' && metadata.type.label !== 'Sala' && metadata.type.label !== 'Funcionário' && metadata.type.label !== 'Departamento'">

        <!-- Estudante -->

        <p v-if="metadata.type.label === 'Estudante'">
          <span v-if="lastCourse !== ''">

            <span v-if="!toggled">

             <span style="display: block; margin: 4px 0; font-size: 13px; line-height: 1.15;">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q | truncateSources }}}</span>
             
             <span style="display: block; margin: 4px 0; font-size: 13px; line-height: 1.15;" v-if="lastCourse.value">
               <span class="attr-label">{{ lastCourse.label }}:</span> {{{ lastCourse.value | cleanMarkup | highlightQuery $route.query.q | isSearchable lastCourse $route.query.q}}}
             </span>
            </span>

            <span v-if="toggled">
             <span style="display: block; margin: 4px 0; font-size: 13px; line-height: 1.15;">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q }}}</span>
             <span style="display: block; margin: 4px 0; font-size: 13px; line-height: 1.15;" v-if="lastCourse.value"> 
              <span class="attr-label">{{ lastCourse.label }}:</span> {{{ lastCourse.value | cleanMarkup | highlightQuery $route.query.q | isSearchable lastCourse $route.query.q}}}
             </span>
            </span>
            
          </span>

          <span v-if="lastCourse === ''">

            <span v-if="!toggled">
             <span style="display: block;">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q | truncateSources }}}</span>
            </span>

            <span v-if="toggled">
             <span style="display: block;">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q }}}</span>
            </span>
            
          </span>     
        </p>

        <!-- Outros -->

         <p v-if="metadata.type.label !== 'Estudante'">
           <span v-if="!toggled">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q | truncateSources }}}</span>
           <span v-if="toggled">{{{ metadata.sources.join(', ') | highlightQuery $route.query.q }}}</span>
         </p>
         <span v-for="attr in defaultAttributes">
           <p v-if="attr.value && attr.value !== metadata.description"><span class="attr-label">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q | isSearchable attr $route.query.q }}}</p>
         </span>
        </div>


       </div>
        <div class="result-more-data" :class="{ 'toggle': toggled }">

          <!-- Sala -->

          <div v-if="metadata.type.label === 'Sala' && extraAttributes.length" style="display: flex; align-items: stretch; margin-top: 20px;">
            <div v-for="attr in defaultAttributes.slice(4, defaultAttributes.length)" v-if="attr.label === 'Mapa'" style="margin-right: 30px; min-width: 300px; max-width: 300px;">
              <img :src="attr.value" alt="" style="max-width: 100%;">    
            </div>
            <div style="padding: 20px; margin-top: 0; width: 100%;" class="l2-attribute">
              <span v-for="attr in defaultAttributes.slice(4, defaultAttributes.length)" v-if="attr.value">
                <p v-if="attr.value !== metadata.description && attr.label !== 'Mapa' && attr.label !== 'Faculdade'"><span class="attr-label" style="font-weight: bold;">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q | isSearchable attr $route.query.q }}}</p>
              </span>
            </div>
          </div>

          <!-- Departamento -->

          <div v-if="metadata.type.label === 'Departamento'">
            <div class="l2-attribute" style="margin: 20px 0; padding: 30px;">
              <p>
                <span v-if="defaultAttributes[1].value" style="display: block;">
                  <span class="attr-label">{{ defaultAttributes[1].label }}:</span> {{{ defaultAttributes[1].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[1] $route.query.q }}}
                </span>
                <span v-if="defaultAttributes[2].value" style="display: block;">
                  <span class="attr-label">{{ defaultAttributes[2].label }}:</span> {{{ defaultAttributes[2].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[2] $route.query.q}}}
                </span>
                <span v-if="defaultAttributes[3].value" style="display: block;">
                  <span class="attr-label">{{ defaultAttributes[3].label }}:</span> {{{ defaultAttributes[3].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[3] $route.query.q}}}
                </span>
              </p>
              <p style="margin-top: 25px;">
                <span v-if="defaultAttributes[4].value" style="display: flex;">
                  <span class="attr-label" style="margin-right: 5px;">{{{ defaultAttributes[4].label | iconify 'local_printshop' }}}</span> {{{ defaultAttributes[4].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[4] $route.query.q }}}
                </span>
                <span v-if="defaultAttributes[5].value" style="display: flex;">
                  <span class="attr-label" style="margin-right: 5px;">{{{ defaultAttributes[5].label | iconify 'mail_outline' }}}</span> {{{ defaultAttributes[5].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[5] $route.query.q }}}
                </span>
                <span v-if="defaultAttributes[6].value" style="display: flex;">
                  <span class="attr-label" style="margin-right: 5px;">{{{ defaultAttributes[6].label | iconify 'phone' }}}</span> {{{ defaultAttributes[6].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[6] $route.query.q }}}
                </span>                
              </p>
              <p style="margin-top: 25px;">
                <span v-if="defaultAttributes[7].value" style="display: block;">
                  <span class="attr-label">{{ defaultAttributes[7].label }}:</span> {{{ defaultAttributes[7].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[7] $route.query.q }}}
                </span>
                <span v-if="defaultAttributes[8].value" style="display: block;">
                  <span class="attr-label">{{ defaultAttributes[8].label }}:</span> {{{ defaultAttributes[8].value | cleanMarkup | highlightQuery $route.query.q | isSearchable defaultAttributes[8] $route.query.q }}}
                </span>
              </p>
            </div>
          </div>

          <span v-for="attr in extraAttributes" v-if="metadata.type.label !== 'Sala'&& extraAttributes.length">
            <p v-if="attr.value !== metadata.description && attr.label !== 'Faculdade'"><span class="attr-label" style="font-weight: bold;">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q | isSearchable attr $route.query.q }}}</p>
          </span>
          <div class="result-l2-attributes">

            <!-- Geral -->

            <div v-for="attrs in levelTwoAttributes" v-if="metadata.type.label !== 'Estudante' && metadata.type.label !== 'Funcionário'">
              <div>              
                <span class="attr-relationship" v-if="attrs.relationship">
                  {{ attrs.relationship.label }}
                </span>
                <div class="l2-attribute">                
                  <span v-for="attr in attrs.data">
                    <p v-if="attr.value !== metadata.description"><span class="attr-label" style="font-weight: bold;">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q | isSearchable attr $route.query.q}}}</p>
                  </span>
                </div>
              </div>
            </div>

            <!-- Funcionário -->

            <div v-if="metadata.type.label === 'Funcionário' && levelTwoAttributes">
              <div v-for="attrs in levelTwoAttributes | filterBy 'Posição' in 'relationship.label'" v-if="attrs.relationship.label === 'Posição'">
                <p v-if="$index === 0" style="font-size: 16px; margin-top: 15px;">Posições</p>
                <div class="l2-attribute">                
                  <span v-for="attr in attrs.data | orderBy 'label' -1">
                    <p v-if="attr.value !== metadata.description"><span class="attr-label" style="font-weight: bold;">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q | isSearchable attr $route.query.q}}}</p>
                  </span>
                </div>
              </div>

              <div v-for="attrs in levelTwoAttributes | filterBy 'Função' in 'relationship.label'" v-if="attrs.relationship.label === 'Função'">
                <p v-if="$index === 0" style="font-size: 16px; margin-top: 15px;">Funções</p>
                <div class="l2-attribute">                
                  <span v-for="attr in attrs.data | orderBy 'label' -1">
                    <p v-if="attr.value !== metadata.description"><span class="attr-label" style="font-weight: bold;">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q | isSearchable attr $route.query.q}}}</p>
                  </span>
                </div>
              </div>

              <div v-for="attrs in levelTwoAttributes | filterBy 'Investigação' in 'relationship.label'" v-if="attrs.relationship.label === 'Investigação'">
                <p v-if="$index === 0" style="font-size: 16px; margin-top: 15px;">Investigação</p>
                <div class="l2-attribute">                
                  <span v-for="attr in attrs.data | orderBy 'label' -1">
                    <p v-if="attr.value !== metadata.description"><span class="attr-label" style="font-weight: bold;">{{ attr.label }}:</span> {{{ attr.value | cleanMarkup | highlightQuery $route.query.q | isSearchable attr $route.query.q}}}</p>
                  </span>
                </div>
              </div>

            </div>

            <!-- Estudante -->

            <div v-for="attr in sortedCourses" v-if="metadata.type.label === 'Estudante'">
              <div style="display: flex; align-items: center; margin-top: 10px;" class="l2-attribute">
                <div style="margin: 0 30px;">
                  <i class="material-icons" style="font-size: 38px;">school</i>
                </div>
                <div>
                <p v-if="attr.course">           
                <span class="attr-label" style="font-weight: bold;">Curso:</span> {{{ attr.course | cleanMarkup | highlightQuery $route.query.q | isSearchable attr $route.query.q}}}
                </p>
                <p v-if="attr.type">
                  
                <span class="attr-label" style="font-weight: bold;">Tipo de Inscrição:</span> {{{ attr.type | cleanMarkup | highlightQuery $route.query.q }}}
                </p>
                <p v-if="attr.year">
                  
                <span class="attr-label" style="font-weight: bold;">Ano Letivo:</span> {{{ attr.year | cleanMarkup | highlightQuery $route.query.q }}}
                </p>
                </div>
              </div>
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
import { cleanMarkup, highlightQuery, truncateText, stripTags, isSearchable, iconify, truncateSources } from '../filters'

export default {
  filters: { cleanMarkup, highlightQuery, truncateText, stripTags, isSearchable, iconify, truncateSources },
  props: ['metadata', 'category'],
  data () {
    return {
      defaultAttributes: [],
      extraAttributes: [],
      levelTwoAttributes: [],
      toggled: false,
      clicked: false,
      dropdownOpen: false,
      lastCourse: '',
      sortedCourses: []
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

      if (filtered.length < labelsToFilter.length) {
        let values = filtered.map((el) => {
          return el.order
        })
        for (let i in labelsToFilter) {
          if (values.indexOf(i) === -1) {
            filtered.push({value: '', label: '', order: i})
          }
        }
      }

      unfiltered = attrsArray.filter(function (obj) {
        return filtered.indexOf(obj) === -1
      })
      filtered.sort(function (a, b) {
        return a.order - b.order
      })
      console.log(JSON.stringify(filtered))
      this.$set('defaultAttributes', filtered)
      this.$set('extraAttributes', unfiltered)
    },
    setVisibleAttrs (entityType) {
      let attrsArray = this.metadata.document
      let labelsToFilter = []
      switch (entityType) {
        case 'Funcionário':
          labelsToFilter = ['Código', 'Sigla', 'E-mail', 'Telefone', 'Voip', 'Sala']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Estudante':
          labelsToFilter = ['Código']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Sala':
          labelsToFilter = ['Descrição', 'Responsável', 'Edifício', 'Piso', 'Mapa', 'Utilização', 'Telefone', 'Código', 'Acesso Mobilidade Reduzida', 'Ativo', 'Computador', 'Projetor', 'Área']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Departamento':
          labelsToFilter = ['Responsável', 'Sigla', 'Sala', 'Código', 'Fax', 'E-mail', 'Telefone', 'Morada', 'Localização']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Notícia':
          labelsToFilter = ['Data de Publicação', 'Conteúdo']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Curso':
          labelsToFilter = ['Área Científica', 'Diretor']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
        case 'Cadeira':
          labelsToFilter = ['Ativo', 'Professor']
          this.filterByLabels(attrsArray, labelsToFilter)
          break
      }
    },
    setSearchableAttrs () {
      let searchableAttrs = [
        'Sala',
        'Professor',
        'Diretor',
        'Responsável',
        'Ocupante',
        'Departamento',
        'Curso',
        'Faculdade'
      ]
      let data = this.metadata.metadata.decorations.attributes.data
      for (let i in data) {
        if (searchableAttrs.indexOf(data[i].label) !== -1) {
          data[i].searchable = true
        }
      }
      let l2Attrs = this.metadata.metadata.decorations.levelTwoAttributes
      for (let i in l2Attrs) {
        for (let j in l2Attrs[i].data) {
          if (searchableAttrs.indexOf(l2Attrs[i].data[j].label) !== -1) {
            l2Attrs[i].data[j].searchable = true
          }
        }
      }
    },
    sortCourses (courseData) {
      if (courseData && courseData[0].relationship && courseData[0].relationship.label === 'Inscrição') {
        let objs = []
        for (let i in courseData) {
          let obj = {}
          for (let j in courseData[i].data) {
            if (courseData[i].data[j].label === 'Curso') {
              obj.course = courseData[i].data[j].value
              obj.searchable = true
            } else if (courseData[i].data[j].label === 'Tipo de Inscrição') {
              obj.type = courseData[i].data[j].value
            } else if (courseData[i].data[j].label === 'Ano Letivo') {
              obj.year = courseData[i].data[j].value
            }
          }
          objs.push(obj)
        }
        objs.sort((a, b) => {
          return parseInt(b.year.split('/')[1], 10) - parseInt(a.year.split('/')[1], 10)
        })
        let lastCourse = { label: 'Curso', value: objs[0].course, searchable: true }
        this.$set('lastCourse', lastCourse)
        this.$set('sortedCourses', objs)
      }
    },
    formatData () {
      let docData = this.metadata.document
      let formatted = []
      Object.keys(docData).forEach(key => {
        formatted.push({label: this.$t(key), value: docData[key]})
      })
      this.$set('metadata.document', formatted)
    }
  },
  computed: {
    toggleText () {
      return !this.toggled ? 'Expandir' : 'Fechar'
    },
    getPicture () {
      return 'https://sigarra.up.pt/feup/pt/fotografias_service.foto?pct_cod=' + this.metadata.link.split('=')[1] + ''
    },
    setAltText () {
      return 'Foto de ' + this.metadata.description
    }
  },
  ready () {
    this.formatData()
    // this.setSearchableAttrs()
    this.setVisibleAttrs(this.metadata.type.label)
    this.$set('levelTwoAttributes', this.metadata.document)
    if ((this.$route.query.tipoentidade === 'Estudante' || !this.$route.query.tipoentidade) && this.levelTwoAttributes.length) {
      // this.sortCourses(this.metadata.metadata.decorations.levelTwoAttributes)
    }
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
  padding: 0;
  margin: 0;
}

.result-title h2 {
  font-size: 18px;
  font-weight: normal;
  color: #333;
  line-height: 1;
  margin: 0;
}

.result-title h2 a {
  display: inline-block;
  text-decoration: none;
  color: #1a0dab;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 650px;
}

.result-title h2 a:hover {
  text-decoration: underline;
}

.result-title h2 a:visited {
  color: #609;
}

.result-link {
/*  font-size: 16px;
  position: relative;
  line-height: 14px;*/
  display: flex;
  align-items: center;
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
  max-width: 450px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 20px;
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

.result-snippet a, .result-more-data a {
  text-decoration: none;
}

.result-snippet a:hover, .result-more-data a:hover {
  text-decoration: underline;
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
  margin: 4px 0;
  max-width: 650px;
  font-size: 13px;
  line-height: 1.15;
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
  background-color: #f7f7f7;
  padding: 1em;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 25px;
  border: 1px solid #e0e0e0;
}

.l2-attribute:first-of-type {
  /*margin-top: 25px;*/
}

.l2-attribute:last-of-type {
  margin-bottom: 0;
}

.attr-label {
  color: #222;
  font-size: 1em;
}

.attr-relationship {
  color: #111;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 5px;
  display: block;
}

.highlight {
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
  border-radius: 5px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  color: #f5f7fa;
  display: inline-block;
  font-size: 10px;
  line-height: 16px;
  padding: 0 20px;
  white-space: nowrap;
  top: 0;
  font-weight: bold;
  margin-right: 5px;
  margin-top: 3px;
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