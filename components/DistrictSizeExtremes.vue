<template>
  <section>
    <b-card-group deck>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="text-danger display-3">
            {{ format_value(data.whg_max.area) }}m²
          </h2>
          <p>
            is the average size of flats in
            <strong>{{ data.whg_max.district }}</strong
            >, the neighborhood with the
            <span class="text-danger"><strong>largest</strong></span> flats on
            offer Berlin.
          </p>
        </b-card-text>
      </b-card>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="text-success display-3">
            {{ format_value(data.whg_min.area) }}m²
          </h2>
          <p>
            is the average size of flats in
            <strong>{{ data.whg_min.district }}</strong
            >, the neighborhood with the
            <span class="text-success"><strong>smallest</strong></span> flats on
            offer Berlin.
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
    format_value(price) {
      return `${Math.round(parseFloat(price) * 100) / 100}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
