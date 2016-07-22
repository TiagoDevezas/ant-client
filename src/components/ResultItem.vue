<template>
<div class="result">
  <result-wrapper :metadata="metadata" :entity-type="selectedEntityType" :category="category">
  </result-wrapper>
</div>
</template>

<script>
import { cleanMarkup, highlightQuery, truncateText, stripTags, isSearchable, iconify, truncateSources } from '../filters'

import ResultWrapper from './ResultWrapper'

export default {
  filters: { cleanMarkup, highlightQuery, truncateText, stripTags, isSearchable, iconify, truncateSources },
  props: ['metadata', 'category'],
  data () {
    return {
      selectedEntityType: this.metadata.type.label
    }
  },
  components: {
    ResultWrapper
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
  padding-bottom: 0;
  margin-bottom: 0;
  position: relative;
  word-wrap: break-word;
  z-index: 1000;
  /*box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);*/
  background-color: #fff;
  /*cursor: pointer;*/
}

.result-more-data {
  font-size: 0.85em;
  color: #666;
  line-height: 1.38;
  margin: 0 0 0.1em;
}

.result-more-data a {
  text-decoration: none;
}

.result-more-data a:hover {
  text-decoration: underline;
}

.result p {
  margin: 2px 0;
  max-width: 650px;
  font-size: 13px;
}

.result-more-data {
  max-height: 0;
  overflow: hidden;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.result-more-data p:first-of-type {
  margin-top: 0;
}
.result-more-data.toggle {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0); 
  transition-delay: 0s;
}

.invisible {
  display: none;
}

.visible {
  display: block;
}

.attr-label {
  color: #222;
  font-size: 13px;
  font-weight: bold;
}

mark {
  background: transparent;
  font-weight: bolder;
  color: inherit;
}

</style>