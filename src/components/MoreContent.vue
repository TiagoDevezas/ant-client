<template>
  <div>
    <div class="icon-container shrink no-bottom-padding" @click="toggleAccordion">
      <i class="material-icons">{{{ toggleIcon }}}</i>
    </div>
    <div class="flex align-center more-c">
      <div class="no-bottom-padding">
        <span class="more-content-divider"></span>
      </div>
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

<style scoped>
  .no-bottom-padding {
    padding: 0px !important;
  }
  .more-c {
    margin-bottom: 10px;
    /*margin-top: -10px;*/
  }
  .more-content-divider {
    display: block;
    border-top: 1px solid #e8e8e8;
    margin-left: 10px;
  }
  .align-center {
    align-items: center;
  }
  .icon-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: flex-end;
    margin-top: -20px;
  }
  .material-icons:hover {
    background-color: rgba(241, 241, 241, 0.7);
  }
</style>
