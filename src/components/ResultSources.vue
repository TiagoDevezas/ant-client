<template>
  <div class="full">
    <span v-if="!isToggled" class="result-sources">
      {{{ sources.join(', ') | highlightQuery $route.query.q | truncateSources }}}
    </span>
    <span v-if="isToggled" class="result-sources">
      {{{ sources.join(', ') | highlightQuery $route.query.q }}}
    </span>
  </div>
</template>

<script>
  import { highlightQuery, truncateSources } from '../filters'

  export default {
    filters: { highlightQuery, truncateSources },
    props: ['sources', 'isToggled']
  }
</script>

<style>
	.result-sources {
		font-size: 13px;
		line-height: 1.15;
		color: #666;
		display: block;
    padding-top: 5px;
	}
</style>