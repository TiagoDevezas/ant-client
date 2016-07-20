<template>
  <span :class="['status-indicator', setStatus, setMargin]" v-if="status || checkState" title="{{ elTitle }}"></span>
</template>

<script>
  export default {
    props: ['status', 'state', 'setMargin'],
    data () {
      return {
        elTitle: ''
      }
    },
    computed: {
      checkState () {
        if (this.state !== undefined) {
          return true
        }
      },
      setStatus () {
        let stateString = this.state !== undefined ? this.state.toString() : undefined
        if (this.status) {
          this.$set('elTitle', this.status)
          if (this.status === 'Ativo') {
            return 'active'
          }
          if (this.status === 'Reformado') {
            return 'retired'
          }
          return 'inactive'
        }
        if (stateString.length) {
          if (stateString === 'true') {
            this.$set('elTitle', 'Ativo')
            return 'active'
          }
          this.$set('elTitle', 'Não Ativo')
          return 'inactive'
        }
      }
    }
  }
</script>

<style lang="scss">
  .status-indicator {
    height: 10px;
    width: 10px;
    border-radius: 5px;
    display: inline-flex;
    &.inactive {
      background-color: #E7676F;
    }
    &.active {
      background-color: #95BE34;
    }
    &.retired {
      background-color: #BFBFBF;
    }
    &.right {
      margin-right: 5px;
    }
    &.left {
      margin-left: 5px;
    }
  }
</style>