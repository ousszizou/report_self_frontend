<template>
  <Layout>
    <div class="pt-8 md:pt-24 px-6 lg:px-16">
      <div class="flex flex-col px-6 md:px-4">
        <div>
          <h1>Consulter</h1>
          <div
            class="px-1 py-1 items-center text-white leading-none rounded-full flex lg:inline-flex"
            role="alert"
          >
            <AlertCircleIcon size="2x" class="text-alert-lighter mr-2" />
            <span class="text-xs font-semibold mr-2 text-left flex-auto text-alert-lighter">
              Les données suivantes ont été reportées par la communauté et
              n'ont pas été vérifiées.
            </span>
          </div>
        </div>
        <div class="mt-6">
          <flat-pickr
            placeholder="Select date"
            v-model="date"
            :config="config"
            
            class="rounded-full px-6 py-3 focus:outline-none shadow-md border border-gray-400 w-1/2 text-gray-700"
          />
        </div>
        <div class="mt-6" style="height: 500px">
          <ClientOnly>
            <l-map
              style="height: 100%; width: 100%"
              :zoom="zoom"
              :center="center"
              @update:zoom="zoomUpdated"
              @update:center="centerUpdated"
              :key="date"
            >
              <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              <l-circle
                v-for="report in reports"
                :key="report.city"
                :lat-lng="getGeo(report.latitude,report.longitude)"
                :radius="circle.radius"
                :stroke="false"
                :opacity="0.5"
                :fill="true"
                :fillOpacity="0.4"
                fillColor="#ff5722"
              >
                <l-popup>
                  <h3>{{report.city}}</h3>
                  <br />
                  <ul>
                    <li>
                      <span class="font-bold text-statshealtyhcolor">{{report.healthy}} </span>
                      <span>En bonne santé</span>
                    </li>
                    <li>
                      <span class="font-bold text-statscovidcolor">{{report.sicks}}  </span>
                      <span>Covid-19</span>
                    </li>
                  </ul>
                </l-popup>
              </l-circle>
              <l-geo-json :geojson="geojson"></l-geo-json>
            </l-map>
          </ClientOnly>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>

import { AlertCircleIcon } from "vue-feather-icons";
// import L from "leaflet";
// import {
//   LMap,
//   LTileLayer,
//   LMarker,
//   LCircle,
//   LPopup,
//   LGeoJson
// } from "vue2-leaflet";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    AlertCircleIcon,
    // LMap,
    // LTileLayer,
    // LMarker,
    // LCircle,
    // LPopup,
    // LGeoJson
  },
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      config: {
        minDate: "2020-04-02",
        maxDate: "today"
      },
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 5,
      center: [46.85, 2.3518], // France Map Center
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      circle: {
        center: [43.285413, 5.37606],
        radius: 20000
      },
      reports: null,
      geojson: {
        type: "Feature",
        id: "FRA",
        properties: {
          name: "France",
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [9.560016, 42.152492],
                [9.229752, 41.380007],
                [8.775723, 41.583612],
                [8.544213, 42.256517],
                [8.746009, 42.628122],
                [9.390001, 43.009985],
                [9.560016, 42.152492]
              ]
            ],
            [
              [
                [3.588184, 50.378992],
                [4.286023, 49.907497],
                [4.799222, 49.985373],
                [5.674052, 49.529484],
                [5.897759, 49.442667],
                [6.18632, 49.463803],
                [6.65823, 49.201958],
                [8.099279, 49.017784],
                [7.593676, 48.333019],
                [7.466759, 47.620582],
                [7.192202, 47.449766],
                [6.736571, 47.541801],
                [6.768714, 47.287708],
                [6.037389, 46.725779],
                [6.022609, 46.27299],
                [6.5001, 46.429673],
                [6.843593, 45.991147],
                [6.802355, 45.70858],
                [7.096652, 45.333099],
                [6.749955, 45.028518],
                [7.007562, 44.254767],
                [7.549596, 44.127901],
                [7.435185, 43.693845],
                [6.529245, 43.128892],
                [4.556963, 43.399651],
                [3.100411, 43.075201],
                [2.985999, 42.473015],
                [1.826793, 42.343385],
                [0.701591, 42.795734],
                [0.338047, 42.579546],
                [-1.502771, 43.034014],
                [-1.901351, 43.422802],
                [-1.384225, 44.02261],
                [-1.193798, 46.014918],
                [-2.225724, 47.064363],
                [-2.963276, 47.570327],
                [-4.491555, 47.954954],
                [-4.59235, 48.68416],
                [-3.295814, 48.901692],
                [-1.616511, 48.644421],
                [-1.933494, 49.776342],
                [-0.989469, 49.347376],
                [1.338761, 50.127173],
                [1.639001, 50.946606],
                [2.513573, 51.148506],
                [2.658422, 50.796848],
                [3.123252, 50.780363],
                [3.588184, 50.378992]
              ]
            ]
          ],
        }
      }
    };
  },
  async mounted() {
    window.L = require('leaflet')
    const { data } = await axios.get(
      `http://ec2-35-180-218-202.eu-west-3.compute.amazonaws.com:5000/api/v1/reports?date=${this.date}`
    );
    this.reports = data;
  },
  watch: {
    date: async function(val) {
      const { data } = await axios.get(
      `http://ec2-35-180-218-202.eu-west-3.compute.amazonaws.com:5000/api/v1/reports?date=${val}`
      );
      this.reports = data;
    }
  },
  methods: {
    getGeo(lat, long) {
      return L.latLng(lat, long);
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    }
  }
};
</script>
