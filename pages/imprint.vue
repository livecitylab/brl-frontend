<template>
  <b-container class="my-5 px-4">
    <h3>Imprint</h3>
    <nuxt-content :document="text" />
  </b-container>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const text = await $content('imprint').fetch()
    return { text }
  }
}
</script>

<style scoped></style>
