<template>
  <div>
    <b-container fluid class="map px-3">
      <iframe
        :src="`${API_URL}/dash-map/`"
        width="100%"
        height="100%"
        frameborder="0"
        class="shadow bg-white rounded pb-5"
      />
    </b-container>
    <section>
      <h1 class="text-center text-secondary"><b-icon-chevron-down /></h1>
    </section>
    <section id="charts" class="container">
      <h1 class="my-5 text-center"><strong>BERLIN</strong></h1>
      <hr />
    </section>
    <div class="gap"></div>
    <section class="container text-center">
      <h3 class="mb-4">
        PRICE EXTREMES<br />
        <small>per m² (cold)</small>
      </h3>
      <div class="gap"></div>
      <!-- cheapest and most expensive properties in berlin  -->
      <property-extremes
        :data="prices.price_extremes"
        property="preis_qm_kalt"
      />
      <div class="my-5"></div>
      <!-- price variation per day  -->
      <b-card class="text-center shadow bg-white rounded">
        <b-card-text>
          <h3>Average price variation per day<br /><small>flats</small></h3>
          <iframe
            :src="`${API_URL}/dash-price-variation-day/`"
            width="100%"
            height="500px"
            frameborder="0"
          />
        </b-card-text>
      </b-card>
      <div class="my-5"></div>
      <!-- cheapest and most expensive districs in berlin  -->
      <district-price-extremes :data="prices.district_extremes" />
      <div class="my-5"></div>
      <!-- price variation per floor level  -->
      <b-card class="text-center shadow bg-white rounded">
        <b-card-text>
          <h3>Price variation per floor level<br /><small>cold</small></h3>
          <iframe
            :src="`${API_URL}/dash-price-per-floor-level/`"
            width="100%"
            height="500px"
            frameborder="0"
          />
        </b-card-text>
      </b-card>
    </section>
    <div class="gap"></div>
    <section class="container text-center">
      <h3 class="mb-4">
        SIZE EXTREMES
      </h3>
      <div class="gap"></div>
      <!-- smallest and largest properties in berlin  -->
      <property-extremes :data="sizes.size_extremes" property="area" />
      <div class="my-5"></div>
      <!-- districts with the smallest and largest flats in berlin  -->
      <district-size-extremes :data="sizes.district_extremes" />
    </section>
    <div class="gap"></div>
    <section class="container text-center">
      <h3 class="mb-4">
        AMENITIES
      </h3>
      <div class="gap"></div>
      <district-amenities :data="amenities" />
    </section>
    <div class="gap"></div>
    <section class="container text-center">
      <h3 class="mb-4">
        RENTAL NUMBERS
      </h3>
      <div class="gap"></div>
      <b-card class="text-center shadow bg-white rounded">
        <b-card-text>
          <h3>
            When are most rental offers posted?<br /><small
              >flats & houses</small
            >
          </h3>
          <iframe
            :src="`${API_URL}/dash-new-rentals-day/`"
            width="100%"
            height="500px"
            frameborder="0"
          />
        </b-card-text>
      </b-card>
      <div class="my-5"></div>
      <district-amounts-extremes :data="amounts" />
      <div class="my-5"></div>
      <b-card class="text-center shadow bg-white rounded">
        <b-card-text>
          <h3>Districts By Number of Rentals<br /><small>top 5</small></h3>
          <iframe
            :src="`${API_URL}/dash-rentals-per-district/`"
            width="100%"
            height="500px"
            frameborder="0"
          />
        </b-card-text>
      </b-card>
      <div class="my-5"></div>
      <b-card class="text-center shadow bg-white rounded">
        <b-card-text>
          <h3>Districts By Number of Rentals<br /><small>top 20</small></h3>
          <iframe
            :src="`${API_URL}/dash-rentals-per-district-all/`"
            width="100%"
            height="500px"
            frameborder="0"
          />
        </b-card-text>
      </b-card>
      <div class="my-5"></div>
      <b-card class="text-center shadow bg-white rounded">
        <b-card-text>
          <h3>Districts By Number of Rentals<br /><small>bottom 5</small></h3>
          <iframe
            :src="`${API_URL}/dash-rentals-per-district-least/`"
            width="100%"
            height="500px"
            frameborder="0"
          />
        </b-card-text>
      </b-card>
    </section>
    <div class="gap"></div>
    <p class="text-center">
      <a href="#"><b-icon-arrow-bar-up /> back to top</a>
    </p>
    <div class="gap"></div>
  </div>
</template>

<script>
// const API_URL = 'https://berlinrentslive-flask.herokuapp.com'
const API_URL = process.env.NUXT_ENV_API_URL
export default {
  async asyncData({ $axios }) {
    const { data: prices } = await $axios.$get(`${API_URL}/price-stats`)
    const { data: sizes } = await $axios.$get(`${API_URL}/size-stats`)
    const { data: amenities } = await $axios.$get(`${API_URL}/amenities-stats`)
    const { data: amounts } = await $axios.$get(`${API_URL}/amounts-stats`)
    return { prices, sizes, amenities, amounts }
  },
  data() {
    return {
      API_URL
    }
  }
}
</script>

<style>
.map {
  height: 80vh;
}
</style>
