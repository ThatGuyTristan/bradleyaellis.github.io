<template>
  <v-tooltip right>
    <template v-slot:activator="{ on }">
      <v-icon :disabled="disabled" color="primary" v-on="on"> {{ iconLabel }} </v-icon>
    </template>
    <span> {{ title }} </span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    title: { type: String, default: null },
    icon: { type: String, default: null },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    iconLabel() {
      return "mdi-" + this.icon
    }
  }
}
</script>
