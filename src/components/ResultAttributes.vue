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
        <span>{{{ obj.value }}}{{{ $index < formatLabels(labels.primary.line_1).length - 1 ? ',&nbsp;' : '' }}}</span>
      </p>
    </div>
    <div v-if="labels.primary.line_2" class="attributes">
      <p v-for="obj in formatLabels(labels.primary.line_2)">
        <span class="attr-label">{{{ obj.label | iconify }}}</span>
        <span>{{{ obj.value }}}{{{ $index < formatLabels(labels.primary.line_2).length - 1 ? ',&nbsp;' : '' }}}</span>
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
        <span>{{{ obj.value }}}{{{ $index < formatLabels(labels.secondary).length - 1 ? ',&nbsp;' : '' }}}</span>
      </p>
    </div>

    <div v-if="remainingLabels().length">
      <p v-for="obj in remainingLabels()" style="display: block;">
        <span class="attr-label">{{{ obj.label + ':&nbsp;' }}}</span>
        <span>{{{ obj.value }}}</span>
      </p>
    </div>

    <div v-for="label in labels.special">
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
        let labelsToHide = ['courses_in_charge', 'content', 'publication_date', 'name', 'display_name', 'photo_url', 'schools']
        let formatted = []
        let keys = Object.keys(this.metadata.document)
        let allLabels = [].concat(this.labels.primary.line_1)
                          .concat(this.labels.primary.line_2)
                          .concat(this.labels.secondary)
                          .concat(this.labels.special)
        // this.labels.primary.line_1 ? allLabels.splice(0, 0, this.labels.primary.line_1) : null
        // this.labels.primary.line_2 ? allLabels.splice(1, 0, this.labels.primary.line_2) : null
        // this.labels.secondary ? allLabels.splice(2, 0, this.labels.secondary) : null
        // this.labels.special ? allLabels.splice(3, 0, this.labels.special) : null
        // allLabels = allLabels.reduce((a, b) => {
        //   return a.concat(b)
        // })
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
</style>