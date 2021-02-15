<template lang="pug">
        v-card(v-if="recipeList.length")
          v-card-text
            v-list
              v-list-item(@click="getRecipe(item.id)" v-for="(item, i) in recipeList" :key="i")
                v-list-item-content
                  v-list-item-title {{ item.title }}
                  v-list-item-subtitle Makes {{ item.servings }} | Ready in {{ item.readyInMinutes }} minutes
</template>

<script>
import axios from "axios"

export default {
  searchRecipes(){
    this.recipe = {};
    const options = {
      method: 'GET',
      url: 'recipes/search',
      params: {
        query: this.query,
        diet: '',
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
</script>