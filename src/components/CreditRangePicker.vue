<template>
  <div class="modal-input-container">
    <span class="modal-input-label">De {{ minCredits }}:</span>
    <input type="range" min="0" :max="maxCredits" value="1" v-model="minCredits">
    <span class="modal-input-label">Até {{ maxCredits }}:</span>
    <input type="range" :min="minCredits" max="10" value="1" v-model="maxCredits">
  </div>
  <div class="modal-input-controls">
    <span class="modal-input-submit">Ir</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultValue: 1,
      minCredits: 1,
      maxCredits: 10
    }
  }
}
</script>