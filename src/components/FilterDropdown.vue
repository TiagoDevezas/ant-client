<template>
  <div class="dropdown" @click="toggleDropdown" @blur="closeDropdown" tabindex="0">
    <span class="dropdown-label">{{ selectedItem }}</span>
    <span class="dropdown-icon"><i class="material-icons">arrow_drop_down</i></span>
    <div :class="['dropdown-panel', { 'dropdown-open': isToggled }]">
      <div v-for="d in newData" class="dropdown-item" @click="selectItem($event, this.label, d.label)">
        {{ d.label }}
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
          departamento: 'Qualquer departamento'
        },
        newData: null
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
      selectItem (event, key, label) {
        let currentQuery = this.$route.query
        if (label === this.defaultLabels[key]) {
          currentQuery[key] = undefined
          this.$router.go({
            name: 'search',
            query: currentQuery
          })
          this.$set('selectedItem', label)
        }
        if (label !== this.selectedItem) {
          currentQuery[key] = label
          this.$router.go({
            name: 'search',
            query: currentQuery
          })
          this.$set('selectedItem', label)
        }
      },
      setDefaultLabel () {
        let defaultKeys = Object.keys(this.defaultLabels)
        let queryKeys = Object.keys(this.$route.query)
        queryKeys.forEach(key => {
          if (defaultKeys.indexOf(key) !== -1 && this.label === key) {
            this.$set('selectedItem', this.$route.query[key])
          }
        })
        if (!this.selectedItem) {
          this.$set('selectedItem', this.defaultLabels[this.label])
        }
      },
      formatData () {
        let newData = this.data
        let checkLabel = newData.filter(obj => {
          return obj.label === this.defaultLabels[this.label]
        })
        if (!checkLabel.length) {
          newData.unshift({ label: this.defaultLabels[this.label], value: null })
        }
        this.$set('newData', newData)
      }
    },
    events: {
      'routeChange' (newRoute) {
        this.formatData()
        this.setDefaultLabel()
      }
    },
    ready () {
      this.formatData()
      this.setDefaultLabel()
    }
  }
</script>

<style lang="scss">
  .dropdown {
    position: relative;
    font-weight: bold;
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
    }
    .dropdown-panel {
      display: none;
      top: 25px;
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
        padding: 5px 10px;
        font-weight: normal;
        &:hover, &:focus, &:active {
          background-color: #F1F1F1;
        }
      }
    }
    .dropdown-open {
      display: block;
      z-index: 10000;
    }
  }
</style>