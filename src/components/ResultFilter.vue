<template>
{{ setFilterFromUrl }}
<div id="filter-nav">
  <div class="filter-wrapper">
      <ul class="result-filter">
        <li v-for="eType in entityTypes" track-by="$index">
          <a
            v-link="{ name: 'search', query: { q: queryParams, tipoentidade: eType.value !== 'todos' ? eType.value : null }}"
            :class="[eType.value, { 'active': selectedEntityType === eType.value }]"
          >
          {{ eType.label }}
          </a>
        </li>
      </ul> 
  </div>
</div>
</template>

<script>
  export default {
    props: ['queryParams', 'entityTypes'],
    data () {
      return {
        // entityTypes: {
        //   all: {value: 'todos', label: 'Todos'},
        //   funcionário: {value: 'funcionário', label: 'Funcionários'},
        //   estudante: {value: 'estudante', label: 'Estudantes'},
        //   sala: {value: 'sala', label: 'Salas'},
        //   departamento: {value: 'departamento', label: 'Departamentos'},
        //   notícia: {value: 'notícia', label: 'Notícias'},
        //   curso: {value: 'curso', label: 'Cursos'},
        //   cadeira: {value: 'cadeira', label: 'Cadeiras'}
        // },
        selectedEntityType: ''
      }
    },
    computed: {
      setFilterFromUrl () {
        if (this.$route.query.tipoentidade) {
          const type = this.$route.query.tipoentidade
          this.$set('selectedEntityType', type)
        } else {
          this.$set('selectedEntityType', 'todos')
        }
      }
    }
  }
</script>

<style>
  #filter-nav {
    margin-left: 7px;
    line-height: 38px;
    max-height: 38px;
    position: relative;
    padding-left: 94px;
  }
  .filter-wrapper {
    padding-left: 3px;
    white-space: nowrap;
    height: 38px;
  }
  .result-filter {
    margin: 0;
    padding: 0 0 1px;
    text-transform: capitalize;
    list-style: none;
    display: inline-block;
    float: none;
    overflow: hidden;
    white-space: nowrap;
  }

  .result-filter li {
    list-style: none;
    overflow: hidden;
    vertical-align: top;
    display: inline-block;
  }
  .result-filter li a {
    color: #666;
    text-decoration: none;
    display: block;
    font-size: .75em;
    position: relative;
    margin: 0 7px;
    height: 37px;
    line-height: 38px;
    font-weight: 600;
    outline: none;
  }

  .result-filter a.active.todos {
    color: #4285f4 !important;
    border-bottom: solid 3px #4285f4;
  }
  .result-filter a.active.Funcionário {
    color: #1ABC9C !important;
    border-bottom: solid 3px #1ABC9C;
  }
  .result-filter a.active.Estudante {
    color: #2ECC71 !important;
    border-bottom: solid 3px #2ECC71;
  }
  .result-filter a.active.Sala {
    color: #9B59B6 !important;
    border-bottom: solid 3px #9B59B6;
  }
  .result-filter a.active.Departamento {
    color: #34495E !important;
    border-bottom: solid 3px #34495E;
  }
  .result-filter a.active.Notícia {
    color: #F39C12 !important;
    border-bottom: solid 3px #F39C12;
  }
  .result-filter a.active.Curso {
    color: #E67E22 !important;
    border-bottom: solid 3px #E67E22;
  }
  .result-filter a.active.Cadeira {
    color: #C0392B !important;
    border-bottom: solid 3px #C0392B;
  }
</style>