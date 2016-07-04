<template>
  <div id="search-tools" :class="{'show': isToggled }">
    <span>{{ isToggled }}</span>
  </div>
</template>

<script>
  export default {
    props: ['filterData'],
    data () {
      return {
        isToggled: false
      }
    },
    events: {
      'toggleSearchOptions': function (toggled) {
        this.$set('isToggled', toggled)
        let resultCounter = document.getElementById('results-counter')
        if (this.isToggled) {
          resultCounter.classList.add('slide-out')
        } else {
          resultCounter.classList.remove('slide-out')
        }
      }
    },
    methods: {
    },
    ready () {
      console.log(this.filterData)
    }
  }
</script>

<style>
  #search-tools {
    font-size: 0.8em;
    color: #888888;
    text-align: left;
    display: flex;
    align-content: center;
    position: absolute;
    top: -25px;
    padding: 10px 0 11px 10px;
    line-height: 1;
    transition: top 220ms ease-in-out;
  }

  .show {
    top: 0 !important;
  }

  .slide-out {
    top: 25px !important;
  }
</style>