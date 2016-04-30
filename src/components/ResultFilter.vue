<template>
<div id="filter-nav">
  <div class="filter-wrapper">
      {{ setFilterFromUrl }}
      <ul class="result-filter">
        <li v-for="eType in entityTypes">
          <a
            v-link="{ name: 'search', query: { q: cleanQuery + eType.value }}"
            @click="setEntityType(eType.value)"
            :class="[eType.value.split(':')[1], { 'active': selectedEntityType === eType.value }]"
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
    props: ['queryParams'],
    data () {
      return {
        entityTypes: {
          all: {value: '', label: 'Todos'},
          funcionario: {value: this.setEntityValue('funcionário'), label: 'Funcionário'},
          estudante: {value: this.setEntityValue('estudante'), label: 'Estudantes'},
          sala: {value: this.setEntityValue('sala'), label: 'Salas'},
          departamento: {value: this.setEntityValue('departamento'), label: 'Departamentos'},
          noticia: {value: this.setEntityValue('noticia'), label: 'Notícias'},
          curso: {value: this.setEntityValue('curso'), label: 'Cursos'},
          cadeira: {value: this.setEntityValue('cadeira'), label: 'Cadeiras'}
        },
        selectedEntityType: ''
      }
    },
    methods: {
      setEntityType (type) {
        this.queryParams = this.queryParams.replace(this.selectedEntityType, '')
        this.$set('selectedEntityType', type)
      },
      setEntityValue (entityType) {
        return ' tipoentidade:' + entityType
      }
    },
    computed: {
      cleanQuery () {
        return this.queryParams.replace(this.selectedEntityType, '')
      },
      setFilterFromUrl () {
        let obj = this.entityTypes
        let objKey
        Object.keys(obj).forEach(key => {
          if (this.queryParams.indexOf(obj[key].value) > 0) {
            objKey = obj[key].value
          }
        })
        if (objKey) {
          this.setEntityType(objKey)
        } else {
          this.setEntityType('')
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

  .result-filter a.active {
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
</style>