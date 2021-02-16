<template lang="pug">
  v-col.d-flex.justify-end(cols="4")
    v-btn(v-if="!$vuetify.breakpoint.xs" color="primary" @click="getRandomRecipe") Get Random Recipe
    v-btn(v-else color="primary" @click="getRandomRecipe" icon)
      v-icon mdi-dice-multiple-outline
    v-menu(v-if="!$vuetify.breakpoint.xs" v-model="showFilters" :close-on-content-click="false")

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