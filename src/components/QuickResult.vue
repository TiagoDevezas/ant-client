<template>
  <div class="quick-results flex" v-if="decorations">
    <div class="quick-result" v-for="attribute in decorations.attribute">
      <span class="attribute-description">
        {{{ createEntityLink(attribute.type.label, attribute.description) }}}
      </span>
      <div v-for="(k, v) in attribute.attributes" class="attribute-name">
        {{ k }}
        <div v-for="el in v" v-if="checkIfArray(v)" class="attribute-value">
          {{{ createEntityLink(k, el) }}}
        </div>
        <div v-if="!checkIfArray(v)" class="attribute-value">
          {{{ createEntityLink(k, v) }}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['decorations'],
    methods: {
      checkIfArray (attributeValue) {
        return attributeValue.constructor === Array
      },
      createEntityLink (attributeName, attributeValue) {
        let searchableEntityTypes = ['Estudante', 'Funcionário', 'Pessoal', 'Notícia', 'Cadeira', 'Sala', 'Curso', 'Departamento']
        if (searchableEntityTypes.indexOf(attributeName) !== -1) {
          return '<a href="search?q=' + '%22' + attributeValue +
             '%22&tipoentidade=' + attributeName + '">' + attributeValue +
             '</a>'
        }
        return attributeValue
      }
    }
  }
</script>

<style>
  .quick-results {
    padding-top: 0.6em !important;
    z-index: 10000;
    background-color: #F7F7F7;
    position: relative;
    margin-bottom: 20px;
    margin-left: 10px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    width: inherit !important;
    margin-right: 0.6em;
  }
  .attribute-description {
    font-size: 0.9em;
    font-weight: bold;
  }
  .attribute-name {
    font-size: 0.85em;
    margin-top: 5px;
    color: #000;
  }
  .attribute-value {
    font-size: 0.8em;
  }
  .attribute-value a {
    font-weight: bold;
  }
</style>
