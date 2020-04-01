// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from '~/layouts/Default.vue'

// leaflet.js styling
import "leaflet/dist/leaflet.css"
// import L from "leaflet";

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  if (isClient) {
    window.L = () => import('leaflet');
    Vue.component("l-map", () => import('vue2-leaflet').then(m => m.LMap));
    Vue.component("l-tile-layer", () => import('vue2-leaflet').then(m => m.LTileLayer));
    Vue.component("l-marker", () => import('vue2-leaflet').then(m => m.LMarker));
    Vue.component("l-circle", () => import('vue2-leaflet').then(m => m.LCircle));
    Vue.component("l-popup", () => import('vue2-leaflet').then(m => m.LPopup));
    Vue.component("l-geo-json", () => import('vue2-leaflet').then(m => m.LGeoJson));
  }

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: process.env.GRIDSOME_BASE_PATH + to.path,
    })
    next()
  })
}
