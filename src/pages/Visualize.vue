<template>
  <Layout>
    <div class="pt-8 md:pt-24 px-6 lg:px-16">
      <div class="flex flex-col px-6 md:px-4">
        <div>
          <h1>الخريطة</h1>
          <div
            class="px-1 py-1 items-center text-white leading-none rounded-full flex lg:inline-flex"
            role="alert"
          >
            <AlertCircleIcon size="2x" class="text-alert-lighter mr-2" />
            <span
              class="text-xs font-semibold mr-2 text-left flex-auto text-alert-lighter"
            >تم الإبلاغ عن البيانات التالية من قبل المجتمع و لم يتم التحقق منها.</span>
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
        <div class="mt-6 z-1" style="height: 500px">
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
                  <h4>الولاية {{report.wilaya}}</h4>
                  <h5 class="font-bold">المدينة {{report.city}}</h5>
                  <br />
                  <ul>
                    <li>
                      <span>غير مصاب </span>
                      <span class="font-bold text-statshealtyhcolor">{{report.healthy}}</span>
                    </li>
                    <li>
                      <span>مصاب </span>
                      <span class="font-bold text-statscovidcolor">{{report.sicks}}</span>
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
import "leaflet/dist/leaflet.css";
import axios from "axios";
import moment from "moment";

export default {
  metaInfo: {
    title: "Consulter"
  },
  components: {
    AlertCircleIcon
  },
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      config: {
        minDate: "2020-04-07",
        maxDate: "today"
      },
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 5,
      center: [28.033886, 1.659626], // Algeria Map Center
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      circle: {
        center: [43.285413, 5.37606],
        radius: 20000
      },
      reports: null,
      geojson: {
        type: "Feature",
        properties: {
          name: "Algeria",
          code: "DZA",
          group: "Countries"
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [11.999506, 23.471668],
              [8.572893, 21.565661],
              [5.677566, 19.601207],
              [4.267419, 19.155265],
              [3.158133, 19.057364],
              [3.146661, 19.693579],
              [2.683588, 19.85623],
              [2.060991, 20.142233],
              [1.823228, 20.610809],
              [-1.550055, 22.792666],
              [-4.923337, 24.974574],
              [-8.6844, 27.395744],
              [-8.665124, 27.589479],
              [-8.66559, 27.656426],
              [-8.674116, 28.841289],
              [-7.059228, 29.579228],
              [-6.060632, 29.7317],
              [-5.242129, 30.000443],
              [-4.859646, 30.501188],
              [-3.690441, 30.896952],
              [-3.647498, 31.637294],
              [-3.06898, 31.724498],
              [-2.616605, 32.094346],
              [-1.307899, 32.262889],
              [-1.124551, 32.651522],
              [-1.388049, 32.864015],
              [-1.733455, 33.919713],
              [-1.792986, 34.527919],
              [-2.169914, 35.168396],
              [-1.208603, 35.714849],
              [-0.127454, 35.888662],
              [0.503877, 36.301273],
              [1.466919, 36.605647],
              [3.161699, 36.783905],
              [4.815758, 36.865037],
              [5.32012, 36.716519],
              [6.26182, 37.110655],
              [7.330385, 37.118381],
              [7.737078, 36.885708],
              [8.420964, 36.946427],
              [8.217824, 36.433177],
              [8.376368, 35.479876],
              [8.140981, 34.655146],
              [7.524482, 34.097376],
              [7.612642, 33.344115],
              [8.430473, 32.748337],
              [8.439103, 32.506285],
              [9.055603, 32.102692],
              [9.48214, 30.307556],
              [9.805634, 29.424638],
              [9.859998, 28.95999],
              [9.683885, 28.144174],
              [9.756128, 27.688259],
              [9.629056, 27.140953],
              [9.716286, 26.512206],
              [9.319411, 26.094325],
              [9.910693, 25.365455],
              [9.948261, 24.936954],
              [10.303847, 24.379313],
              [10.771364, 24.562532],
              [11.560669, 24.097909],
              [11.999506, 23.471668]
            ]
          ]
        },
        _id: "algeria"
      }
    };
  },
  async mounted() {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/reports/dz?date=${this.date}`
    );
    this.reports = data;
  },
  watch: {
    date: async function(val) {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/reports/dz?date=${val}`
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
