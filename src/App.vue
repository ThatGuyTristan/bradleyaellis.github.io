<template lang="pug">
    v-app
      v-app-bar(app color="success" dark clipped-right)
        v-row.flex-row.px-auto
            v-col.d-flex.justify-start(cols="4")
                  div.d-flex.align-center Recipes Lite
                  div.d-flex.align-center.caption(v-if="!$vuetify.breakpoint.xs") No blog, no fuss. Recipes done right. Recipes Lite
            v-col.d-flex.justify-center(cols="4")
                v-text-field.d-flex.align-center(
                  hide-details
                  dense
                  @keydown.enter="searchRecipes"
                  v-model="query"
                  placeholder="Search recipes..."
                  prepend-inner-icon="mdi-magnify"
                )
            v-col.d-flex.justify-end(cols="4")
              v-btn(v-if="!$vuetify.breakpoint.xs" color="primary" @click="getRandomRecipe") Get Random Recipe
              v-btn(v-else color="primary" @click="getRandomRecipe" icon)
                v-icon mdi-dice-multiple-outline
              v-menu(v-if="!$vuetify.breakpoint.xs" v-model="showFilters" :close-on-content-click="false")
      v-main
        v-card.justify-center(:loading="loading" v-if="recipe.id" rounded elevation="12")
          v-card-text
            v-row.mx-auto
              v-col.mx-auto.justify-center.text-center(cols="8")
                h1(style="color:blue") {{ recipe.title }}
            v-row.mx-auto
              v-col.mx-auto.justify-center.text-center(cols="4")
                v-tooltip(right)
                  template(v-slot:activator="{ on }")
                    v-btn(:href="recipe.sourceUrl" v-on="on" text) From {{ recipe.sourceName }}
                  span Visit Site
              v-col.mx-auto.justify-center.text-center(cols="4")
                v-spacer
                icon(title="Vegan" :disabled="!recipe.vegan" icon="leaf")
                icon(title="Vegetarian" :disabled="!recipe.vegetarian" icon="carrot")
                icon(title="Gluten Free" :disabled="!recipe.glutenFree" icon="bread-slice")
                icon(title="Dairy Free" :disabled="!recipe.dairyFree" icon="cow")
            v-row.px-2(justify="center")
              v-col.mt-2(cols="4")
                v-row(v-if="recipe.image")
                  v-img(:src="recipe.image" contain)
              v-col.px-4(cols="4")
                v-row
                  v-list(dense)
                    v-list-item.my-n4(
                      v-for="(ingredient, i) in recipe.ingredients"
                      :key="i"
                    )
                      v-list-item-title {{ ingredient.originalString }}
            v-row(justify="center")
              v-col.mx-2.mt-2(cols="8")
                v-row(v-for="(step, i) in recipe.steps" :key="i")
                  .body-1.font-weight-bold Step {{i+1}}
                  .body-2.ml-3 {{ step.step }}

        v-card(v-if="recipeList.length")
          v-card-text
            v-list
              v-list-item(@click="getRecipe(item.id)" v-for="(item, i) in recipeList" :key="i")
                v-list-item-content
                  v-list-item-title {{ item.title }}
                  v-list-item-subtitle Makes {{ item.servings }} | Ready in {{ item.readyInMinutes }} minutes

</template>

<script>
import axios from "axios";
import icon from "@/components/icon"

export default {
  components: {icon},
  name: 'App',
  data: () => ({
    loading: false,
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
      this.loading = true;
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
      }).finally(this.loading = false);
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
