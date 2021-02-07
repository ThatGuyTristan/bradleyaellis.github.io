<template>
<v-app>
  <v-app-bar app color="secondary" dark>
    <v-row>
      <v-col cols="4">
        <div class="d-flex align-center">
        Recipes Lite (c)
        <span style="margin-left:5px; padding-top: 6px; font-size:xx-small"> No blog, no fuss. Just recipes done right. . . RecipesLite. Powered by Spoonacular </span>
        </div>
      </v-col>
      <v-col cols="4">
        <v-text-field @keydown.enter="searchRecipes" class="mx-auto" v-model="query" label="Search recipes"> </v-text-field>
      </v-col>
  </v-row>
    <div>
      <v-btn class="mx-2" color="primary" @click="getRandomRecipe()"> Get Random Recipe </v-btn>
      <v-menu v-show="showFilters" v-model="showFilters" :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn color="secondary" v-on="on" icon>
            <v-icon color="white"> mdi-filter-menu </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title> Recipe Filters
            <v-spacer></v-spacer>
            <v-btn text @click="showFilters = false"> X </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-select label="Diet" :items="diets" item-text="item" v-model="filters.diet"></v-select>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn class="error" text x-small @click="filters.diet = null"> X </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-select label="Cuisine" :items="cuisine" item-text="item" v-model="filters.cuisine"></v-select>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn class="error" text x-small @click="filters.cuisine = null"> X </v-btn>
                </v-list-item-action>
              </v-list-item>
                </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
  <v-main>
    <v-card v-if="recipe.id">
      <v-container class="px-auto">
        <v-card-text>
          <v-row justify="center">
            <h1> {{ recipe.title }} </h1>
          </v-row>
          <v-row class="pt-2" justify="center">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn :href="recipe.sourceUrl" v-on="on" text> From {{ recipe.sourceName }} </v-btn>
              </template>
              <span> Visit Site </span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <icon title="Vegan" :disabled="!recipe.vegan" icon="leaf"></icon>
            <icon title="Vegetarian" :disabled="!recipe.vegetarian" icon="carrot"></icon>
            <icon title="Gluten Free" :disabled="!recipe.glutenFree" icon="bread-slice"></icon>
            <icon title="Dairy Free" :disabled="!recipe.dairyFree" icon="cow"></icon>
          </v-row>
          <v-row justify="center" class="px-2">
            <v-col cols="4" class="mt-2">
              <v-row v-if="recipe.image" max-width="200" max-height="200" contain> <v-img :src="recipe.image"> </v-img> </v-row>
            </v-col>
            <v-col cols="4" class="px-4">
              <v-row v-for="(ingredient, i) in recipe.ingredients" :key="i"> {{ ingredient.originalString }} </v-row>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="8" class="mx-2 mt-2">
              <v-row v-for="(step, i) in recipe.steps" :key="i"> <b> Step {{i+1}}: </b> {{ step.step }} </v-row>
            </v-col>
          </v-row>
          </v-card-text>
      </v-container>
    </v-card>

    <v-card v-if="recipeList.length">
      <v-container>
        <v-card-text>
          <v-list>
            <v-list-item @click="getRecipe(item.id)" v-for="(item, i) in recipeList" :key="i">
              <v-list-item-content>
                <v-list-item-title> {{ item.title }} </v-list-item-title>
                <v-list-item-subtitle> Makes {{ item.servings }} servings || Ready in {{ Math.ceil(item.readyInMinutes / 60) }} hours </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-container>
    </v-card>
  </v-main>
</v-app>
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
      steps: [],
      ingredients: [],
      image: "",
      title: "",
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      dairyFree: false,
      sourceName: "",
      sourceLink: null,
    },
    filters: {
      diet: "",
      cuisine: null
    },
    diets: [
      "Pescetarian",
      "Lacto vegetarian",
      "Ovo vegetarian",
      "Vegan",
      "Vegetarian"
    ],
    cuisine: []
  }),
  computed: {
    sourceLink() {
      return this.recipe.sourceName.link(this.recipe.sourceUrl);
    }
  },
  methods: {
    getRandomRecipe(){
      const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
        params: {number: '1', tags: this.filters},
        headers: {
          'x-rapidapi-key': 'c76391c1abmsh387ecc72c8ad90ep153afajsne72875284088',
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };

    axios.request(options).then(function (response) {
      console.log(response.data);
      this.mapRecipe(response.data)
    }).catch(function (error) {
      console.error(error);
    });

    },
    getRecipe(recipeId) {
      const options = {
        method: 'GET',
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
        params: {
          number: '1'
        },
        headers: {
          'x-rapidapi-key': 'c76391c1abmsh387ecc72c8ad90ep153afajsne72875284088',
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
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
    console.log("hit it!", this.query);
    this.recipe = {};
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
      params: {
        query: this.query,
        diet: '',
        excludeIngredients: 'coconut',
        intolerances: 'egg, gluten',
        number: '10',
        offset: '0',
        type: 'main course'
      },
      headers: {
        'x-rapidapi-key': 'c76391c1abmsh387ecc72c8ad90ep153afajsne72875284088',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      }
      console.log(options);
      axios.request(options).then((response) => {
        console.log(response.data.results);
        this.recipeList = response.data.results;
      }).catch(function (error) {
        console.error(error);
      });
    },

    mapRecipe(recipe){
      this.recipe.steps = recipe.analyzedInstructions[0].steps;
      this.recipe.id = recipe.id;
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
