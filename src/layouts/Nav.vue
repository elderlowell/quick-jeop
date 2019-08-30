<template>
  <div>
    <Navbar />
    <transition>
      <div style="margin-top: 65px; height: calc(100% - 65px); padding: 10px">
        <router-view :key="this.$store.state.refresh" />
      </div>
    </transition>
  </div>
</template>

<script scoped>
  import Navbar from '@/components/Navbar'

  export default {
    name: 'Nav',
    components: {
      Navbar
    }
  }
</script>

<style scoped>

</style>
