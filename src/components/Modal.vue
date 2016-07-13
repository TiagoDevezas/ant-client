<template>
  <div :class="['modal-container', { 'is-active': show}]">
    
    <div class="modal-overlay" @click="close()"></div>
    
    <div class="modal-content">
      
      <div class="modal-header">
        <div class="modal-title">{{ title }}</div>
        <div class="modal-close" @click="close()"><i class="material-icons">close</i></div>
      </div>

      <div class="modal-body">
        <slot name="modal-body">
        </slot>
      </div>

      <div class="modal-footer">
        <slot name="modal-footer">
        </slot>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: [String],
        default: ''
      },
      show: {
        require: true,
        type: Boolean,
        twoWay: true
      }
    },
    methods: {
      close () {
        // this.$root.$broadcast('modalClosed')
        this.show = false
      }
    },
    events: {
      'closeModal' () {
        this.close()
      }
    },
    ready () {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.close()
        }
      })
    }
  }
</script>

<style lang="scss">
  .modal-container {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    font-size: 14px;
    .modal-overlay {
      background: rgba(255, 255, 255, .75);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1500;
    }
    .modal-content {
      z-index: 2000;
      background-color: #fff;
      border: 1px solid #c5c5c5;
      box-shadow: 0 4px 16px rgba(0, 0, 0, .2);    
      padding: 10px 15px;
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .modal-title {
        font-weight: bold;
      }
      .modal-close {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 25px;
        > i.material-icons {
          font-size: 18px;
        }
      }
      .modal-footer {
      }
    }
  }

  .is-active {
    display: flex;
  }
</style>