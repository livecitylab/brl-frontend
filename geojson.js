const fs = require('fs')
const gql = require('graphql-tag')
const geojson2svg = require('geojson2svg')
const converter = geojson2svg()

const { ApolloClient, InMemoryCache, HttpLink } = require('apollo-boost')
const fetch = require('node-fetch')
const cache = new InMemoryCache()

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    fetch,
    uri: 'https://berlinrentslive-hasura.herokuapp.com/v1/graphql'
  })
})

async function getDistricts() {
  const {
    data: { districts_berlin: districts }
  } = await client.query({
    query: gql`
      {
        districts_berlin {
          postcode
          district
        }
      }
    `
  })
  return districts
}

const geojson = JSON.parse(fs.readFileSync('./plz.geojson', 'utf-8'))
const plzs = []
for (const feature of geojson.features) {
  plzs.push(feature.properties.spatial_name)
}

getDistricts()
  .then((districts) => {
    for (const i in plzs) {
      const plz = plzs[i]
      const district = districts.find(
        (district) => district.postcode === parseInt(plz)
      )
      if (district) {
        geojson.features[i].properties.district = district.district
      }
    }
  })
  // .then(() =>
  //   fs.writeFile(
  //     'plz_district.geojson',
  //     JSON.stringify(geojson),
  //     'utf8',
  //     function(err) {
  //       console.log(err)
  //     }
  //   )
  // )
  .then(() => {
    const reproject = require('reproject-spherical-mercator')
    const reprojected_geojson = reproject(geojson)
    const svgStrings = converter.convert(reprojected_geojson, {
      attributes: [
        {
          property: 'properties.district',
          type: 'dynamic',
          key: 'district'
        },
        {
          property: 'properties.spatial_name',
          type: 'dynamic',
          key: 'id'
        }
      ],
      explode: true
    })

    for (const i in svgStrings) {
      // console.log(svgStrings[i])
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">${svgStrings[i]}</svg>`
      const district = reprojected_geojson.features[i].properties.spatial_name
      fs.writeFile(`./assets/districts/${district}.svg`, svg, function(err) {
        if (err) return console.error(err)
      })
    }
  })
