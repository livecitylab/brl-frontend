<template>
  <b-container class="my-5 px-4">
    <h3>Estimate your rent</h3>
    <nuxt-content :document="text" />
    <div class="my-5" />
    <b-row>
      <b-col cols="4">
        <b-card class="shadow bg-white rounded">
          <b-form v-if="show" @submit="onSubmit" @reset="onReset">
            <b-form-group
              id="district-group"
              label="District:"
              label-for="district-input"
            >
              <b-form-select
                v-if="districts.length > 0"
                id="district-input"
                v-model="form.district"
                :options="districts"
                required
                autofocus
              />
              <p v-else>Loading...</p>
            </b-form-group>
            <b-form-group id="area-group" label="Area:" label-for="area-input">
              <b-row>
                <b-col>
                  <b-form-input
                    id="area-range"
                    v-model="form.area"
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                  />
                </b-col>
                <b-col cols="3">
                  <p>
                    <strong
                      >{{ form.area }}m²<span v-show="form.area == 300"
                        >+</span
                      ></strong
                    >
                  </p>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              id="rooms-group"
              label="Number of rooms:"
              label-for="rooms-input"
            >
              <b-row>
                <b-col>
                  <b-form-input
                    id="rooms-range"
                    v-model="form.num_rooms"
                    type="range"
                    min="1"
                    max="6"
                  />
                </b-col>
                <b-col cols="3">
                  <p>
                    <strong
                      >{{ form.num_rooms
                      }}<span v-show="form.num_rooms == 6">+</span></strong
                    >
                  </p>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group label="Amenities:">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="form.amenities"
                name="amenities"
                stacked
              >
                <b-form-checkbox value="balcony">Balcony</b-form-checkbox>
                <b-form-checkbox value="elevator">Elevator</b-form-checkbox>
                <b-form-checkbox value="cellar">Cellar</b-form-checkbox>
                <b-form-checkbox value="kitchen"
                  >Installed kitchen</b-form-checkbox
                >
                <b-form-checkbox value="ground_floor"
                  >Ground floor</b-form-checkbox
                >
              </b-form-checkbox-group>
              <b-form-group class="mt-5">
                <b-button type="submit" variant="primary">Estimate!</b-button>
                <b-button type="reset" variant="light">Reset</b-button>
              </b-form-group>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
        <div
          class="d-flex flex-column justify-content-center items-align-center h-100"
        >
          <template v-if="loading"
            ><p class="text-center">
              <!-- TODO: replace by icon or animated spinner?  -->
              Loading...
            </p></template
          >
          <template v-else>
            <template v-if="!results">
              <h1 class="text-center text-secondary">
                <font-awesome-icon icon="search-dollar" />
              </h1>
              <h4 class="text-center text-secondary">
                Select the parameters on the left to estimate your rent
              </h4>
            </template>
            <template v-else>
              <h4 class="text-center">
                For these parameters, your rent will probably fall in the range
                between
              </h4>
              <b-row class="my-5">
                <b-col class="text-right col-5 display-4 text-success"
                  >{{ results.lower_bound }}€</b-col
                >
                <b-col class="text-center my-auto display-4"><hr /></b-col>
                <b-col class="text-left col-5 display-4 text-danger"
                  >{{ results.upper_bound }}€</b-col
                >
              </b-row>
              <p class="text-center text-secondary">
                These estimates are based on the analysis of rental offers of
                flats.
              </p>
            </template>
          </template>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable camelcase */
import gql from 'graphql-tag'
import { client } from '@/plugins/apollo'
const API_URL = process.env.NUXT_ENV_API_URL

export default {
  async asyncData({ $axios, $content }) {
    const text = await $content('estimates').fetch()

    return { text }
  },
  data() {
    return {
      API_URL,
      form: {
        district: '',
        area: 8,
        num_rooms: 2,
        amenities: []
      },
      show: true,
      results: null,
      loading: false,
      districts: []
    }
  },
  computed: {
    areaState() {
      return this.form.area >= 8 && this.form.area <= 2000
    }
  },
  async mounted() {
    const {
      data: { districts_berlin }
    } = await client.query({
      query: gql`
        {
          districts_berlin(distinct_on: district) {
            district
          }
        }
      `
    })
    const districts = districts_berlin.map((d) => d.district)
    districts.unshift({
      value: null,
      text: 'Please select the desired district'
    })
    this.districts = districts
  },
  methods: {
    async onSubmit(evt) {
      this.loading = true
      evt.preventDefault()
      const formData = this.prepareForm(this.form)
      await this.submit(JSON.stringify(formData))
      this.loading = false
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.district = ''
      this.form.area = 8
      this.form.num_rooms = 2
      this.form.amenities = []
      this.results = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    prepareForm(formData) {
      const { amenities } = formData
      const balcony = 'balcony' in amenities ? 1 : 0
      const cellar = 'cellar' in amenities ? 1 : 0
      const kitchen = 'kitchen' in amenities ? 1 : 0
      const elevator = 'elevator' in amenities ? 1 : 0
      const ground_floor = 'ground_floor' in amenities ? 1 : 0
      return {
        ...formData,
        balcony,
        cellar,
        kitchen,
        elevator,
        ground_floor
      }
    },
    async submit(formData) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
      try {
        const response = await this.$axios.$post(
          `${API_URL}/get-estimate`,
          formData,
          config
        )
        this.results = response
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped></style>
