<template>
  <div class="picker-container">
    {{ startDate}}
    <span class="picker-label">De:</span><input type="text" id="start-date">
    <span class="picker-label">Até:</span><input type="text" id="end-date">
  </div>
</template>

<script>
  import moment from 'moment'
  import Pikaday from 'pikaday'

  export default {
    data () {
      return {
        startDate: '',
        endDate: '',
        pickerStart: '',
        pickerEnd: ''
      }
    },
    methods: {
      updateStartDate () {
        this.pickerEnd.setMinDate(this.startDate)
      },
      updateEndDate () {
        this.pickerStart.setMaxDate(this.endDate)
      }
    },
    ready () {
      let self = this
      let pickerStart = new Pikaday({
        field: document.getElementById('start-date'),
        maxDate: new Date(),
        onSelect () {
          let dateNow = this.getDate()
          self.$set('startDate', dateNow)
          self.updateStartDate()
        }
      })
      let pickerEnd = new Pikaday({
        field: document.getElementById('end-date'),
        maxDate: new Date(),
        onSelect () {
          let dateNow = this.getDate()
          self.$set('endDate', dateNow)
          self.updateEndDate()
        }
      })
      this.$set('pickerStart', pickerStart)
      this.$set('pickerEnd', pickerEnd)
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
</style>