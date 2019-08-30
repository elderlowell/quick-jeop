<template>
  <div class="d-flex flex-column align-items-center">
    <div class="text-center w-100" style="max-width: 500px">
      <h1 class="mb-5" style="text-transform: capitalize">{{ $route.name }}</h1>
      <h3 class="mb-5">How many trivia questions<br>can you answer correctly<br>in a row?</h3>
      <div class="mb-5">
        <b-button @click="goToClue()" block variant="outline-dark">
          <span class="h5">Start</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapActions(['getClue']),
    goToClue () {
      this.getClue()
      setTimeout(() => {
        this.validateClue()
      }, 200)
    },
    validateClue () {
      if (!this.$store.state.clue.question || !this.$store.state.clue.answer || this.$store.state.clue.invalid_count) {
        this.goToClue()
      } else {
        this.$router.push({ name: 'Game' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
