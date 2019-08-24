<template>
  <div id="app">
    <Navbar/>
    <div id="main">
      <!-- <h1>Current Route Name: {{ $route.name }}</h1> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
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
  /* color: #2c3e50; */
  /* display: flex; */
}
#main {
  margin: 56px 0 0;
  padding: 10px;
  max-height: calc(100vh - 61px);
  height: calc(100vh - 61px);
}
.page-item.active .page-link {
  background-color: #41b883 !important;
  border-color: #41b883 !important;
  color: white !important;
}
.page-link {
  color: #41b883 !important;
}
.page-item.disabled .page-link {
  color: #6c757d !important;
}
</style>
