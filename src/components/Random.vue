<template lang="pug">
  div
    v-btn(@click="getRandomRecipe()" color="primary" ) Get Random Recipe
</template>

<script>
import { eventBus } from "@/main";

export default {
  methods: {
    getRandomRecipe(){
      let url = 'random';
      console.log("hi?");
      eventBus.$emit('getRecipe', url);
    }
  }
}
</script>