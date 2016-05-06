<template>
  <div id="floating-link">
    <a href="#!{{ linkPath }}">{{ linkText }}</a>
  </div>
</template>

<script>
  export default {
    props: ['linkText', 'linkPath']
  }
</script>

<style>
  #floating-link {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #E5E5E5;
    z-index: 100;
  }

  #floating-link:hover {
    background-color: #D8D8D8;
  }

  #floating-link a {
    padding: 10px 25px;
    text-decoration: none;
    color: #555555;
    text-transform: uppercase;
    font-size: .8em;
    line-height: 1.2;
    display: inline-block;
  }
</style>