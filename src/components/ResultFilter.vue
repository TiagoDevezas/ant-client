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
    color: #de5833 !important;
    border-bottom: solid 3px #de5833;
  }
  .result-filter a.active.funcionário {
    color: #97cd76 !important;
    border-bottom: solid 3px #97cd76;
  }
  .result-filter a.active.estudante {
    color: #1fc8db !important;
    border-bottom: solid 3px #1fc8db;
  }
  .result-filter a.active.sala {
    color: #222324 !important;
    border-bottom: solid 3px #222324;
  }
  .result-filter a.active.departamento {
    color: #69707a !important;
    border-bottom: solid 3px #69707a;
  }
  .result-filter a.active.notícia {
    color: #3288bd !important;
    border-bottom: solid 3px #3288bd;
  }
  .result-filter a.active.curso {
    color: #66c2a5 !important;
    border-bottom: solid 3px #66c2a5;
  }
  .result-filter a.active.cadeira {
    color: #f46d43 !important;
    border-bottom: solid 3px #f46d43;
  }
</style>