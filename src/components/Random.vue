<template lang="pug">
  v-col.d-flex.justify-end(cols="4")
    v-btn(small text v-if="!$vuetify.breakpoint.xs" color="primary" @click="getRandomRecipe") Find A Random Recipe
    v-btn(v-else color="primary" rounded @click="getRandomRecipe" icon)
      v-icon mdi-dice-multiple-outline

</template>

<script>
import { eventBus } from "@/main";

export default {
  methods: {
    getRandomRecipe(){
      console.log(this.$route.name);
      if (this.$route.name != 'Recipe') {
        this.$router.push( { name: 'Recipe'})
      } else {
        eventBus.$emit('getRecipe');
      }
    }
  }
}
</script>
