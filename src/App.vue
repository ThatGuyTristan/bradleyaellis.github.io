<template lang="pug">
    v-app
      v-app-bar(app color="secondary" dark)
        v-row
          v-col(cols="4")
              div.d-flex.align-center Recipes Lite
              span.caption No blog, no fuss. Recipes done right. Recipes Lite
          v-col(cols="4")
          portal-target(name="mainBar")

        div(class="justify-center")
            v-btn.mx-2(color="primary" @click="getRandomRecipe") Get Random Recipe
            v-menu(v-model="showFilters" :close-on-content-click="false")
                template(v-slot:activator="{ on }")
                    v-btn(color="secondary" v-on="on" icon)
                        v-icon(color="white") mdi-filter-menu
                v-card
                  v-container.px-auto
                    v-card-title Recipe Filters
                        v-spacer
                        v-btn(text @click="showFilters = false") X
                    v-card-text
                        v-list(dense)
                            v-list-item
                                v-list-item-content
                                    v-select(
                                        label="Diet"
                                        :items="diets"
                                        item-text="item"
                                        v-model="filters.diet"
                                    )
                                v-list-item-action
                                    v-btn(
                                        class="error"
                                        x-small
                                        text
                                        @click="filters.diet = ''"
                                    ) Clear
                            v-list-item
                              v-list-item
                                v-list-item-content
                                    v-select(
                                        label="Cuisine"
                                        :items="cuisines"
                                        item-text="item"
                                        v-model="filters.cuisines"
                                    )
                                v-list-item-action
                                    v-btn(
                                        class="error"
                                        x-small
                                        text
                                        @click="filters.cuisines = ''"
                                      ) Clear
      v-main
</template>

<script>
import axios from "axios";
import icon from "@/components/icon"

export default {
  components: {icon},
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
    getRecipe(recipeId) {
      const options = {
        method: 'GET',
        url: `recipes/${recipeId}/information`,
      };

      axios.request(options)
        .then((response) => {
          this.recipeList = [];
          console.log(response.data);
          this.mapRecipe(response.data)
        })
        .catch(function(error) {
          console.error(error);
        });
    },
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
        type: 'main course'
      },
    }
      axios.request(options).then((response) => {
        this.recipeList = response.data.results;
      }).catch(function (error) {
        console.error(error);
      });
    },

    mapRecipe(recipe){
      console.log("Hello", recipe);
      this.recipe.id = recipe.id;
      this.recipe.steps = recipe.analyzedInstructions[0].steps;
      this.recipe.ingredients = recipe.extendedIngredients
      this.recipe.image = recipe.image
      this.recipe.title = recipe.title
      this.recipe.vegan = recipe.vegan
      this.recipe.vegetarian = recipe.vegetarian
      this.recipe.glutenFree = recipe.glutenFree
      this.recipe.dairyFree = recipe.dairyFree
      this.recipe.sourceName = recipe.sourceName
      this.recipe.sourceUrl = recipe.sourceUrl
    }
  }
};
</script>
