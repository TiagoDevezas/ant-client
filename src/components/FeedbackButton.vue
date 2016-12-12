<template>
  <div id="feedback-button">  
    <div id="feedback-text">
      <span @click="feedBackButtonClicked = !feedBackButtonClicked">Feedback</span>
    </div>
    <div id="feedback-thumbs" v-show="feedBackButtonClicked" :class="{ 'animated slideInDown': feedBackButtonClicked }">
      <i class="material-icons" @click="feedbackModalPositive = !feedbackModalPositive">thumb_up</i>
      <i class="material-icons" @click="feedbackModalNegative = !feedbackModalNegative">thumb_down</i>
    </div>

    <modal title="Enviar comentário para a pesquisa:" :show.sync="feedbackModalPositive">
      <div slot="modal-body" class="feedback-modal-body">
      <p>"{{ $route.query.q }}"</p>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeIYO_B0waWuMGoGZj7SXR71VkTE0lsMU1bDYSdy2tqsVDRKA/viewform?embedded=true" width="500" height="550" frameborder="0" marginheight="0" marginwidth="0">A carregar...</iframe>
      </div>
    </modal>

    <modal title="Enviar comentário para a pesquisa:" :show.sync="feedbackModalNegative">
      <div slot="modal-body" class="feedback-modal-body">
      <p>"{{ $route.query.q }}"</p>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdheWt3zQkXoAn1E-5i4PgiwR62DQPyFqBRMNJbm12as-6oHQ/viewform?embedded=true" width="500" height="550" frameborder="0" marginheight="0" marginwidth="0">A carregar...</iframe>
      </div>
    </modal>
  </div>
  
</template>

<script>
  import Modal from './Modal'
  export default {
    components: { Modal },
    data () {
      return {
        feedBackButtonClicked: false,
        feedbackModalPositive: false,
        feedbackModalNegative: false
      }
    }
  }
</script>

<style lang="scss">
  #feedback-button {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #f0f0f0;
    font-size: 14px;
    border-radius: 5px;
    padding: 2.5px 10px;
    color: #777777;
    transition: top 220ms ease-in-out;
    span {
      cursor: pointer;
      &:hover {
        color: #444444;
      }
    }
  }

  #feedback-thumbs {
    display: flex;
    justify-content: space-around;
    .material-icons {
      cursor: pointer;
      &:hover {
        color: #444444;
      }
    }
  }

  .feedback-modal-body {
    font-weight: bold;
  }

  .show {
    top: 0 !important;
  }

  .slide-out {
    top: 45px !important;
  }

  .animated {
    animation-duration: .5s;
    animation-fill-mode: both;
  }

  @keyframes slideInDown {
    from {
      transform: translate3d(0, -35%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInDown {
    animation-name: slideInDown;
  }
</style>