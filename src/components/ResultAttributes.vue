<template>
<div>
  <div class="result-sources">
    <span v-if="entityType === 'Estudante'">
      <span class="attr-label">{{{ $t('course') }}}:</span>
      <span> {{{ metadata.document.courses[0].course }}}</span>
    </span>
    <div v-if="labels.primary.line_1" class="attributes">
      <p v-for="obj in formatLabels(labels.primary.line_1)">
        <span class="attr-label">{{{ obj.label | iconify }}}</span> 
        <span>{{{ obj.value }}} &nbsp;</span>
      </p>
    </div>
    <div v-if="labels.primary.line_2" class="attributes">
      <p v-for="obj in formatLabels(labels.primary.line_2)">
        <span class="attr-label">{{{ obj.label | iconify }}}</span>
        <span>{{{ obj.value }}} &nbsp;</span>
      </p>
    </div>
    <span v-if="entityType === 'Notícia' && !isToggled">
      {{{ metadata.document.content | cleanMarkup | stripTags | truncateText 20 }}}
    </span>
    <span v-if="entityType === 'Notícia' && isToggled">
      {{{ metadata.document.content | cleanMarkup }}}
    </span>
  </div>
  <div class="result-more-data" :class="{ 'toggle': isToggled }">
  
    <div v-if="labels.secondary" class="attributes">
      <p v-for="obj in formatLabels(labels.secondary)">
        <span class="attr-label">{{{ obj.label | iconify }}}</span>
        <span>{{{ obj.value }}}</span>
      </p>
    </div>

    <div v-for="label in labels.special" v-if="entityType !== 'Sala' && entityType !== 'Departamento'">
      <div v-if="label">
        <div v-for="element in formatLabelArray(label)" class="attr-well">
          <div style="margin: 0 30px;" v-if="label === 'courses'">
            <i class="material-icons" style="font-size: 38px;">school</i>
          </div>
          <div>
            <span v-for="obj in element" style="display:block;">
              <span class="attr-label">{{{ obj.label + ':&nbsp;' }}}</span>
              <span>{{{ obj.value }}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="entityType === 'Departamento'" class="attr-well-no-flex">
      <div v-for="element in formatLabels(labels.special)">
        <span class="attr-label">{{{ element.label | iconify }}}</span>
        <span>{{{ element.value }}}</span>
      </div>
      
    </div>

    <div v-if="entityType === 'Sala'" style="margin: 20px 0; display: flex;">
      <div class="map-url" v-if="metadata.document.map_url">
        <img src="{{ metadata.document.map_url }}" alt="">
      </div>
      <div class="attr-well-no-flex">
        <div v-for="element in formatLabels(labels.special)">       
          <span class="attr-label">{{{ element.label + ':&nbsp;' }}}</span>
          <span>{{{ element.value }}}</span>
        </div>
      </div>
    </div>

    <div v-if="remainingLabels().length">
      <p v-for="obj in remainingLabels()" style="display: block;">
        <span class="attr-label">{{{ obj.label + ':&nbsp;' }}}</span>
        <span>{{{ obj.value }}}</span>
      </p>
    </div>

  </div>
</div>
</template>

<script>
  import { cleanMarkup, stripTags, truncateText, iconify } from '../filters'

  export default {
    filters: { cleanMarkup, stripTags, truncateText, iconify },
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
            if (this.metadata.document[label].constructor === Array && typeof (this.metadata.document[label][0]) !== 'object') {
              value = this.metadata.document[label].join(', ')
              formatted.push({ label: this.$t(label), value: value })
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
              formatted.push({ label: this.$t(label), value: value })
            }
          }
        })
        return formatted
      },
      formatLabelArray (label) {
        let formatted = []
        let arr = this.metadata.document[label]
        for (let i in arr) {
          formatted.push([])
          let keys = Object.keys(arr[i])
          keys.forEach(key => {
            formatted[i].push({ label: this.$t(key), value: arr[i][key] })
          })
        }
        return formatted
      },
      remainingLabels () {
        // let labelsToHide = ['courses_in_charge', 'content', 'publication_date', 'name', 'display_name', 'photo_url', 'schools', 'description', 'school', 'space', 'map_url']
        let labelsToHide = ['courses_in_charge', 'photo_url', 'content', 'publication_date']
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
      }
    }
  }
</script>

<style>
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
    margin-bottom: 25px;
    border: 1px solid #e0e0e0;
  }
  .attr-well-no-flex {
    margin-bottom: 10px;
    background-color: #f7f7f7;
    padding: 1em;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
  }
  .map-url > img {
    max-width: 90%;
    margin: 0 auto;
  }
</style>