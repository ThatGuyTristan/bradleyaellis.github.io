<template lang="pug">
  v-text-field.mt-auto(
      @keydown.enter="searchRecipes"
      v-model="query"
      label="Search recipes..."
  )
</template>

<script>

</script>