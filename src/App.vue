<template lang="pug">
    v-app
      v-app-bar(flat app color="white" light)
        v-row.flex-row.px-auto(v-if="!$vuetify.breakpoint.xs")
          v-col.d-flex.flex-column.justify-start.mt-2(cols="4")
            title.d-flex.align-start(class="main-logo") Recipes Lite
            caption.d-flex.align-end(class="main-logo" v-if="!$vuetify.breakpoint.xs").
              No blog, no fuss. Recipes done right.
          v-col.d-flex.justify-center(cols="4")
            Search
          v-col.d-flex.justify-end(cols="4")
            Random
        v-row.flex-row.px-auto(v-else)
          v-col.d-flex.flex-column.mt-3(cols="3")
            h3.d-flex.justify-center.text-center.ml-0.ml-n3(class="main-logo") Recipes Lite
          v-col.d-flex.align-left.py-0(cols="7")
            Search
          v-col.d-flex.justify-end.pr-0(cols="2")
            Random
      v-main
        router-view(:key="$route.FullPath")
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