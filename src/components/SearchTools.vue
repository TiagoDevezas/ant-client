<template>
  <div id="search-tools" :class="{'show': isToggled }">
    <filter-dropdown v-for="data in newData()" :data="data" :label="$key" v-if="checkFilterData && $key !== 'tipoentidade'"></filter-dropdown>
    <filter-dropdown v-if="$route.query.tipoentidade === 'Notícia' && checkFilterData" :data="newData(orderFacetData).s" label="s"></filter-dropdown>
    <div v-if="!checkFilterData" style="display: inline-flex;" v-for="newData in getFiltersFromURL">
      <filter-dropdown :data="newData" :label="$key" v-if="$key !== 'tipoentidade'"></filter-dropdown>
    </div>
  </div>
</template>

<script>
  import FilterDropdown from './FilterDropdown'

  export default {
    props: {
      filterData: {
        type: Object,
        default (val) {
          return { label: '', value: ''}
        }
      }
    },
    components: { FilterDropdown },
    data () {
      return {
        isToggled: false,
        defaultLabels: {
          fontesentidade: 'Qualquer origem',
          estado: 'Qualquer estado',
          // tipoentidade: 'Qualquer tipo',
          curso: 'Qualquer curso',
          departamento: 'Qualquer departamento',
          s: 'Ordenado por relevância'
        },
        orderFacetData: { s: [{ label: 'Ordenado por data', value: null}] },
        activeFilters: []
      }
    },
    events: {
      'toggleFacetsBar' (toggled) {
        this.$set('isToggled', toggled)
        let resultCounter = document.getElementById('results-counter')
        if (resultCounter) {
          if (this.isToggled) {
            resultCounter.classList.add('slide-out')
          } else {
            resultCounter.classList.remove('slide-out')
          }
        }
      },
      'routeChange' (newRoute) {
        let queryKeys = Object.keys(newRoute.to.query)
        // console.log(queryKeys)
        this.toggleFilterBar(queryKeys)
        // return true
      }
    },
    computed: {
      checkFilterData () {
        return Object.keys(this.filterData).length
      },
      getFiltersFromURL () {
        let filters = {}
        let queryKeys = Object.keys(this.$route.query)
        let defaultKeys = Object.keys(this.defaultLabels)
        queryKeys.forEach(key => {
          if (defaultKeys.indexOf(key) !== -1) {
            let arr = []
            arr.push({ label: this.$route.query[key], value: null })
            filters[key] = arr
          }
        })
        return this.newData(filters)
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
        keys.forEach(key => {
          let checkLabel = data[key].filter(obj => {
            return obj.label === this.defaultLabels[key]
          })
          if (!checkLabel.length) {
            data[key].unshift({ label: this.defaultLabels[key], value: null })
          }
        })
        return data
      },
      toggleFilterBar (keys) {
        let defaultKeys = Object.keys(this.defaultLabels)
        let counter = 0
        defaultKeys.forEach(key => {
          if (keys.indexOf(key) !== -1) {
            counter += 1
          }
        })
        if (counter === 0 && this.isToggled) {
          // this.$root.$broadcast('clickButton')
        } else if (counter > 0 && !this.isToggled) {
          this.$root.$broadcast('clickButton')
          setTimeout(() => {
            let facetBar = document.getElementById('search-tools')
            facetBar.classList.add('show')
            this.$root.$broadcast('clickButton')
          }, 10)
        }
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