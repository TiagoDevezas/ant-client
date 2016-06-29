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
            if (this.metadata.document[label].constructor === Array) {
              value = this.metadata.document[label].join(', ')
            }
            formatted.push({ label: this.$t(label), value: value })
          }
        })
        return formatted
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
</style>