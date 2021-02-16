<template lang="pug">
    v-app
      v-app-bar(absolute app color="secondary" dark)
        v-row.my-0
          v-col(cols="4")
            div.align-center Recipes Lite
            span.caption No blog, no fuss. Recipes done right. Recipes Lite
          v-col(cols="4")
            Search
          v-col(cols="4")
            Random
      v-main
        router-view(:key="$route.FullPath")
</template>

<script>
import Search from "@/components/Search"
import Random from "@/components/Random"

export default {
  components: {Search, Random},
  name: 'App'
};
</script>
