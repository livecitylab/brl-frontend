<template>
  <b-card-group deck>
    <b-card class="text-center shadow bg-white rounded">
      <b-card-text>
        <p class="h1 mb-2">
          <b-icon-house-door-fill></b-icon-house-door-fill>
        </p>
        <p>Houses</p>
        <div class="row">
          <div class="col-5 px-0 ">
            <property-table
              :rental-data="data.haus_min"
              :property="property"
              :is-min="true"
            />
          </div>
          <div class="col px-0">
            <hr />
          </div>
          <div class="col-5 px-0 ">
            <property-table :rental-data="data.haus_max" :property="property" />
          </div>
        </div>
      </b-card-text>
    </b-card>
    <b-card class="text-center shadow bg-white rounded">
      <b-card-text>
        <p class="h1 mb-2">
          <b-icon-building></b-icon-building>
        </p>
        <p>Flats</p>
        <div class="row">
          <div class="col-5 px-0 ">
            <property-table
              :rental-data="data.whg_min"
              :property="property"
              :is-min="true"
            />
          </div>
          <div class="col px-0">
            <hr />
          </div>
          <div class="col-5 px-0 ">
            <property-table :rental-data="data.whg_max" :property="property" />
          </div>
        </div>
      </b-card-text>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    property: {
      type: String,
      default: 'preis_qm_kalt'
    }
  }
}
</script>

<style scoped></style>
