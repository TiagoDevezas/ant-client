<template>
    {{ received }}
    <div id="search-form-embeddable" class="flex">
      <div class="logo shrink">
        <a href="http://ant.fe.up.pt" title="ANT - Pesquisa de Informação na Universidade do Porto">
          <img src="../assets/ant_logo.svg" alt="ANT - Pesquisa de Informação na Universidade do Porto" width="50px">
        </a>
      </div>
      <search-form is-embedded="true" placeholder-text="Pesquisar no ANT"></search-form>
    </div>
</template>

<script>
  import SearchForm from './SearchForm'

  export default {
    components: {
      SearchForm
    },
    data () {
      return {
        received: 0
      }
    },
    events: {
      'updateForm' (value) {
        alert(value)
        this.received = value
        console.log(value)
      }
    }
  }
</script>
