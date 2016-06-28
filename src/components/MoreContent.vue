<template>
<div class="flex align-center more-c">
  <div class="no-bottom-padding">
    <span class="more-content-divider"></span>
  </div>
  <div class="icon-container shrink no-bottom-padding" @click="toggleAccordion">
    <i class="material-icons">{{{ toggleIcon }}}</i>
  </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        isToggled: false
      }
    },
    methods: {
      toggleAccordion () {
        this.isToggled = !this.isToggled
        this.$dispatch('isToggled', this.isToggled)
      }
    },
    computed: {
      toggleIcon () {
        return !this.isToggled ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
      }
    }
  }
</script>

<style>
  .more-c {
    margin-top: -10px;
  }
  .more-content-divider {
    display: block;
    border-top: 1px solid #e8e8e8;
  }
  .align-center {
    align-items: center;
  }
  .icon-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
</style>