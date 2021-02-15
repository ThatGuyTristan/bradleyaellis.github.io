<template lang="pug">
    v-app
      v-app-bar(app color="secondary" dark)
        v-row
          v-col(cols="4")
              div.d-flex.align-center Recipes Lite
              span.caption No blog, no fuss. Recipes done right. Recipes Lite
          v-col(cols="4")
          portal-target(name="mainBar")
            Search
            Random(:showFilters="false")
      v-main
</template>

<script>
import axios from "axios";
import Search from "@/components/Search.vue"
import Random from "@/components/Random.vue"
import icon from "@/components/icon"

export default {
  components: {icon, Search, Random},
  name: 'App',
  data: () => ({
    query: "",
    showFilters: false,
    recipeList: [],
    recipe: {
      id: null,
      steps: [],
      ingredients: [],
      image: null,
      title: null,
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      dairyFree: false,
      sourceName: null,
      sourceLink: null,
    },
    filters: {
      diet: null,
      cuisine: null,
    },
    diets: [
      { text:"Dairy Free", value: "dairy free" },
      { text: "Gluten Free", value: "gluten free"},
      { text: "Vegan", value: "vegan"},
      { text: "Vegetarian", value: "vegetarian" }
    ],
    cuisines: []
  }),
  beforeMount(){
    this.getRandomRecipe();
  },
  methods: {
    getRandomRecipe(){
      const options = {
        method: 'GET',
        url: 'recipes/random',
        params: {number: '1'},
      };

      console.log(options);

      axios.request(options).then((response) => {
        console.log(response.data.recipes[0]);
        this.mapRecipe(response.data.recipes[0])
      }).catch(function (error) {
        console.error(error);
      });
    },
  }
};
</script>
