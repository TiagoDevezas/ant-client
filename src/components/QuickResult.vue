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
    /*padding-top: 0.6em !important;*/
    z-index: 10000;
    background-color: #F7F7F7;
    position: relative;
    margin-bottom: 20px;
    margin-left: 10px;
    border: 1px solid #D0D0D0;
    border-radius: 5px;
    width: inherit !important;
    margin-right: 0.6em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  }
  .quick-result {
    border-left: 1px solid #D0D0D0;
    padding: 0px !important;
  }
  .attribute-description {
    padding: 5px 10px;
    display: block;
    font-size: 0.9em;
    font-weight: bold;
    border-bottom: 1px solid #D0D0D0;
  }
  .attribute-name {
    background-color: #FFF;
    padding: 5px 10px;
    font-size: 0.85em;
    color: #000;
    border-bottom: 1px solid #D0D0D0;
  }
  .attribute-value {
    font-size: 0.8em;
  }
  .attribute-value a {
    font-weight: bold;
  }
</style>
