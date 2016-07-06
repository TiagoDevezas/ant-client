<template>
  <div id="search-tools" :class="{'show': isToggled }">
    <filter-dropdown v-for="data in newData()" :data="data" :label="$key" v-if="filterData && $key !== 'tipoentidade'"></filter-dropdown>
    <filter-dropdown v-if="$route.query.tipoentidade === 'Notícia'" :data="newData(orderFacetData).s" label="s"></filter-dropdown>
  </div>
</template>

<script>
  import FilterDropdown from './FilterDropdown'

  export default {
    props: ['filterData'],
    components: { FilterDropdown },
    data () {
      return {
        isToggled: false,
        defaultLabels: {
          fontesentidade: 'Qualquer origem',
          estado: 'Qualquer estado',
          tipoentidade: 'Qualquer tipo',
          curso: 'Qualquer curso',
          departamento: 'Qualquer departamento',
          s: 'Ordenado por relevância'
        },
        orderFacetData: { s: [{ label: 'Ordenado por data', value: null}] }
      }
    },
    events: {
      'toggleSearchOptions': function (toggled) {
        this.$set('isToggled', toggled)
        let resultCounter = document.getElementById('results-counter')
        // let headerWrapper = document.getElementById('header-wrapper')
        if (this.isToggled) {
          resultCounter.classList.add('slide-out')
          // headerWrapper.style['box-shadow'] = 'none'
        } else {
          resultCounter.classList.remove('slide-out')
        }
      }
    },
    methods: {
      newData () {
        let data
        if (arguments[0]) {
          data = arguments[0]
        } else {
          data = this.filterData
        }
        let keys = Object.keys(data)
        console.log()
        keys.forEach(key => {
          let checkLabel = data[key].filter(obj => {
            return obj.label === this.defaultLabels[key]
          })
          if (!checkLabel.length) {
            data[key].unshift({ label: this.defaultLabels[key], value: null })
          }
        })
        return data
      }
    }
  }
</script>

<style>
  #search-tools {
    font-size: 0.8em;
    color: #888888;
    text-align: left;
    display: flex;
    align-items: center;
    position: absolute;
    top: -35px;
    padding: 10px 0 10px 110px;
    line-height: 1;
    transition: top 220ms ease-in-out;
    left: 0;
    right: 0;
    background-color: #fcfcfc;
    height: 35px;
    box-shadow: 0 1px 0 rgba(0,0,0,0.15);
    z-index: 5;
  }

  .show {
    top: 0 !important;
  }

  .slide-out {
    top: 34px !important;
  }
</style>