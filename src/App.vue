<template lang="pug">
    v-app
      v-app-bar(flat app color="grey-light" light)
        v-row.flex-row.px-auto(v-if="!$vuetify.breakpoint.xs")
          v-col.d-flex.justify-center(cols="4")
            Search
          v-col.d-flex.justify-center.align-center(cols="4")
            v-toolbar-title.mx-auto(
              class="main-logo"
            ) No blog, no fuss. Recipes done right. Recipes lite.
          v-col.d-flex.justify-end(cols="4")
            Random
        v-row.flex-row.px-auto(v-else)
          v-col.d-flex.align-left.py-0(cols="5")
            Search
          v-col.d-flex.flex-column.mt-5(cols="5")
            h3.d-flex.justify-center.align-center(class="main-logo") Recipes Lite
          v-col.d-flex.justify-end.pr-0(cols="2")
            Random
      v-main
        router-view(:key="$route.FullPath")
        v-toolbar.mt-2(bottom flat)
          v-toolbar-title.mx-auto
            span.mr-2(class="main-logo") Recipes Lite
            span.caption Powered by Spoonacular
</template>

<script>
import Search from "@/components/Search"
import Random from "@/components/Random"
import { eventBus } from "@/main";

export default {
  components: {Search, Random},
  name: 'App',
  mounted(){
    eventBus.$emit("getRecipe", 'random')
  }
};
</script>


<style scoped>
.main-logo {
  font-family: "Akaya Kanadaka"
}
</style>