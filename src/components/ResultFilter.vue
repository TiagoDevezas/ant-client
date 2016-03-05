<template>
<div id="filter-nav">
  <div class="filter-wrapper">
      {{ setFilterFromUrl }}
      <ul class="result-filter">
        <li>
          <a
            v-link="{ name: 'search', query: { q: cleanQuery + entityTypes.all }}"
            @click="setEntityType(entityTypes.all)"
            :class="{ 'active': selectedEntityType === '' }"
            >
            Todos
          </a>
        </li>
        <li>
          <a 
            v-link="{ name: 'search', query: { q: cleanQuery + entityTypes.funcionario }}"
            @click="setEntityType(entityTypes.funcionario)"
            :class="{ 'active': selectedEntityType === entityTypes.funcionario }"
            class="{{ entityTypes.funcionario.split(':')[1] }}"
            >
            Funcionários
          </a>
        </li>
        <li>
          <a 
            v-link="{ name: 'search', query: { q: cleanQuery + entityTypes.estudante }}"
            @click="setEntityType(entityTypes.estudante)"
            :class="{ 'active': selectedEntityType === entityTypes.estudante }"
            class="{{ entityTypes.estudante.split(':')[1] }}"
            >
            Estudantes
          </a>
        </li>
        <li>
          <a 
            v-link="{ name: 'search', query: { q: cleanQuery + entityTypes.sala }}"
            @click="setEntityType(entityTypes.sala)"
            :class="{ 'active': selectedEntityType === entityTypes.sala }"
            class="{{ entityTypes.sala.split(':')[1] }}"
            >
            Salas
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
          all: '',
          funcionario: ' tipoentidade:funcionário',
          estudante: ' tipoentidade:estudante',
          sala: ' tipoentidade:sala'
        },
        selectedEntityType: ''
      }
    },
    methods: {
      setEntityType (type) {
        this.$set('selectedEntityType', type)
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
          if (this.queryParams.indexOf(obj[key]) > 0) {
            objKey = obj[key]
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
</style>