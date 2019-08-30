<template>
  <div id="app" class="bg-white">
    <div id="main" class="bg-white">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#main {
  max-height: 100%;
  height: 100vh - 65px;
}
</style>
