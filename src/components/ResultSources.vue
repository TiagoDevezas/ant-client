<template>
  <div class="full">
    <span class="result-sources">{{ sources.join(', ') }}</span>
  </div>
</template>

<script>
  export default {
    props: ['sources']
  }
</script>

<style>
	.result-sources {
		font-size: 13px;
		line-height: 1.15;
		color: #666;
		display: block;
	}
</style>