<template>
  <section>
    <b-card-group deck>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="text-secondary display-3">
            <b-icon-house-door-fill />
          </h2>
          <p>
            If you're looking for a <strong>house</strong>, the district with
            the most house rentals on offer is
            <strong>{{ districts_haus_max[0] }}</strong
            >.
          </p>
          <p>
            On the other hand, you'll have a hard time finding a
            <strong>flat</strong> to rent in
            <strong>{{ districts_haus_min[0] }}</strong
            >, for example.
          </p>
        </b-card-text>
      </b-card>
      <b-card class="text-center shadow bg-white rounded py-5">
        <b-card-text>
          <h2 class="text-secondary display-3">
            <b-icon-building />
          </h2>
          <p>
            If you're looking for a <strong>flat</strong>, the district with the
            most flat rentals on offer is
            <strong>{{ districts_whg_max[0] }}</strong
            >.
          </p>
          <p>
            On the other hand, you'll have a hard time finding a
            <strong>flat</strong> to rent in
            <strong>{{ districts_whg_min[0] }}</strong
            >, for example.
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
  computed: {
    districts_haus_min() {
      return this.get_districts('haus_min')
    },
    districts_haus_max() {
      return this.get_districts('haus_max')
    },
    districts_whg_max() {
      return this.get_districts('whg_max')
    },
    districts_whg_min() {
      return this.get_districts('whg_min')
    }
  },
  methods: {
    format_value(price) {
      return `${Math.round(parseFloat(price) * 100) / 100}`
    },
    get_districts(prop) {
      return Object.keys(this.data[prop].district)
    }
  }
}
</script>

<style lang="scss" scoped></style>
