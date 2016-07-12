<template>
  <div class="dropdown" @click="toggleDropdown" @blur="closeDropdown" tabindex="0">
    <span class="dropdown-label">
      <span :class="{'dropdown-highlight': selectedItem !== defaultLabels[label]}">{{ selectedItem }}
      </span>
    </span>
    <span class="dropdown-icon"><i class="material-icons">arrow_drop_down</i></span>
    
    <div :class="['dropdown-panel', { 'dropdown-open': isToggled }]">

      <div v-for="d in data" :class="['dropdown-item', { 'border-top':  d.label === 'Intervalo personalizado'}]">

        <div @click="selectItem(this.label, d.label)" v-if="d.label !== 'Intervalo personalizado'">        
          <span class="item-selected"><i class="material-icons" style="font-size: 14px;" v-if="d.label === selectedItem">check</i></span>
          <span>{{ d.label }}</span>
        </div>

        <div v-if="d.label === 'Intervalo personalizado'" @click="openModal()">
          <span class="item-selected"><i class="material-icons" style="font-size: 14px;" v-if="customInterval">check</i></span>
          <span>{{ d.label }}</span>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: ['data', 'label'],
    data () {
      return {
        isToggled: false,
        selectedItem: '',
        customInterval: false,
        defaultLabels: {
          fontesentidade: 'Qualquer origem',
          estado: 'Qualquer estado',
          curso: 'Qualquer curso',
          departamento: 'Qualquer departamento',
          s: 'Ordenado por relevância',
          d: 'Qualquer altura'
        },
        dateFacetsLabels: {
          d: 'Últimas 24 horas',
          w: 'Última semana',
          m: 'Último mês',
          y: 'Último ano'
        }
      }
    },
    methods: {
      toggleDropdown (event) {
        this.isToggled = !this.isToggled
      },
      closeDropdown (event) {
        this.isToggled = false
      },
      openModal () {
        this.$dispatch('openModal')
        this.customInterval = true
      },
      selectItem (key, label) {
        let currentQuery = this.$route.query
        if (label === this.defaultLabels[key]) {
          if (key !== 'd') {
            currentQuery[key] = undefined
          } else {
            ['d', 'ed', 'sd'].forEach(str => {
              currentQuery[str] = undefined
            })
          }
        } else if (label !== this.selectedItem) {
          if (this.label === 's') {
            currentQuery[key] = 'dataentidade'
          } else if (this.label === 'd') {
            ['sd', 'ed'].forEach(str => {
              currentQuery[str] = undefined
            })
            if (label === 'Últimas 24 horas') {
              currentQuery['d'] = 'd'
            } else if (label === 'Última semana') {
              currentQuery['d'] = 'w'
            } else if (label === 'Último mês') {
              currentQuery['d'] = 'm'
            } else if (label === 'Último ano') {
              currentQuery['d'] = 'y'
            }
          } else {
            currentQuery[key] = label
          }
        }
        if (key !== 'd') {
          this.$dispatch('addtoActiveFilters', key)
        } else {
          if (currentQuery[key]) {
            // Remove all other facet date filters
            ['dd', 'dw', 'dm', 'dy'].forEach(val => {
              if (val !== key) {
                this.$dispatch('removeFromActiveFilters', val)
              }
            })
            this.$dispatch('addtoActiveFilters', key + '' + currentQuery[key])
          } else {
            ['dd', 'dw', 'dm', 'dy'].forEach(val => {
              this.$dispatch('removeFromActiveFilters', val)
            })
          }
        }
        this.$router.go({
          name: 'search',
          query: currentQuery
        })
        this.$set('selectedItem', label)
      },
      setLabel () {
        let defaultKeys = Object.keys(this.defaultLabels)
        let queryKeys = Object.keys(this.$route.query)
        queryKeys.forEach(key => {
          if (defaultKeys.indexOf(key) !== -1 && this.label === key) {
            if (this.$route.query[key] === 'dataentidade') {
              this.$set('selectedItem', 'Ordenado por data')
            } else if (key === 'd') {
              this.$set('selectedItem', this.dateFacetsLabels[this.$route.query[key]])
            } else {
              this.$set('selectedItem', this.$route.query[key])
            }
            if (key !== 'd') {
              this.$dispatch('addtoActiveFilters', key)
            } else {
              this.$dispatch('addtoActiveFilters', key + '' + this.$route.query[key])
            }
          }
        })
        if (!this.selectedItem) {
          this.$set('selectedItem', this.defaultLabels[this.label])
        }
      }
    },
    events: {
      'routeChange' (newRoute) {
        let queryKeys = Object.keys(newRoute.to.query)
        if (queryKeys.indexOf(this.label) === -1) {
          this.$set('selectedItem', this.defaultLabels[this.label])
          this.$dispatch('removeFromActiveFilters', this.label)
        }
      }
    },
    ready () {
      this.setLabel()
    }
  }
</script>

<style lang="scss">
  .dropdown {
    position: relative;
    margin-right: 10px;
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 1;
    cursor: pointer;
    outline: none !important;
    > span {
      display: inline-flex;
      flex: auto;
    }
    .dropdown-label {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .dropdown-highlight {
        color: #222;
        font-weight: bold;
      }
    }
    .dropdown-panel {
      display: none;
      top: 20px;
      left: 0;
      right: auto;
      background: #fff;
      border: 1px solid rgba(0,0,0,.2);
      font-size: 13px;
      // padding: 6px 0;
      position: absolute;
      white-space: nowrap;
      z-index: 10;
      box-shadow: 0 2px 4px rgba(0,0,0,.2);
      cursor: pointer;
      .dropdown-item {
        display: flex;
        align-items: center;
        padding: 8px 10px;
        font-weight: normal;
        &:hover, &:focus, &:active {
          background-color: #F1F1F1;
        }
        .item-selected {
          width: 24px;
          text-align: center;
          display: inline-block;
        }
      }
    }
    .border-top {
      border-top: 1px solid #ccc;
      padding-top: 8px;
    }
    .dropdown-open {
      display: block;
      z-index: 5000;
    }
  }
</style>