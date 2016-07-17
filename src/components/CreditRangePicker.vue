<template>
  <div class="range-slider-container">
    <div id="range-slider"></div>
  </div>
  <div class="modal-input-container">
    <span class="modal-input-label">Entre </span><input type="text" v-model="startCredits" @change="minCreditsChanged">
    <span class="modal-input-label">e </span><input type="text" v-model="endCredits" @change="maxCreditsChanged">
  </div>
  <div class="range-values">
  Entre <strong>{{ startCredits }}</strong> e <strong>{{ endCredits }}</strong> créditos.
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
      startCredits: '',
      endCredits: ''
    }
  },
  methods: {
    minCreditsChanged () {
      let commaReplaced = parseFloat(this.startCredits.replace(',', '.'))
      if (commaReplaced >= this.minCredits) {
        this.creditSlider.noUiSlider.set([commaReplaced, this.endCredits])
      } else {
        this.creditSlider.noUiSlider.set([this.minCredits, this.endCredits])
      }
    },
    maxCreditsChanged () {
      let commaReplaced = parseFloat(this.endCredits.replace(',', '.'))
      if (commaReplaced <= this.maxCredits) {
        this.creditSlider.noUiSlider.set([this.startCredits, commaReplaced])
      } else {
        this.creditSlider.noUiSlider.set([this.startCredits, this.maxCredits])
      }
    },
    createSlider () {
      let slider = document.getElementById('range-slider')
      let urlRange = this.$route.query['cr'] && this.$route.query['cr'].split('-') ? this.$route.query['cr'].split('-') : null
      let sCreds = urlRange && urlRange[0] ? +urlRange[0] : this.minCredits
      let eCreds = urlRange && urlRange[1] ? +urlRange[1] : this.maxCredits
      noUiSlider.create(slider, {
        start: [sCreds, eCreds],
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
        this.$set('startCredits', values[0])
        this.$set('endCredits', values[1])
      })
      this.$set('creditSlider', slider)
    },
    setCreditRange () {
      let currentQuery = this.$route.query
      currentQuery['cr'] = this.startCredits + '-' + this.endCredits
      this.$router.go({
        name: 'search',
        query: currentQuery
      })
      this.$root.$broadcast('setRange', {
        min_credits: this.startCredits,
        max_credits: this.endCredits
      })
      this.$dispatch('closeModal')
    },
    resetSlider () {
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