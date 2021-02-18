<template lang="pug">
  v-card(v-if="recipeList.length")
    v-card-text
      v-row.mx-auto
        v-col.mx-auto.d-flex.justify-center
          v-list
            template(v-for="(item, i) in recipeList")
              v-list-item(@click="getRecipe(item.id)" :key="i")
                v-list-item-content
                  v-list-item-title {{ item.title }}
                  v-list-item-title Makes {{ item.servings }} Servings | Ready in {{ item.readyInMinutes }} minutes
              v-divider
</template>

<script>
import axios from "axios"
import { eventBus } from "@/main"

export default {
  data: () => ({
    recipeList: []
  }),
  computed: {
    query(){
      console.log(this.$route.params.query);
      return this.$route.params.query;
    }
  },
  beforeMount(){
    if(this.query) {
        this.searchRecipes(this.query)
    }
  },
  created(){
    eventBus.$on('searchRecipe', (query) => {
      this.searchRecipes(query)
    })
  },
  watch:{
    query(value){
      this.searchRecipes(value)
    }
  },
  methods:{
    searchRecipes(query){
      const options = {
        method: 'GET',
        url: 'recipes/search',
        params: {
          query: this.query ? this.query : query,
          number: '10',
          offset: '0',
        },
      }
      axios.request(options).then((response) => {
        console.log(response);
        this.recipeList = response.data.results;
      }).catch(function (error) {
        console.error(error);
      });
    },
    getRecipe(id){
      this.$router.push( {name: "Recipe", params: { id: id } })
    }
  }
}
</script>