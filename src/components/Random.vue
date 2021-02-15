<template lang="pug">
  div(class="justify-center")
    portal(to="mainBar")
      v-btn.mx-2(color="primary" @click="getRandomRecipe") Get Random Recipe
      v-menu(v-model="showFilters" v-show="showFilters" :close-on-content-click="false")
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
</template>

<script>
import axios from "axios";

export default {
  props: {
    showFilters: { type: Boolean, default: false }
  },
  data: () => ({
    filters: {
      diet: null,
      cuisine: null
    },
    diets: [
      "Pescetarian",
      "Lacto vegetarian",
      "Ovo vegetarian",
      "Vegan",
      "Vegetarian"
    ],
    cuisines: []
  }),
  methods: {
    getRandomRecipe() {
      const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
        params: {
          number: '1'
        },
        headers: {
          'x-rapidapi-key': 'c76391c1abmsh387ecc72c8ad90ep153afajsne72875284088',
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };

      axios.request(options)
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
}
</script>
