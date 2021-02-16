<template lang="pug">
  v-col.d-flex.justify-end(cols="4")
    v-btn(v-if="!$vuetify.breakpoint.xs" color="primary" @click="getRandomRecipe") Get Random Recipe
    v-btn(v-else color="primary" @click="getRandomRecipe" icon)
      v-icon mdi-dice-multiple-outline

</template>

<script>
import { eventBus } from "@/main";

export default {
  methods: {
    getRandomRecipe(){
      let url = 'random';
      eventBus.$emit('getRecipe', url);
    }
  }
}
</script>