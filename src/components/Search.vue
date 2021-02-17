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
export default {
  data: () => ({
    query: "",
  }),
  methods: {
    searchRecipes(){
      this.$router.push( {name: "RecipeList", params: { query: this.query } }).catch(() => {})
    }
  }
}
</script>