<template>
  <div class="fixed-top border-bottom">
    <b-navbar toggleable="md" type="light" variant="white" class="container">
      <b-navbar-brand>
        <img alt="Vue logo" src="../assets/logo.png" height="30" width="30">
        <span class="ml-2">Vue Starter</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-for="link in menuLinks" v-bind:key="link.name">
            <router-link :to="{ name: link.url, params: {} }">{{ link.name }}</router-link>
          </b-nav-item>
          <b-nav-item>
            <span>Logout</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuLinks: [
        {name: 'Dashboard',url: 'dashboard'},
        {name: 'Route',url: 'route'},
        {name: 'Profile',url: 'profile'},
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    text-decoration: none;
    color: rgba(0,0,0,.9) !important;
  }
  a:hover {
    text-decoration: none;
    color: #41b883 !important;
  }
  .active {
    color: #41b883 !important;
    font-weight: bold;
  }
</style>
