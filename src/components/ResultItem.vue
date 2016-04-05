<template>
<div class="result">
  <div class="result-body">
    <div class="result-title">
      <div class="tag tag-{{ metadata.type.label | lowercase }}">{{ metadata.type.label }}</div>
      <h2><a href="{{ metadata.link }}" @click="sendClickData(metadata.link)" target="_blank">{{ metadata.description }}</a></h2>
    </div>
    <div class="result-link">
<!--       <span class="result-icon">
        <a href="{{ metadata.link }}">
          <img src="../assets/up.png" alt="UP Logo" width="16" height="16" class="result-icon-img">
        </a>
      </span> -->
      <span class="result-url">{{ metadata.link }}</span>
    </div>
    <div class="result-snippet">
      <p v-for="attr in defaultAttributes">
        <span v-if="attr.value !== metadata.description"><strong>{{ attr.label }}:</strong> {{ attr.value }}</span>
      </p>
    </div>
  </div>
  <div class="result-more-data" :class="{ 'toggle': toggled }">
    <p v-for="attr in extraAttributes">
      <span v-if="attr.value !== metadata.description"><strong>{{ attr.label }}:</strong> {{{ attr.value }}}</span>
    </p>
    <div class="result-l2-attributes">
      <div class="l2-attribute" v-for="attrs in levelTwoAttributes">
        <p v-for="attr in attrs">
          <span v-if="attr.value !== metadata.description"><strong>{{ attr.label }}:</strong> {{ attr.value }}</span>
        </p>
      </div>
    </div>
  </div>
  <div class="result-more" @click="toggleAccordion" v-if="extraAttributes.length">
    <div class="more-icon">
      <i class="material-icons">{{ toggleIcon }}</i>
    </div>
    <div class="more-text">{{ toggleText }}</div>
  </div>
</div>
</template>

<script>
export default {
  props: ['metadata', 'category'],
  data () {
    return {
      defaultAttributes: [],
      extraAttributes: [],
      levelTwoAttributes: [],
      toggled: false,
      clicked: false
    }
  },
  methods: {
    toggleAccordion () {
      this.toggled = !this.toggled
      this.sendClickData()
    },
    sendClickData () {
      const values = {
        active_query: this.$route.query.q.toString(),
        active_query_category: this.category.toString(),
        active_results_page: this.$route.query.start ? (this.$route.query.start / 10 + 1).toString() : '1',
        clicked_result_rank: this.metadata.rank.toString(),
        clicked_result_score: this.metadata.score.toString(),
        clicked_result_uri: this.metadata.uri.toString(),
        client_user_agent: window.navigator.userAgent.toString(),
        client_resolution: (window.screen.width + 'x' + window.screen.height).toString(),
        is_test: 'true'
      }
      if (!this.clicked && arguments.length === 0) {
        // console.log(values)
        this.$http.post('http://ant.fe.up.pt/log/event/click', values, {emulateJSON: true})
        this.clicked = true
      }
      if (arguments.length > 0 && arguments[0]) {
        values['target_url'] = arguments[0]
        this.$http.post('http://ant.fe.up.pt/log/event/click', values, {emulateJSON: true})
        // console.log(values)
      }

    }
  },
  computed: {
    toggleText () {
      return !this.toggled ? 'Ver mais' : 'Ver menos'
    },
    toggleIcon () {
      return !this.toggled ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
    }
  },
  ready () {
    this.$set('defaultAttributes', this.metadata.metadata.decorations.attributes.slice(0, 3))
    this.$set('extraAttributes', this.metadata.metadata.decorations.attributes.slice(4))
    this.$set('levelTwoAttributes', this.metadata.metadata.decorations.levelTwoAttributes)
    // this.metadata.metadata.decorations.attributes.forEach(obj => {
    //   // console.log(obj.label)
    // })
  }
}
</script>

<style>
.result {
  box-sizing: border-box;
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-tap-highlight-color: transparent;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0.3em;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
  position: relative;
  word-wrap: break-word;
  box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
  background-color: #fff;
  /*cursor: pointer;*/
}
/*.result:hover {
  background-color: #f7f7f7;
}*/
.result-title {
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  /*margin-bottom: 0.2em;*/
  max-width: 100%;
}
.result-title h2 {
  display: inline-block;
  font-size: 1.38em;
  font-weight: normal;
  vertical-align: middle;
  color: #333;
  line-height: 1.3em;
  margin: 0;
  /*padding-left: 10px;*/
}

.result-title h2 a {
  text-decoration: none;
  color: #333;
}

.result-title h2 a:hover {
  text-decoration: underline;
}

.result-snippet, .result-more-data {
  font-size: 0.85em;
  color: #666;
  line-height: 1.38;
  margin: 0 0 0.1em;
}
.result-icon {
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  margin-top: -3px;
  width: 16px;
  margin-right: 0.3em;
}
.result-icon-img {
  vertical-align: middle;
  max-width: 16px;
  margin-top: 0;
}
.result-url {
  color: #555;
  font-size: 0.8em;
}
.result-more-data {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}
.result-more-data p:first-of-type {
  margin-top: 0;
}
.result-more-data.toggle {
  max-height: 9999px;
}
.result-more {
  border-top: 1px solid #ebebeb;
  cursor: pointer;
  height: 0px;
  margin-bottom: -0.5em;
  overflow: hidden;
  padding: 15px 0;
  text-align: center;
  position: relative;
  clear: both;
  display: block;
}
.l2-attribute {
  background-color: #F4F4F4;
  padding: 1em;
  border-radius: 3px;
  margin-bottom: 1em;
  border: 1px solid #F1F1F1;
}
.l2-attribute p:last-of-type {
  margin-bottom: 0;
}
.more-icon {
  margin-left: 0;
  height: 6px;
  width: 24px;
  margin-right: auto;
  position: relative;
  top: -12px;
  color: #777;
}
.more-text {
  top: 4.5px;
  left: 20px;
  right: 0;
  text-align: left;
  color: #777;
  font-size: 0.8em;
  margin: 0 15px;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tag {
  background: #69707a;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  color: #f5f7fa;
  display: inline-block;
  font-size: .7em;
  line-height: 1.2em;
  padding: 4px 10px;
  white-space: nowrap;
  top: 0;
  font-weight: bold;
  float: right;
}
.tag-sala {
  background: #222324;
  color: white;
}
.tag-estudante {
  background: #1fc8db;
  color: white;
}
.tag-funcionário {
  background: #97cd76;
  color: white;
}
</style>