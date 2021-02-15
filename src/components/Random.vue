<template>
<div>
  <v-menu v-show="showFilters" v-model="showFilters" :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" v-on="on"> Filters </v-btn>
    </template>
    <v-card>
      <v-card-title> Recipe Filters
        <v-spacer></v-spacer>
        <v-btn text @click="showFilters = false"> X </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-list>
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-menu>
  <v-btn class="mx-2" color="primary" @click="getRecipe"> Get Random Recipe </v-btn>
</div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    showFilters: false,
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
    cuisine: []
  }),
  methods: {
    getRecipe() {
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
