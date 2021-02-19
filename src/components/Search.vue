<template lang="pug">
  v-text-field.d-flex.align-center(
      clearable
      outlined
      dense
      hide-details
      @keydown.enter="searchRecipes"
      v-model="query"
      placeholder="Search recipes..."
      append-icon="mdi-search"
      @click:prepend="searchRecipes"
  )
</template>

<script>
import { eventBus } from "@/main"
export default {
  data: () => ({
    query: "",
  }),
  methods: {
    searchRecipes(){
      if (this.$route.name != 'RecipeList') {
        console.log("first if", this.query, this.$route.name);
        this.$router.push( {name: "RecipeList", params: { query: this.query } }).catch(() => {})
      } else {
        console.log("else", this.query)
        eventBus.$emit("searchRecipe", this.query);
      }
    }
  }
}
</script>