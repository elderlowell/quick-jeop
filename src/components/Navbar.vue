<template>
  <div class="fixed-top shadow bg-white">
    <b-navbar toggleable="md" type="light" variant="white" class="container">
      <b-navbar-brand @click="$router.push({ name: 'Home' })" style="cursor: pointer">
        <img alt="Buzzer" src="../assets/logo.png" height="30" width="30" class="mb-1">
        <span class="ml-2">Quick Jeop</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" v-if="this.$store.state.user"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav v-if="this.$store.state.user">
        <b-navbar-nav class="ml-auto text-right">
          <b-nav-item>
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'Profile' }">Profile</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'Login' }">Logout</router-link>
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

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    text-decoration: none;
    color: black !important;
  }
  a:hover {
    text-decoration: none;
    color: #ffd600 !important;
  }
  .active {
    color: #ffd600 !important;
    font-weight: bold;
  }
</style>
