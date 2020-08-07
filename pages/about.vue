<template>
  <section class="container my-5 px-4">
    <h3>About</h3>
    <div class="gap" />
    <div class="row">
      <!-- Techlabs Logo -->
      <div
        class="col-md-3 d-flex justify-content-center align-items-center pink"
      >
        <img src="~static/imgs/techlabs.png" alt="" class="techlabs-max" />
      </div>

      <!-- Text -->
      <div class="col-md-9 mt-3 mt-md-0 pink">
        <nuxt-content :document="about" />
      </div>
    </div>
    <div class="gap" />
  </section>
</template>
<script>
export default {
  async asyncData({ $content }) {
    const about = await $content('about').fetch()
    return { about }
  }
}
</script>
