import Mark from 'mark.js'
let markInstance

export default {
  bind: function () {
    // do preparation work
    // e.g. add event listeners or expensive stuff
    // that needs to be run only once
  },
  update: function (value) {
    this.vm.$nextTick(() => {
      markInstance = new Mark(this.el)
      markInstance.mark(value)
    })
    // do something based on the updated value
    // this will also be called for the initial value
  },
  unbind: function () {
    markInstance.unmark()
    // do clean up work
    // e.g. remove event listeners added in bind()
  }
}
