<template>
  <div>
    <h2 class="mb-0" :class="isMin ? 'text-success' : 'text-danger'">
      {{ value }}{{ symbol }}
    </h2>
    <small>{{ legend }}</small>
    <b-card class="mt-4 text-left">
      <small>
        <b-icon-map /> {{ rentalData.district }}<br />
        <template v-if="property === 'preis_qm_kalt'">
          <b-icon-arrows-fullscreen />
          {{ format_number(rentalData.area) }}m²<br />
        </template>
        <template v-else>
          <b-icon-wallet-2 />
          {{ format_number(rentalData.preis_qm_kalt) }}€/m²<br />
        </template>
        <b-icon-square /> {{ rentalData.num_rooms }} room(s)<br />
        <b-icon-calendar /> {{ rentalData.created_at }} <br />
      </small>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    rentalData: {
      type: Object,
      required: true
    },
    isMin: {
      type: Boolean,
      default: false
    },
    property: {
      type: String,
      default: 'preis_qm_kalt'
    }
  },
  computed: {
    symbol() {
      if (this.property === 'preis_qm_kalt') {
        return '€'
      }
      return 'm²'
    },
    legend() {
      if (this.property === 'preis_qm_kalt') {
        return this.isMin ? 'cheapest' : 'most expensive'
      }
      return this.isMin ? 'smallest' : 'largest'
    },
    value() {
      return this.format_number(this.rentalData[this.property])
    }
  },
  methods: {
    format_number(value) {
      return Math.round(value * 100) / 100
    }
  }
}
</script>

<style scoped></style>
