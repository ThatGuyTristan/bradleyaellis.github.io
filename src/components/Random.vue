<template lang="pug">
  div
    v-btn(@click="getRandomRecipe()" color="primary" ) Get Random Recipe
</template>

<script>
  import { eventBus } from "@/main"

  export default {
    methods: {
      getRandomRecipe(){
        console.log("hi?");
        eventBus.$emit('getRecipe', 'random');
      }
    }
  }

</script>