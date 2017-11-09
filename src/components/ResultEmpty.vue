<template>
<div class="result-empty">
  <p style="font-size: 18px;">Nenhum documento encontrado para a pesquisa actual.</p>
  <!-- <p>Por favor verifique se nenhuma palavra contém erros ortográficos, ou tente utilizar outras palavras-chave.</p> -->
  <p>Por favor verifique as palavras introduzidas, ou tente a pesquisa sem filtros: <a href="search?q={{$route.query.q}}">{{$route.query.q}}</a>
</div>
</template>

<script>
</script>

<style lang="scss">
  .result-empty {
    margin-top: 40px;
    padding-left: 10px;
    h2 {
      font-weight: normal;
    }
  }
</style>
