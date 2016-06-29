<template>
<div class="flex">
  <person-picture v-if="entityType === 'Funcionário' || entityType === 'Estudante'" :title="metadata.description" :link="metadata.link"></person-picture>
  <div :class="['no-bottom-padding', {
    'full': entityType !== 'Funcionário' || entityType !== 'Estudante',
    'four-fifth': entityType === 'Funcionário' || entityType === 'Estudante'
    }]">
    <result-link-title :metadata="metadata" :category="category"></result-link-title>
    <result-sources :metadata="metadata" :is-toggled="toggled"></result-sources>
    <result-attributes :is-toggled="toggled" :metadata="metadata" :labels="setVisibleAttrs(entityType)"></result-attributes>
  </div>
  <div class="full no-bottom-padding">
    <more-content></more-content>
  </div>
</div>
</template>

<script>
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
        toggled: false
      }
    },
    events: {
      'isToggled' (val) {
        this.toggled = !this.toggled
      }
    },
    methods: {
      setVisibleAttrs (entityType) {
        let labels
        switch (entityType) {
          case 'Funcionário':
            labels = {
              primary: {
                line_1: ['code', 'acronym'],
                line_2: ['institutional_emails', 'alternative_telephone', 'voip', 'rooms']
              },
              secondary: ['status'],
              special: ['positions', 'teaching', 'functions', 'research']
            }
            return labels
            // this.filterByLabels(labelsToFilter)
            // break
          case 'Estudante':
            labels = {
              primary: {
                line_1: ['code']
              },
              secondary: ['sites'],
              special: ['courses']
            }
            return labels
            // this.filterByLabels(labelsToFilter)
            // break
          case 'Sala':
            labels = {
              primary: {
                line_1: ['people_in_charge'],
                line_2: ['building', 'floor']
              }
            }
            return labels
            // break
          case 'Departamento':
            labels = {
              primary: {
                line_1: ['person_in_charge']
              }
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
                line_1: ['active'],
                line_2: ['teachers_in_charge']
              },
              special: ['study_plan']
            }
            return labels
            // break
        }
      },
      filterByLabels (labelsToFilter) {
        // let attrsObj = this.metadata.document
        // let attrsObjkeys = Object.keys(attrsObj)
        // Object.keys(labelsToFilter).forEach(key => {
        //   let labelObj = labelsToFilter[key]
        //   Object.keys(labelObj).forEach(label => {
        //     let labelArray = labelObj[label]
        //     labelArray.forEach(l => {
        //       if (attrsObjkeys.indexOf(l) !== -1) {
        //         this.primaryAttributes.push({[l]: attrsObj[l]})
        //       }
        //     })
        //   })
        // })
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