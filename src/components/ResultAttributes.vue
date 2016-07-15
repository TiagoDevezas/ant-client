<template>
<div>
  <div class="result-sources">
    <span v-if="entityType === 'Estudante'">
      <span class="attr-label">{{{ $t('course') }}}:</span>
      <span> {{{ metadata.document.courses[0].course | highlightQuery $route.query.q| isSearchable metadata.document.courses[0] $route.query.q }}}</span>
    </span>
    <div v-if="labels.primary.line_1" class="attributes">
      <p v-for="obj in formatLabels(labels.primary.line_1)">
        <span class="attr-label">{{{ obj.label | iconify obj.orig_label }}}</span> 
        <span>{{{ obj.value | cleanMarkup | highlightQuery $route.query.q | isSearchable obj $route.query.q }}} &nbsp;</span>
      </p>
    </div>
    <div v-if="labels.primary.line_2" class="attributes">
      <p v-for="obj in formatLabels(labels.primary.line_2)">
        <span class="attr-label">{{{ obj.label | iconify obj.orig_label }}}</span>
        <span>{{{ obj.value | cleanMarkup | highlightQuery $route.query.q  | isSearchable obj $route.query.q }}} &nbsp;</span>
      </p>
    </div>
    <span v-if="entityType === 'Notícia' && !isToggled">
      {{{ metadata.document.content | cleanMarkup | stripTags | highlightQuery $route.query.q | truncateText 20 }}}
    </span>
    <span v-if="entityType === 'Notícia' && isToggled">
      {{{ metadata.document.content | cleanMarkup | highlightQuery $route.query.q }}}
    </span>
  </div>
  <div class="result-more-data" :class="{ 'toggle': isToggled }">
  
    <div v-if="labels.secondary" class="attributes">
      <p v-for="obj in formatLabels(labels.secondary)">
        <span class="attr-label">{{{ obj.label | iconify obj.orig_label }}}</span>
        <span>{{{ obj.value | cleanMarkup | highlightQuery $route.query.q | isSearchable obj $route.query.q }}}</span>
      </p>
    </div>

    <div v-for="label in labels.special" v-if="entityType !== 'Sala' && entityType !== 'Departamento'">
      <div v-if="label">
        <p v-if="isDisplayable(label)" style="font-size: 15px;">{{ isDisplayable(label) }}</p>
        <div v-for="element in formatLabelArray(label)" class="attr-well">
          <div style="margin: 0 30px;" v-if="label === 'courses'">
            <i class="material-icons" style="font-size: 38px;">school</i>
          </div>
          <div>
            <span v-for="obj in element" style="display:block;">
              <span class="attr-label">{{{ obj.label + ':&nbsp;' }}}</span>
              <span>{{{ obj.value | cleanMarkup | highlightQuery $route.query.q | isSearchable obj $route.query.q }}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="entityType === 'Departamento'" class="attr-well-no-flex">
      <div v-for="obj in formatLabels(labels.special)" class="flex-align-center">
        <span class="attr-label">{{{ obj.label | iconify obj.orig_label }}}</span>
        <span>{{{ obj.value | cleanMarkup | highlightQuery $route.query.q | isSearchable obj $route.query.q  }}}</span>
      </div>
      
    </div>

    <div v-if="entityType === 'Sala'" style="margin: 10px 0; display: flex;">
      <div class="map-url" v-if="metadata.document.map_url" style="width: 100%;">
        <img :src="getMapUrl()" alt="">
      </div>
      <div class="attr-well-no-flex" style="width: 100%;">
        <div v-for="obj in formatLabels(labels.special)">       
          <span class="attr-label">{{{ obj.label + ':&nbsp;' }}}</span>
          <span>{{{ obj.value | cleanMarkup | highlightQuery $route.query.q | isSearchable obj $route.query.q }}}</span>
        </div>
      </div>
    </div>

    <div v-if="remainingLabels().length">
      <p v-for="obj in remainingLabels()" style="display: block;">
        <span class="attr-label">{{{ obj.label + ':&nbsp;' }}}</span>
        <span>{{{ obj.value | cleanMarkup |  highlightQuery $route.query.q | isSearchable obj $route.query.q }}}</span>
      </p>
    </div>

  </div>
</div>
</template>

<script>
  import { cleanMarkup, stripTags, highlightQuery, truncateText, iconify, isSearchable } from '../filters'

  export default {
    filters: { cleanMarkup, stripTags, highlightQuery, truncateText, iconify, isSearchable },
    props: ['isToggled', 'metadata', 'labels'],
    data () {
      return {
        entityType: this.metadata.type.label
      }
    },
    methods: {
      formatLabels (labels) {
        if (!labels) {
          return
        }
        let formatted = []
        let documentKeys = Object.keys(this.metadata.document)
        labels.forEach(label => {
          if (documentKeys.indexOf(label) !== -1) {
            let value = this.metadata.document[label]
            if (value === true) {
              value = this.$t(value.toString())
            }
            if (value === false) {
              value = this.$t(value.toString())
            }
            if (this.metadata.document[label].constructor === Array && typeof (this.metadata.document[label][0]) !== 'object') {
              value = this.metadata.document[label].join(', ')
              formatted.push({ label: this.$t(label), value: value, orig_label: label })
            } else if (this.metadata.document[label].constructor === Array && typeof (this.metadata.document[label][0]) === 'object') {
              let valueStrings = []
              this.metadata.document[label].forEach(obj => {
                let values = []
                Object.keys(obj).forEach(key => {
                  values.push(obj[key])
                })
                valueStrings.push(values.join(' - '))
              })
              formatted.push({ label: this.$t(label), value: valueStrings.join(', ') })
            } else {
              formatted.push({ label: this.$t(label), value: value, orig_label: label })
            }
          }
        })
        return this.setSearchableAttributes(formatted)
      },
      formatLabelArray (label) {
        let formatted = []
        let arr = this.metadata.document[label]
        for (let i in arr) {
          formatted.push([])
          let keys = Object.keys(arr[i])
          keys.forEach(key => {
            if (arr[i][key] === true) {
              arr[i][key] = this.$t(arr[i][key].toString())
            }
            if (arr[i][key] === false) {
              arr[i][key] = this.$t(arr[i][key].toString())
            }
            formatted[i].push({ label: this.$t(key), value: arr[i][key], orig_label: key })
          })
        }
        return this.setSearchableAttributes(formatted)
      },
      remainingLabels () {
        let labelsToHide = ['courses_in_charge', 'photo_url', 'content', 'publication_date', 'name', 'display_name', 'schools', 'map_url']
        let formatted = []
        let keys = Object.keys(this.metadata.document)
        let allLabels = [].concat(this.labels.primary.line_1)
                          .concat(this.labels.primary.line_2)
                          .concat(this.labels.secondary)
                          .concat(this.labels.special)
        keys.forEach(key => {
          if (allLabels.indexOf(key) === -1 && labelsToHide.indexOf(key) === -1) {
            formatted.push(key)
          }
        })
        return this.formatLabels(formatted)
      },
      setSearchableAttributes (objArray) {
        let searchableAttributes = {
          rooms: true,
          room: true,
          // building: true,
          teachers_in_charge: true,
          teachers: true,
          director: true,
          directors: true,
          person_in_charge: true,
          people_in_charge: true,
          occupants: true,
          department: true,
          course: true,
          faculty: true,
          unit_in_charge: true,
          scientific_areas: true,
          predominant_scientific_areas: true,
          course_unit: true
        }
        let searchableEntities = {
          rooms: 'Sala',
          room: 'Sala',
          teachers_in_charge: 'Funcionário',
          teachers: 'Funcionário',
          director: 'Funcionário',
          directors: 'Funcionário',
          person_in_charge: 'Funcionário',
          people_in_charge: 'Funcionário',
          occupants: 'Funcionário',
          department: 'Departamento',
          course: 'Curso',
          unit_in_charge: 'Departamento',
          course_unit: 'Cadeira'
        }
        if (typeof (objArray[0] === 'object')) {
          objArray.forEach(obj => {
            obj.searchable = searchableAttributes[obj.orig_label]
            if (obj.searchable) {
              obj.entityType = searchableEntities[obj.orig_label]
            }
          })
        }
        if (objArray[0] && objArray[0].constructor === Array) {
          objArray.forEach(arr => {
            arr.forEach(obj => {
              obj.searchable = searchableAttributes[obj.orig_label]
              if (obj.searchable) {
                obj.entityType = searchableEntities[obj.orig_label]
              }
            })
          })
        }
        return objArray
      },
      isDisplayable (label) {
        if (Object.keys(this.metadata.document).indexOf(label) !== -1) {
          return this.$t(label)
        }
      },
      getMapUrl () {
        return this.metadata.document.map_url
      }
    }
  }
</script>

<style lang="scss">
  .attributes {
    display: flex;
  }
  .attributes > p {
    display: flex;
    align-items: center;
  }
  .attr-well {
    display: flex;
    align-items: center;
    margin-top: 10px;
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    font-size: 13px;
    span {
      font-size: 13px;
    }
  }

  .attr-well:last-of-type {
    margin-bottom: 10px;
  }

  .attr-well-no-flex {
    margin: 10px 0;
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    span {
      font-size: 13px;
    }
  }

  .flex-align-center {
    display: flex;
    align-items: center;
    > span {
      display: inline-flex;
    }
    i.material-icons::after {
      content: "\00a0";
    }
  }

  .map-url > img {
    max-width: 90%;
    margin: 0 auto;
  }
</style>