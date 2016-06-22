<template>
	<div id="main">
	  <router-view></router-view>
	</div>
</template>

<script>
export default {
  data () {
    return {
      environment: process.env.NODE_ENV
    }
  },
  ready () {
    if (this.environment !== 'development') {
      const script = document.createElement('script')
      script.text = '(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){' +
                    '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),' +
                    'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' +
                    '})(window,document,"script","//www.google-analytics.com/analytics.js","ga");' +
                    'ga("create", "UA-70631125-1", "auto");' +
                    'ga("send", "pageview");'
      document.querySelector('body').appendChild(script)
    }
    const openSearchXML = require('../assets/opensearch.xml')

    const openSearchLink = document.createElement('link')
    openSearchLink.href = openSearchXML
    openSearchLink.rel = 'search'
    openSearchLink.title = 'ANT'
    openSearchLink.type = 'application/opensearchdescription+xml'
    document.head.appendChild(openSearchLink)
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
@import "../../node_modules/bulma/bulma";

html {
  height: 100%;
}
body {
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 100%;
  background-color: #fff;
  padding: 0;
  border: 0;
  margin: 0;
  vertical-align: baseline;
  height: 100%;
}
#main {
  min-height: 100%;
  position: relative;
}
</style>
