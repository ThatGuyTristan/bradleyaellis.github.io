<template lang="pug">
  div.justify-center
    v-text-field(
        clearable
        outlined
        single-line
        @keydown.enter="searchRecipes"
        v-model="query"
        hint="Search recipes..."
        persistent-hint
        append-icon="mdi-search"
        @click:prepend="searchRecipes"
    )
</template>

<script>
import axios from "axios"

export default {
  data: () => ({
    query: "",
    recipeList: []
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