<template>
  <section>
    <b-card-group deck>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="text-danger display-3">
            {{ format_price(data.whg_max.preis_qm_kalt) }}
          </h2>
          <p>
            is the average price per square meter for flats in
            <strong>{{ data.whg_max.district }}</strong
            >, the
            <span class="text-danger"><strong>most expensive</strong></span> in
            Berlin.
          </p>
        </b-card-text>
      </b-card>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="text-success display-3">
            {{ format_price(data.whg_min.preis_qm_kalt) }}
          </h2>
          <p>
            is the average price per square meter for flats in
            <strong>{{ data.whg_min.district }}</strong
            >, the
            <span class="text-success"><strong>cheapest</strong></span> in
            Berlin.
          </p>
        </b-card-text>
      </b-card>
    </b-card-group>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    format_price(price) {
      return `${Math.round(parseFloat(price) * 100) / 100}€`
    }
  }
}
</script>

<style scoped>
.filter-red {
  filter: invert(26%) sepia(59%) saturate(2264%) hue-rotate(331deg)
    brightness(101%) contrast(92%);
}
</style>
