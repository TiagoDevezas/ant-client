<template>
  <div class="range-slider-container">
    <div id="range-slider"></div>
  </div>
  <div class="modal-input-container">
    <span class="modal-input-label">Entre </span><input type="text" v-model="minCredits" @change="minCreditsChanged">
    <span class="modal-input-label">e </span><input type="text" v-model="maxCredits" @change="maxCreditsChanged">
  </div>
  <div class="modal-error-message" v-if="errorMessage">
    <span class="error-message">Erro</span>
  </div>
  <div class="range-values">
  Entre <strong>{{ minCredits }}</strong> e <strong>{{ maxCredits }}</strong> créditos.
  </div>
  <div class="modal-input-controls">
    <span class="modal-input-submit" @click="setCreditRange">Ir</span>
  </div>
</template>

<script>
import noUiSlider from 'nouislider'

export default {
  data () {
    return {
      minCredits: 0,
      maxCredits: 240,
      creditSlider: '',
      errorMessage: ''
    }
  },
  methods: {
    minCreditsChanged () {
      let commaReplaced = parseFloat(this.minCredits.replace(',', '.'))
      if (commaReplaced >= 0) {
        this.creditSlider.noUiSlider.set([commaReplaced, this.maxCredits])
      } else {
        this.$set('minCredits', 0)
        this.creditSlider.noUiSlider.set([this.minCredits, this.maxCredits])
      }
    },
    maxCreditsChanged () {
      let commaReplaced = parseFloat(this.maxCredits.replace(',', '.'))
      if (commaReplaced <= 240) {
        this.creditSlider.noUiSlider.set([this.minCredits, commaReplaced])
      } else {
        this.$set('maxCredits', 240)
        this.creditSlider.noUiSlider.set([this.minCredits, this.maxCredits])
      }
    },
    createSlider () {
      let slider = document.getElementById('range-slider')
      noUiSlider.create(slider, {
        start: [this.minCredits, this.maxCredits],
        step: 0.5,
        behaviour: 'drag',
        connect: true,
        range: {
          'min': [this.minCredits],
          '33%': [10, 1],
          '66%': [30, 5],
          'max': [this.maxCredits]
        },
        format: {
          to: (val) => {
            return Math.round(val * 1e1) / 1e1
          },
          from: (val) => {
            return Math.round(val * 1e1) / 1e1
          }
        }
      })
      slider.noUiSlider.on('update', (values) => {
        this.$set('minCredits', values[0])
        this.$set('maxCredits', values[1])
      })
      this.$set('creditSlider', slider)
    },
    setCreditRange () {
      let currentQuery = this.$route.query
      currentQuery['cr'] = this.minCredits + '-' + this.maxCredits
      this.$router.go({
        name: 'search',
        query: currentQuery
      })
      this.$root.$broadcast('setRange', {
        min_credits: this.minCredits,
        max_credits: this.maxCredits
      })
      this.$dispatch('closeModal')
    },
    resetSlider () {
      this.$set('minCredits', 0)
      this.$set('maxCredits', 240)
      this.creditSlider.noUiSlider.set([this.minCredits, this.maxCredits])
    }
  },
  events: {
    'routeChange' (newRoute) {
      setTimeout(() => {
        if (newRoute.to.query['cr']) {
          this.setCreditRange()
        } else {
          this.resetSlider()
        }
      }, 100)
      return true
    }
  },
  ready () {
    this.createSlider()
  }
}
</script>

<style lang="scss">
  @import "../../node_modules/nouislider/distribute/nouislider.min";

  .noUi-connect {
    background-color: #387ff5 !important;
  }

  .range-slider-container {
    padding: 20px;
  }

  .range-values {
    text-align: center;
  }
</style>