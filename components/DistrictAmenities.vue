<template>
  <section>
    <b-card-group deck>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="d-flex align-items-center justify-content-center">
            <font-awesome-icon icon="sun" class="text-warning mr-3" />
            <span class="display-3">{{ format_value(data.balcony.y) }}%</span>
          </h2>
          <p>of rentals offer <strong>balconies</strong></p>
        </b-card-text>
      </b-card>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="d-flex align-items-center justify-content-center">
            <font-awesome-icon icon="leaf" class="text-success mr-3" />
            <span class="display-3">{{ format_value(data.garden.y) }}%</span>
          </h2>
          <p>of rentals offer <strong>garden</strong> access</p>
        </b-card-text>
      </b-card>
    </b-card-group>
    <div class="my-5" />
    <b-card-group deck>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="d-flex align-items-center justify-content-center">
            <font-awesome-icon icon="sink" class="text-info mr-3" />
            <span class="display-3">{{ format_value(data.kitchen.y) }}%</span>
          </h2>
          <p>of rentals offer <strong>installed kitchens</strong></p>
        </b-card-text>
      </b-card>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="d-flex align-items-center justify-content-center">
            <font-awesome-icon icon="key" class="text-secondary mr-3" />
            <span class="display-3">{{ format_value(data.cellar.y) }}%</span>
          </h2>
          <p>of rentals offer access to <strong>a cellar</strong></p>
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
    format_value(value) {
      return `${Math.round(parseFloat(value))}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
