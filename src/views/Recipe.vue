<template lang="pug">
  v-card.justify-center.mx-auto(height="100%" :width="width" rounded elevation="12")
    v-card-text
      v-row.mx-auto
        v-col.mx-auto.justify-center.text-center(cols="8")
          h1(style="color:blue") {{ recipe.title }}
      v-row.mx-auto
        v-col.mx-auto.justify-center.text-center(cols="12" md="3")
          v-tooltip(right)
            template(v-slot:activator="{ on }")
              v-btn(:href="recipe.sourceUrl" v-on="on" text) From {{ recipe.sourceName }}
            span Visit Site
        v-col.mx-auto.justify-center.text-center(cols="12" md="3")
          icon(title="Vegan" :disabled="!recipe.vegan" icon="leaf")
          icon(title="Vegetarian" :disabled="!recipe.vegetarian" icon="carrot")
          icon(title="Gluten Free" :disabled="!recipe.glutenFree" icon="bread-slice")
          icon(title="Dairy Free" :disabled="!recipe.dairyFree" icon="cow")
      v-row.px-2.justify-center
        v-col.mt-2(cols="6")
          v-row(v-if="recipe.image")
            v-img(:src="recipe.image" contain)
      v-row
        v-col(cols="12")
          p.overline.text-center Ready in: {{ findTime(recipe.readyInMinutes) }} || Makes {{ recipe.servings }} Servings
      v-row.ma-0(no-gutters)
        v-col(cols="12")
          div.ml-md-16(class="column_wrapper")
            div(
              v-for="(ingredient, i) in recipe.ingredients"
              :key="i"
            )
              div.text-wrap {{ ingredient.originalString }}
              v-divider
      v-row(justify="center")
        v-col.mx-2.mt-2(cols="8")
          v-row(v-for="(step, i) in recipe.steps" :key="i")
            v-card-text
              div.subtitle.font-weight-bold Step {{i+1}}.
              div.body-2.ml-3.my-0.text-wrap {{ step.step }}
</template>

<script>
import axios from "axios";
import { eventBus } from "@/main"

export default {
  data: () => ({
    recipe: {
      title: ""
    },
  }),
  components: {
    "icon": () => import("@/components/icon")
  },
  computed: {
    id(){
       return this.$route.params.id
    },
    width(){
      return this.$vuetify.breakpoint.xs ? "100%" :  "66%"
    }
  },
  beforeMount(){
    if(!this.recipe.title) {this.determineRecipe();}
  },
  created(){
    eventBus.$on('getRecipe', (data) => {
      this.determineRecipe(data);
    })
  },
  methods: {
    findTime(time){
      if(time < 60){
        return time + " minutes";
      } else {
        return time % 60 + " hours"
      }
    },
    determineRecipe(data){
      if (data == 'random' || this.id == 'random') {
        this.getRandomRecipe()
      } else if(this.id){
        this.getRecipe(this.id)
      } else {
        this.getRandomRecipe();
      }
    },
    getRandomRecipe(){
      const options = {
        method: 'GET',
        url: 'recipes/random',
        params: {
          number: '1'
        }
      };

      axios.request(options)
        .then((response) => {
        this.mapRecipe(response.data.recipes[0])
      })
      .catch(function(error) {
        console.error(error);
      });
    },
    getRecipe(recipeId) {
      const options = {
        method: 'GET',
        url: `recipes/${recipeId}/information`,
        params: {
          number: '1'
        }
      };

      axios.request(options)
        .then((response) => {
          this.mapRecipe(response.data)
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    mapRecipe(recipe){
      this.recipe.id = recipe.id;
      this.recipe.steps = recipe.analyzedInstructions[0].steps;
      this.recipe.ingredients = recipe.extendedIngredients
      this.recipe.image = recipe.image
      this.recipe.title = recipe.title
      this.recipe.readyInMinutes = recipe.readyInMinutes
      this.recipe.servings = recipe.servings
      this.recipe.vegan = recipe.vegan
      this.recipe.vegetarian = recipe.vegetarian
      this.recipe.glutenFree = recipe.glutenFree
      this.recipe.dairyFree = recipe.dairyFree
      this.recipe.sourceName = recipe.sourceName
      this.recipe.sourceUrl = recipe.sourceUrl
    }
  }
}
</script>

<style scoped>
.column_wrapper {
  column-count: 3
}
</style>