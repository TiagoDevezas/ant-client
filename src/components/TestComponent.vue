<template>
  <div class="columns">
    <component :is="entityType" :title="metadata.description" :link="metadata.link"></component>
    <div class="column">
      <result-link-title :metadata="metadata" :category="category"></result-link-title>
      <result-sources :sources="metadata.sources"></result-sources>

    </div>
  </div>
</template>

<script>
  import PersonPicture from './PersonPicture'
  import ResultLinkTitle from './ResultLinkTitle'
  import ResultSources from './ResultSources'

  export default {
    props: ['metadata', 'entityType', 'category'],
    components: {
      Funcionário: PersonPicture,
      Estudante: PersonPicture,
      ResultLinkTitle,
      ResultSources
    },
    methods: {
      setVisibleAttrs (entityType) {
        let labelsToFilter = []
        switch (entityType) {
          case 'Funcionário':
            labelsToFilter = ['Código', 'Sigla', 'E-mail', 'Telefone', 'Voip', 'Sala']
            this.filterByLabels(labelsToFilter)
            break
          case 'Estudante':
            labelsToFilter = ['Código']
            this.filterByLabels(labelsToFilter)
            break
          case 'Sala':
            labelsToFilter = ['Descrição', 'Responsável', 'Edifício', 'Piso', 'Mapa', 'Utilização', 'Telefone', 'Código', 'Acesso Mobilidade Reduzida', 'Ativo', 'Computador', 'Projetor', 'Área']
            this.filterByLabels(labelsToFilter)
            break
          case 'Departamento':
            labelsToFilter = ['Responsável', 'Sigla', 'Sala', 'Código', 'Fax', 'E-mail', 'Telefone', 'Morada', 'Localização']
            this.filterByLabels(labelsToFilter)
            break
          case 'Notícia':
            labelsToFilter = ['Data de Publicação', 'Conteúdo']
            this.filterByLabels(labelsToFilter)
            break
          case 'Curso':
            labelsToFilter = ['Área Científica', 'Diretor']
            this.filterByLabels(labelsToFilter)
            break
          case 'Cadeira':
            labelsToFilter = ['Ativo', 'Professor']
            this.filterByLabels(labelsToFilter)
            break
        }
      },
      filterByLabels (labelsToFilter) {
        // let attrsObj = this.metadata.document
      }
    },
    ready () {
    }
  }
</script>

<style>
  
</style>