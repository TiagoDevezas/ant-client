<template>
  <div class="icon-container shrink no-bottom-padding" @click="toggleAccordion">
    <i class="material-icons">{{{ toggleIcon }}}</i>
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

<style scoped>
  .no-bottom-padding {
    padding: 0px !important;
  }
  .align-center {
    align-items: center;
  }
  .icon-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: flex-end;
    margin-top: -10px;
    margin-left: 10px;
  }
  .icon-container:hover {
    background-color: rgba(241, 241, 241, 0.7);
  }
  .material-icons:hover {
    
  }
</style>
