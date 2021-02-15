<template lang="pug">
  v-card(v-if="recipeList.length")
    v-card-text
      v-list
        v-list-item(@click="getRecipe(item.id)" v-for="(item, i) in recipeList" :key="i")
          v-list-item-content
            v-list-item-title {{ item.title }}
            v-list-item-subtitle Makes {{ item.servings }} | Ready in {{ item.readyInMinutes }} minutes
</template>

<script>
export default {
  data: () => ({
    recipeList: []
  }),
}
</script>