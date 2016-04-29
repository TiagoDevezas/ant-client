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
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);

html {
  height: 100%;
}
body {
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 100%;
  background-color: #f7f7f7;
  padding: 0;
  border: 0;
  margin: 0;
  vertical-align: baseline;
  height: 100%;
}
#main {
  height: 100%;
}
</style>
