<template>
  <div class="dropdown" @click="toggleDropdown" @blur="closeDropdown" tabindex="0">
    <span class="dropdown-label">
      <span :class="{'dropdown-highlight': selectedItem !== defaultLabels[label]}">{{ selectedItem }}
      </span>
    </span>
    <span class="dropdown-icon"><i class="material-icons">arrow_drop_down</i></span>
    <div :class="['dropdown-panel', { 'dropdown-open': isToggled }]">
      <div v-for="d in data" class="dropdown-item" @click="selectItem(this.label, d.label)">
        <span class="item-selected"><i class="material-icons" style="font-size: 14px;" v-if="d.label === selectedItem">check</i></span>
        <span>{{ d.label }}</span>
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
        defaultLabels: {
          fontesentidade: 'Qualquer origem',
          estado: 'Qualquer estado',
          tipoentidade: 'Qualquer tipo',
          curso: 'Qualquer curso',
          departamento: 'Qualquer departamento',
          s: 'Ordenado por relevância'
        }
      }
    },
    computed: {
    },
    methods: {
      toggleDropdown (event) {
        this.isToggled = !this.isToggled
      },
      closeDropdown (event) {
        this.isToggled = false
      },
      selectItem (key, label) {
        let currentQuery = this.$route.query
        if (label === this.defaultLabels[key]) {
          currentQuery[key] = undefined
          this.$set('selectedItem', label)
          this.$router.go({
            name: 'search',
            query: currentQuery
          })
        }
        if (label !== this.selectedItem) {
          if (this.label === 's') {
            currentQuery[key] = 'dataentidade'
          } else {
            currentQuery[key] = label
          }
          this.$set('selectedItem', label)
          this.$router.go({
            name: 'search',
            query: currentQuery
          })
        }
      },
      setLabel () {
        let defaultKeys = Object.keys(this.defaultLabels)
        let queryKeys = Object.keys(this.$route.query)
        queryKeys.forEach(key => {
          if (defaultKeys.indexOf(key) !== -1 && this.label === key) {
            if (this.$route.query[key] === 'dataentidade') {
              this.$set('selectedItem', 'Ordenado por data')
            } else {
              this.$set('selectedItem', this.$route.query[key])
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
        // let currentQuery = newRoute.query
        // setTimeout(() => {
        //   if (this.selectedItem !== this.defaultLabels[this.label] && this.selectedItem !== currentQuery[this.label]) {
        //     currentQuery[this.label] = this.selectedItem
        //     this.$router.replace({
        //       name: 'search',
        //       query: currentQuery
        //     })
        //   }
        //   this.setLabel()
        // }, 100)
        this.setLabel()
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
      padding: 6px 0;
      position: absolute;
      white-space: nowrap;
      z-index: 10;
      box-shadow: 0 2px 4px rgba(0,0,0,.2);
      cursor: pointer;
      .dropdown-item {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        font-weight: normal;
        &:hover, &:focus, &:active {
          background-color: #F1F1F1;
        }
        .item-selected {
          width: 24px;
          text-align: center;
        }
      }
    }
    .dropdown-open {
      display: block;
      z-index: 10000;
    }
  }
</style>