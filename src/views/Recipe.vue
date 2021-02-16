<template lang="pug">
  v-card.justify-center(rounded elevation="12")
    v-card-text
      v-row.mx-auto
        v-col.mx-auto.justify-center.text-center(cols="8")
          h1(style="color:blue") {{ recipe.title }}
      v-row.mx-auto
        v-col.mx-auto.justify-center.text-center(cols="3")
          v-tooltip(right)
            template(v-slot:activator="{ on }")
              v-btn(:href="recipe.sourceUrl" v-on="on" text) From {{ recipe.sourceName }}
            span Visit Site
        v-col.mx-auto.justify-center.text-center(cols="3")
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
          v-row(v-for="(step, i) in recipe.steps" :key="i") <b> Step {{i+1}} </b> {{ step.step }}
</template>

<script>
import axios from "axios";
import { eventBus } from "@/main"

export default {
  data: () => ({
    recipe: {},
  }),
  components: {
    "icon": () => import("@/components/icon")
  },
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  beforeMount(){
    this.getRecipe('random')
  },
  created(){
    eventBus.$on('getRecipe', (data) => {
      this.getRecipe(data);
    })
  },
  methods: {
    getRecipe(recipeId) {
      let url = ''
      if (recipeId == 'random'){
        url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random'
      } else {
        url = `recipes/${recipeId}/information`
      }

      const options = {
        method: 'GET',
        url: url,
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
    mapRecipe(recipe){
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
      console.log("Recipe after map:", this.recipe);
    }
  }
}
</script>