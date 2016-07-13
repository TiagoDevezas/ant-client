<template>
  <div class="picker-container">
    <span class="picker-label">De:</span><input type="text" id="start-date">
    <span class="picker-label">Até:</span><input type="text" id="end-date">
  </div>
  <div class="picker-controls">
    <span class="picker-submit" @click="setDateInterval">Ir</span>
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
        dateFormat: 'YYYYMMDD'
      }
    },
    methods: {
      createPickers () {
        let self = this
        let pickerStart = new Pikaday({
          field: document.getElementById('start-date'),
          maxDate: new Date(),
          i18n: self.i18n,
          onSelect () {
            let dateNow = this.getDate()
            self.$set('startDate', dateNow)
          }
        })
        let pickerEnd = new Pikaday({
          field: document.getElementById('end-date'),
          maxDate: new Date(),
          i18n: self.i18n,
          onSelect () {
            let dateNow = this.getDate()
            self.$set('endDate', dateNow)
          }
        })
        this.$set('pickerStart', pickerStart)
        this.$set('pickerEnd', pickerEnd)
      },
      destroyPickers () {
        if (this.pickerStart) {
          this.pickerStart.setDate(false)
          this.pickerStart.destroy()
          this.$set('pickerStart', '')
        }
        if (this.pickerEnd) {
          this.pickerEnd.setDate(false)
          this.pickerEnd.destroy()
          this.$set('pickerEnd', '')
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
        this.destroyPickers()
        this.createPickers()
        currentQuery['sd'] = moment(this.startDate).format(this.dateFormat)
        currentQuery['ed'] = moment(this.endDate).format(this.dateFormat)
        if (currentQuery['d']) {
          currentQuery['d'] = undefined
        }
        this.$router.go({
          name: 'search',
          query: currentQuery
        })
        this.$root.$broadcast('setDateRange', {sd: currentQuery['sd'], ed: currentQuery['ed']})
        this.$dispatch('closeModal')
      }
    },
    events: {
      'modalClosed' () {
        console.log('modalClosed')
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

  .picker-container {
    padding: 10px 0;
    display: flex;
    align-items: center;
    .picker-label {
      display: block;
      margin-right: 10px;
      color: #222;
      &:last-of-type {
        margin-left: 10px;
      }
    }
  }

  .picker-controls {
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
    .picker-submit {
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