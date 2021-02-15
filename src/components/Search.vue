<template lang="pug">
  div.justify-center
    portal(to="mainBar")
      v-text-field.mt-auto(
          @keydown.enter="searchRecipes"
          v-model="query"
          label="Search recipes..."
      )
      v-btn(@click="searchRecipes") Search
</template>

<script>
import axios from "axios"

export default {
  data: () => ({
    query: ""
  }),
  methods: {
    searchRecipes(){
      this.recipe = {};
      const options = {
        method: 'GET',
        url: 'recipes/search',
        params: {
          query: this.query,
          number: '10',
          offset: '0',
          type: ''
        },
      }
        axios.request(options).then((response) => {
          this.recipeList = response.data.results;
        }).catch(function (error) {
          console.error(error);
        });
      }
  }
}
</script>