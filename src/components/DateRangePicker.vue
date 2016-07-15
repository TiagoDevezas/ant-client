<template>
  <div class="modal-input-container">
    <span class="modal-input-label">De:</span><input type="text" id="start-date">
    <span class="modal-input-label">Até:</span><input type="text" id="end-date">
  </div>
  <div class="modal-input-controls">
    <span class="modal-input-submit" @click="setDateInterval" v-if="startDate">Ir</span>
  </div>
</template>

<script>
  import moment from 'moment'
  import Pikaday from 'pikaday'

  export default {
    props: ['startDate', 'endDate'],
    data () {
      return {
        pickerStart: '',
        pickerEnd: '',
        i18n: {
          previousMonth: 'Mês anterior',
          nextMonth: 'Mês seguinte',
          months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        },
        apiDateFormat: 'YYYYMMDD',
        displayDateFormat: 'DD/MM/YYYY'
      }
    },
    methods: {
      createPickers () {
        let self = this
        let pickerStart = new Pikaday({
          field: document.getElementById('start-date'),
          maxDate: new Date(),
          format: this.displayDateFormat,
          i18n: self.i18n,
          onSelect () {
            let dateNow = this.getDate()
            self.$set('startDate', dateNow)
          }
        })
        let pickerEnd = new Pikaday({
          field: document.getElementById('end-date'),
          maxDate: new Date(),
          format: this.displayDateFormat,
          i18n: self.i18n,
          onSelect () {
            let dateNow = this.getDate()
            self.$set('endDate', dateNow)
          }
        })
        this.$set('pickerStart', pickerStart)
        this.$set('pickerEnd', pickerEnd)
        this.pickerStart.setDate(this.startDate)
        this.pickerEnd.setDate(this.endDate)
      },
      destroyPickers () {
        this.$set('startDate', '')
        this.$set('endDate', '')
        if (this.pickerStart) {
          this.pickerStart.setDate(false)
          this.pickerStart.setMaxDate(new Date())
          this.pickerStart.setStartRange(false)
          this.pickerStart.setEndRange(false)
        }
        if (this.pickerEnd) {
          this.pickerEnd.setDate(false)
          this.pickerEnd.setMaxDate(new Date())
          this.pickerEnd.setStartRange(false)
          this.pickerEnd.setEndRange(false)
        }
      },
      updateStartDate () {
        this.pickerStart.setStartRange(this.startDate)
        this.pickerEnd.setStartRange(this.startDate)
        this.pickerEnd.setMinDate(this.startDate)
      },
      updateEndDate () {
        this.pickerStart.setEndRange(this.endDate)
        this.pickerStart.setMaxDate(this.endDate)
        this.pickerEnd.setEndRange(this.endDate)
      },
      setDateInterval () {
        let currentQuery = this.$route.query
        if (currentQuery['d']) {
          this.$dispatch('removeFromActiveFilters', 'd' + currentQuery['d'])
          currentQuery['d'] = undefined
        }
        if (!currentQuery['sd']) {
          currentQuery['sd'] = moment(this.startDate).format(this.apiDateFormat)
          currentQuery['ed'] = this.endDate ? moment(this.endDate).format(this.apiDateFormat) : moment().format(this.apiDateFormat)
          this.$router.go({
            name: 'search',
            query: currentQuery
          })
        } else {
          let dateChanged = false
          let sd = moment(currentQuery['sd'])
          let modelSd = this.startDate ? moment(this.startDate) : null
          let ed = moment(currentQuery['ed'])
          let modelEd = this.endDate ? moment(this.endDate) : null
          if (modelSd && modelSd !== sd) {
            currentQuery['sd'] = moment(this.startDate).format(this.apiDateFormat)
            this.$set('startDate', moment(this.startDate).toDate())
            dateChanged = true
          } else {
            this.$set('startDate', sd.toDate())
          }
          if (modelEd && modelEd !== ed) {
            currentQuery['ed'] = moment(this.endDate).format(this.apiDateFormat)
            this.$set('endDate', moment(this.endDate).toDate())
            dateChanged = true
          } else {
            this.$set('endDate', ed.toDate())
          }
          this.pickerStart.setDate(this.startDate)
          this.pickerEnd.setDate(this.endDate)
          if (dateChanged) {
            this.$router.go({
              name: 'search',
              query: currentQuery
            })
          }
        }
        this.$root.$broadcast('setRange', {
          sd: moment(currentQuery['sd']).format(this.displayDateFormat),
          ed: moment(currentQuery['ed']).format(this.displayDateFormat)
        })
        this.$dispatch('closeModal')
      }
    },
    events: {
      'routeChange' (newRoute) {
        setTimeout(() => {
          if (newRoute.to.query['sd'] && !newRoute.to.query['d']) {
            this.setDateInterval()
          } else {
            this.destroyPickers()
          }
        }, 100)
        return true
      }
    },
    watch: {
      'startDate' (val, oldVal) {
        if (val && val !== oldVal) {
          this.updateStartDate()
        }
      },
      'endDate' (val, oldVal) {
        if (val && val !== oldVal) {
          this.updateEndDate()
        }
      }
    },
    ready () {
      this.destroyPickers()
      this.createPickers()
    }
  }
</script>

<style lang="scss">
  @import "../../node_modules/pikaday/css/pikaday";

  .pika-lendar th {
    background-color: transparent !important;
  }

  .modal-input-container {
    padding: 10px 0;
    display: flex;
    align-items: center;
    .modal-input-label {
      display: block;
      margin-right: 10px;
      color: #222;
      &:last-of-type {
        margin-left: 10px;
      }
    }
  }

  .modal-input-controls {
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
    .modal-input-submit {
      padding: 5px 15px;
      border-radius: 2px;
      cursor: pointer;
      background-color: #eee;
      border: 1px solid #aaa;
      &:hover {
        background-color: #ddd;
      }
    }
  }
</style>