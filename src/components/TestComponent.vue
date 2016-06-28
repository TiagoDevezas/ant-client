<template>
<div class="flex">
  <person-picture v-if="entityType === 'Funcionário' || entityType === 'Estudante'" :title="metadata.description" :link="metadata.link"></person-picture>
  <div :class="['no-bottom-padding', {
    'full': entityType !== 'Funcionário' || entityType !== 'Estudante',
    'four-fifth': entityType === 'Funcionário' || entityType === 'Estudante'
    }]">
    <result-link-title :metadata="metadata" :category="category"></result-link-title>
    <result-sources :sources="metadata.sources" :is-toggled="toggled"></result-sources>
    <visible-attributes :is-toggled="toggled"></visible-attributes>
<!--     <span class="result-sources">
      {{ translateAttributes(primaryAttributes) }}
    </span> -->
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
  import VisibleAttributes from './VisibleAttributes'
  import MoreContent from './MoreContent'

  export default {
    props: ['metadata', 'entityType', 'category'],
    components: {
      PersonPicture,
      ResultLinkTitle,
      ResultSources,
      VisibleAttributes,
      MoreContent
    },
    data () {
      return {
        primaryAttributes: [],
        secondaryAttributes: [],
        extraAttributes: [],
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
        let labelsToFilter = []
        switch (entityType) {
          case 'Funcionário':
            labelsToFilter = {
              primary: {
                line_1: ['code', 'acronym'],
                line_2: ['institutional_emails', 'alternative_telephone', 'voip', 'rooms']
              }
            }
            this.filterByLabels(labelsToFilter)
            break
          // case 'Estudante':
          //   labelsToFilter = ['Código']
          //   this.filterByLabels(labelsToFilter)
          //   break
          // case 'Sala':
          //   labelsToFilter = ['Descrição', 'Responsável', 'Edifício', 'Piso', 'Mapa', 'Utilização', 'Telefone', 'Código', 'Acesso Mobilidade Reduzida', 'Ativo', 'Computador', 'Projetor', 'Área']
          //   this.filterByLabels(labelsToFilter)
          //   break
          // case 'Departamento':
          //   labelsToFilter = ['Responsável', 'Sigla', 'Sala', 'Código', 'Fax', 'E-mail', 'Telefone', 'Morada', 'Localização']
          //   this.filterByLabels(labelsToFilter)
          //   break
          // case 'Notícia':
          //   labelsToFilter = ['Data de Publicação', 'Conteúdo']
          //   this.filterByLabels(labelsToFilter)
          //   break
          // case 'Curso':
          //   labelsToFilter = ['Área Científica', 'Diretor']
          //   this.filterByLabels(labelsToFilter)
          //   break
          // case 'Cadeira':
          //   labelsToFilter = ['Ativo', 'Professor']
          //   this.filterByLabels(labelsToFilter)
          //   break
        }
      },
      filterByLabels (labelsToFilter) {
        let attrsObj = this.metadata.document
        let attrsObjkeys = Object.keys(attrsObj)
        Object.keys(labelsToFilter).forEach(key => {
          let labelObj = labelsToFilter[key]
          Object.keys(labelObj).forEach(label => {
            let labelArray = labelObj[label]
            labelArray.forEach(l => {
              if (attrsObjkeys.indexOf(l) !== -1) {
                this.primaryAttributes.push({[l]: attrsObj[l]})
              }
            })
          })
        })
      },
      translateAttributes (attrArray) {
        let translated = []
        for (let i in attrArray) {
          if (typeof (attrArray[i]) === 'object') {
            let key = Object.keys(attrArray[i])
            translated.push('' + this.$t(key) + ': ' + attrArray[i][key])
          }
        }
        return translated.join(', ')
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