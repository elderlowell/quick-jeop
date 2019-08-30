<template>
  <div class="d-flex flex-column align-items-center">
    <div class="text-center w-100" style="max-width: 500px">
      <h4 class="mb-3" style="text-transform: capitalize">Score: {{ $store.state.score }}</h4>
      <h4 class="mb-3" style="text-transform: capitalize">In a Row: {{ $store.state.count }}</h4>
    </div>
    <div class="d-flex" style="max-width: 500px">
      <div class="column-outer-gray">
        <div class="column-inner-blue">
          <div class="column-inner-yellow"></div>
        </div>
      </div>
      <div class="midsection-outer-black">
        <div class="midsection-outer-gray">
          <div class="midsection-inner-black">
            <div class="midsection-inner-blue">
              <div class="categoryTitle">
                {{ clue.category.title }}
              </div>
            </div>
          </div>
          <div class="midsection-inner-black">
            <div class="midsection-inner-blue" @click="viewClue()">
              <div class="valueText">
                ${{ clue.value || value }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column-outer-gray">
        <div class="column-inner-blue">
          <div class="column-inner-yellow"></div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4 h5" style="max-width: 350px">
      You can either skip the clue or view it. Once you view it, your answer counts towards your score.
    </div>
    <div class="text-center mt-4 h5">
      <b-button @click="refreshClue()" variant="outline-dark" class="p-3">
        <i class="fas fa-redo-alt"></i><div class="mt-2">Skip</div>
      </b-button>
    </div>
    <div class="modal" v-if="showClue">
      <div class="clue">
        <div class="clueText mb-4">
          {{ clue.question }}.
        </div>
        <div class="action">
          <b-button variant="outline-light" class="mr-2 shadow-lg" style="text-shadow: 3px 3px 3px black; font-size: 22px" @click="prepareResponse()">ANSWER</b-button>
          <b-button variant="outline-light" class="ml-2 shadow-lg" style="text-shadow: 3px 3px 3px black; font-size: 22px" @click="unknown()">I DON'T KNOW</b-button>
        </div>
      </div>
    </div>
    <div class="modal" v-if="respond">
      <div class="response">
        <div class="d-flex">
          <div class="miniClueText">
            {{ clue.question }}.
          </div>
          <div class="miniClueValue">
            ${{ clue.value || value }}
          </div>
        </div>
        <div class="d-flex w-100">
          <b-form-group label="Your answer:" label-class="" style="flex: 1" class="m-2">
            <b-form-textarea v-model="response" no-resize rows="2" class="w-100 rounded"></b-form-textarea>
            <small class="text-danger" v-if="!showResponse">Don't answer in the form of a question: just type the answer.</small>
          </b-form-group>
          <b-form-group label="The correct answer:" label-class="" style="flex: 1" class="m-2" v-if="showResponse">
            <b-form-textarea v-model="clue.answer" no-resize rows="2" class="w-100 rounded"></b-form-textarea>
          </b-form-group>
        </div>
        <div class="action" v-if="!showResponse">
          <b-button variant="outline-dark" class="mr-2 shadow-lg" style="font-size: 18px" @click="checkAnswer()">CONFIRM</b-button>
        </div>
        <div v-if="correct" class="d-flex mt-3 px-2 align-items-center w-100">
          <div class="text-success" style="font-size: 20px">Correct!</div>
          <b-button variant="outline-dark" class="ml-auto" style="font-size: 18px" @click="goAgain()">Keep Going</b-button>
        </div>
        <div v-if="incorrect" class="d-flex mt-3 px-2 align-items-center w-100">
          <div class="text-danger" style="font-size: 20px">Incorrect!</div>
          <div class="ml-auto">
            <b-button variant="outline-dark" style="font-size: 18px" @click="goHome()">Go Home</b-button>
            <b-button variant="outline-dark" class="ml-2" style="font-size: 18px" @click="restart()">Try Again</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import stringSimilarity from 'string-similarity'

export default {
  name: 'Game',
  data () {
    return {
      showClue: false,
      respond: false,
      response: '',
      showResponse: false,
      correct: false,
      incorrect: false,
      refresh: true
    }
  },
  methods: {
    ...mapMutations(['updateScore', 'updateCount']),
    viewClue () {
      this.showClue = true
    },
    prepareResponse () {
      this.showClue = false
      this.respond = true
    },
    unknown () {
      this.respond = true
      this.showResponse = true
      this.incorrect = true
      this.showClue = false
    },
    checkAnswer () {
      let solutions = this.checkForSpecialCharacters()
      let res = this.response.toLowerCase()
      let strength = 0
      solutions.forEach(possibility => {
        let temp = stringSimilarity.compareTwoStrings(res, possibility)
        // console.log(possibility, temp)
        if (temp > strength) { strength = temp }
      })
      this.showResponse = true
      if (strength > .8) {
        this.correct = true
        this.updateScore(this.clue.value ? this.$store.state.score + this.clue.value : this.$store.state.score + this.value)
        this.updateCount(this.$store.state.count + 1)
      } else {
        this.incorrect = true
      }
    },
    checkForSpecialCharacters () {
      let solutions = []
      let myClue = this.clue.answer.toLowerCase()
      solutions.push(myClue)
      this.removeLeadingArticles(myClue).forEach(clue => {
        solutions.push(clue)
      })
      solutions.forEach(clue => {
        let temp = []
        if (clue.search(/\//g) >= 0) {
          let spot = clue.search(/\//g)
          temp.push(clue.substring(0, spot))
          temp.push(clue.substring(spot + 1))
        } if (clue.search(/\(/g) > 0) {
          let spot = clue.search(/\(/g)
          temp.push(clue.substring(0, spot - 1))
          temp.push(clue.substring(spot + 1, clue.length - 1))
          temp.push(clue.replace('(', '').replace(')', ''))
        } if (clue.search(/\(/g) === 0) {
          let spot = clue.search(/\)/g)
          temp.push(clue.substring(1, spot))
          temp.push(clue.substring(spot + 2))
          temp.push(clue.replace('(', '').replace(')', ''))
        } if (clue.search(/&/g) >= 0) {
          let spot = clue.search(/&/g)
          if (this.response.substring(spot, spot + 3) === 'and') {
            temp.push(clue.replace('&', 'and'))
          }
        } if (this.response.search(/&/g) >= 0) {
          let spot = this.response.search(/&/g)
          if (clue.substring(spot, spot + 3) === 'and') {
            temp.push(clue.replace('and', '&'))
          }
        } if (clue.search(/\./g) >= 0) {
          if (this.response.search(/\./g) === -1) {
            temp.push(clue.replace(/\./gi, ''))
          }
        } if (clue.search(/\-/g) >= 0) {
          if (this.response.search(/\-/g) === -1) {
            temp.push(clue.replace(/\-/gi, ''))
          }
        }
        temp.forEach(pos => {
          solutions.push(pos)
        })
      })
      return solutions
    },
    removeLeadingArticles (phrase) {
      let temp = []
      if (phrase.substring(0, 2) === 'a ') { temp.push(phrase.substring(2).toLowerCase()) }
      if (phrase.substring(0, 3) === 'or ') { temp.push(phrase.substring(3).toLowerCase()) }
      if (phrase.search(/\(or /g) > 0) {
        temp.push(phrase.substring(0, phrase.search(/\(or /g)))
        temp.push(phrase.substring(phrase.search(/\(or /g) + 4, phrase.length - 1))
      }
      if (phrase.substring(0, 4) === 'the ') { temp.push(phrase.substring(4).toLowerCase()) }
      return temp
    },
    refreshClue () {
      this.$store.dispatch('getClue')
      if (!this.clue.question || !this.clue.answer || this.clue.invalid_count) {
        this.$store.dispatch('getClue')
      }
    },
    goAgain () {
      this.refreshClue()
      setTimeout(() => {
        this.$store.commit('updateRefresh', this.$store.state.refresh + 1)
      }, 200)
    },
    goHome () {
      this.updateScore(0)
      this.updateCount(0)
      this.$store.commit('updateRefresh', 0)
      this.$router.push({ name: 'Home' })
    },
    restart () {
      this.updateScore(0)
      this.updateCount(0)
      this.$store.commit('updateRefresh', 0)
      this.refreshClue()
      this.respond = false
      this.showResponse = false
      this.correct = false
      this.incorrect = false
      this.response = ''
    }
  },
  computed: {
    clue () {
      return this.$store.state.clue
    },
    value () {
      return Math.floor((Math.random() * Math.floor(10)) + 1) * 100
    }
  },
  mounted () {
    if (!this.$store.state.clue) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .column-outer-gray {
    padding: .4em;
    background-color: #483e3c;
  }
  .column-inner-blue {
    padding: 1em .75em;
    background-color: #145dfd;
    box-shadow: 0 0 10px black;
  }
  .column-inner-yellow {
    min-height: 217px;
    max-height: 217px;
    height: calc(100vh - 225px);
    width: 1.5em;
    background-color: #eda86b;
    box-shadow: 0 0 10px black;
  }
  .midsection-outer-black {
    margin: 0 .2em 0 .2em;
    padding: .4em;
    background-color: black;
    max-height: 262px;
  }
  .midsection-outer-gray {
    padding: .9em .4em;
    background-color: #483e3c;
    /* height: 100%; */
  }
  .midsection-inner-black {
    padding: .2em;
    background-color: black;
    height: calc((100% / 6) - .2em);
  }
  .midsection-inner-blue {
    padding: 10px;
    background-color: #000f9f;
    height: 104px;
    max-height: 104px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .categoryTitle {
    text-align: center;
    text-transform: uppercase;
    font-size: 1.25em;
    font-weight: bold;
    text-shadow: 3px 3px black;
    color: white;
  }
  .valueText {
    text-transform: capitalize;
    font-size: 3.5em;
    font-weight: bold;
    text-shadow: 3px 3px black;
    color: #eda86d;
  }
  .modal {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0,0,0,.8);
  }
  .clue {
    background-color: #000f9f;
    width: 95vw;
    max-width: 800px;
    max-height: 90vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 25px;
    box-shadow: 0 0 20px black;
  }
  .clueText {
    color: white;
    text-transform: uppercase;
    font-size: 6vw;
    font-weight: bold;
    text-align: center;
    text-shadow: 3px 3px black;
  }
  .response {
    background-color: white;
    width: 95vw;
    max-width: 800px;
    max-height: 90vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 25px;
    box-shadow: 0 0 20px black;
  }
  .miniClueText {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 12px;
    padding: 12px;
    text-transform: uppercase;
    font-size: 3vw;
    font-weight: bold;
    text-align: center;
    text-shadow: 3px 3px black;
    background-color: #000f9f;
  }
  .miniClueValue {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eda86d;
    margin: 12px;
    padding: 12px;
    text-transform: capitalize;
    font-size: 6vw;
    font-weight: bold;
    text-align: center;
    text-shadow: 3px 3px black;
    background-color: #000f9f;
  }
  @media (min-width: 775px) {
    .clueText {
      font-size: 50px;
    }
    .miniClueText {
      font-size: 25px;
    }
  }
</style>
