<template>
  <div id="search-tools" :class="{'show': isToggled }">
    <filter-dropdown v-for="data in newData()" :data="data" :label="$key" v-if="filterData && $key !== 'tipoentidade'"></filter-dropdown>
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
          departamento: 'Qualquer departamento'
        }
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
      newData () {
        let data = this.filterData
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
    align-content: center;
    position: absolute;
    top: -30px;
    padding: 10px 0 11px 10px;
    line-height: 1;
    transition: top 220ms ease-in-out;
  }

  .show {
    top: 0 !important;
  }

  .slide-out {
    top: 30px !important;
  }
</style>