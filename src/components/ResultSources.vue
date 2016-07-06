<template>
  <div class="full result-sources">
    <span v-if="metadata.type.label === 'Sala' && metadata.document.description">
      {{{ metadata.document.description + ', ' }}}
    </span>
    <span v-if="!isToggled">
      {{{ metadata.sources.join(', ') | highlightQuery $route.query.q | truncateSources }}}
    </span>
    <span v-if="isToggled">
      {{{ metadata.sources.join(', ') | highlightQuery $route.query.q }}}
    </span>
    <span v-if="metadata.type.label === 'Notícia' && metadata.date">
      {{{ ' - ' + metadata.date.split(', ')[1] + ' às ' +  metadata.date.split(', ')[2] }}}
    </span>
  </div>
</template>

<script>
  import { highlightQuery, truncateSources } from '../filters'

  export default {
    filters: { highlightQuery, truncateSources },
    props: ['metadata', 'isToggled', 'entityType']
  }
</script>

<style>
	.result-sources {
		font-size: 13px;
		line-height: 1.15;
		color: #666;
    padding-top: 5px;
	}
</style>