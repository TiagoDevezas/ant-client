<template>
  <div id="search-tools" :class="{'show': isToggled }">

    <filter-dropdown v-for="data in newData()" :data="data" :label="$key" v-if="checkFilterData && $key !== 'tipoentidade'"></filter-dropdown>

    <filter-dropdown v-if="($route.query.tipoentidade === 'Notícia' && checkFilterData) || sortDropdown" :data="newData(orderFacetData).s" label="s"></filter-dropdown>

    <filter-dropdown v-if="($route.query.tipoentidade === 'Notícia' && checkFilterData) || dateDropdown" :data="newData(dateFacetData).d" label="d"></filter-dropdown>

    <filter-dropdown v-if="($route.query.tipoentidade === 'Cadeira' && checkFilterData) || creditDropdown" :data="newData(creditRangeFacetData).cr" label="cr"></filter-dropdown>
 
    <div v-if="!checkFilterData" style="display: inline-flex;" v-for="newData in getFiltersFromURL">
      <filter-dropdown :data="newData" :label="$key" v-if="$key !== 'tipoentidade'"></filter-dropdown>
    </div>
 
    <filter-clear v-if="activeFilters.length" :active-filters="activeFilters" btn-label="Limpar"></filter-clear>

    <modal title="Intervalo de datas personalizado" :show.sync="dateModal">
      <date-range-picker slot="modal-body" :start-date.sync="startDate" :end-date.sync="endDate"></date-range-picker>
    </modal>

    <modal title="Intervalo de créditos personalizado" :show.sync="creditModal">
    <credit-range-picker slot="modal-body"></credit-range-picker>
    </modal>

  </div>
</template>

<script>
  import FilterDropdown from './FilterDropdown'
  import FilterClear from './FilterClear'
  import Modal from './Modal'
  import DateRangePicker from './DateRangePicker'
  import CreditRangePicker from './CreditRangePicker'

  export default {
    props: {
      filterData: {
        type: Object,
        default (val) {
          return { name: [ { label: '', value: '' } ] }
        }
      }
    },
    components: { FilterDropdown, FilterClear, Modal, DateRangePicker, CreditRangePicker },
    data () {
      return {
        isToggled: false,
        dateModal: false,
        creditModal: false,
        startDate: '',
        endDate: '',
        dateDropdown: false,
        creditDropdown: false,
        sortDropdown: false,
        defaultLabels: {
          fontesentidade: 'Qualquer unidade',
          estado: 'Qualquer estado',
          curso: 'Qualquer curso',
          departamento: 'Qualquer departamento',
          s: 'Ordenado por relevância',
          d: 'Qualquer altura',
          cr: 'Qualquer intervalo de créditos'
        },
        orderFacetData: {
          s: [{ label: 'Ordenado por data', value: null}]
        },
        dateFacetData: {
          d: [
            { label: 'Últimas 24 horas', value: null },
            { label: 'Última semana', value: null },
            { label: 'Último mês', value: null },
            { label: 'Último ano', value: null },
            { label: 'Intervalo personalizado', value: null }
          ]
        },
        creditRangeFacetData: {
          cr: [{ label: 'Intervalo personalizado', value: null }]
        },
        activeFilters: []
      }
    },
    events: {
      'openDateModal' () {
        this.dateModal = true
      },
      'openCreditModal' () {
        this.creditModal = true
      },
      'toggleFacetsBar' (toggled) {
        this.$set('isToggled', toggled)
      },
      'routeChange' (newRoute) {
        if (newRoute.to.query['tipoentidade'] !== 'Notícia') {
          ['dd', 'dw', 'dm', 'dy', 'dr'].forEach(str => {
            this.$dispatch('removeFromActiveFilters', str)
          })
        }
        let queryKeys = Object.keys(newRoute.to.query)
        this.toggleFilterBar(queryKeys)
        return true
      },
      'removeFromActiveFilters' (key) {
        let idx = this.activeFilters.indexOf(key)
        if (idx !== -1) {
          this.activeFilters.splice(idx, 1)
        }
      },
      'addtoActiveFilters' (key) {
        if (key && this.activeFilters.indexOf(key) === -1) {
          this.activeFilters.push(key)
        }
      }
    },
    computed: {
      checkFilterData () {
        return Object.keys(this.filterData).length
      },
      getFiltersFromURL () {
        this.dateDropdown = false
        this.creditDropdown = false
        this.sortDropdown = false
        let filters = {}
        let currentQuery = JSON.parse(JSON.stringify(this.$route.query))
        delete currentQuery['d']
        delete currentQuery['cr']
        delete currentQuery['s']
        let queryKeys = Object.keys(currentQuery)
        let defaultKeys = Object.keys(this.defaultLabels)
        queryKeys.forEach(key => {
          if (defaultKeys.indexOf(key) !== -1) {
            let arr = []
            arr.push({ label: this.$route.query[key], value: null })
            filters[key] = arr
          }
        })
        if (this.$route.query['sd'] || this.$route.query['d']) {
          this.dateDropdown = true
        }
        if (this.$route.query['cr']) {
          this.creditDropdown = true
        }
        if (this.$route.query['s']) {
          this.sortDropdown = true
        }
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
        let defaultKeys = Object.keys(this.defaultLabels).concat('sd')
        let counter = 0
        defaultKeys.forEach(key => {
          if (keys.indexOf(key) !== -1) {
            counter += 1
          }
        })
        if (counter === 0 && this.isToggled) {
          // this.$root.$broadcast('toggleButton')
        }
        if (counter > 0 && !this.isToggled) {
          // setTimeout(() => {
          this.$root.$broadcast('toggleButton')
          // }, 1)
        }
        if (counter === 0 && !this.toggled && this.$route.query['fb']) {
          this.$root.$broadcast('toggleButton')
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