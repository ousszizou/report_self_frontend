<template>
  <Layout>
    <div class="pt-8 md:pt-24 px-6 lg:px-16">
      <div class="flex px-6 md:px-4">
        <div class="w-full lg:w-1/2">
          <p class="text-right font-light text-base leading-relaxed tracking-wide">
            ساعدونا في مكافحة فيروس كورونا الجديد في الجزائر بإخبارنا عن حالتك.
            <br />
            <br />نريد أن نقدم تصورًا لتقدم Covid-19 في بلدنا. كيف يمكننا "تسوية المنحنى" بدون تمثيل إحصائي للوضع الحالي؟ ساعدنا بنشر حالتك الصحية
          </p>
          <h2 class="text-3xl mt-6 text-ui-primary">كيف حالك؟</h2>
          <div class="flex mt-8">
            <button
              class="flex items-center text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 font-bold leading-none text-white border rounded-full shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none"
              @click="startGoodReport"
            >
              أنا بخير
              <HeartIcon class="mr-2" size="1x" />
            </button>
            <button
              class="flex items-center mr-4 text-sm sm:text-base px-4 sm:px-4 sm:px-6 py-3 sm:py-4 font-bold leading-none text-white rounded-full shadow-lg transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none"
              @click="startBadReport"
              style="background-color: #ff5722"
            >
              أنا مريض
              <FrownIcon class="mr-2" size="1x" />
            </button>
          </div>
          <div
            class="flex flex-col mt-6"
            v-if="GoodReportOpen || BadReportOpen"
          >
            <div>
              <h3 v-if="GoodReportOpen">
                هل أصبت بـ Covid-19 ثم شفيت؟
              </h3>
              <h3 v-if="BadReportOpen">ما هي أعراضك ؟</h3>
              <multiselect
                v-if="BadReportOpen"
                v-model="report.diagnose.symptoms"
                :options="symptomsList"
                :multiple="true"
                :preselect-first="false"
                placeholder="إختر الأعراض الظاهرة عليك"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                track-by="name"
                label="name"
                :showNoResults="true"
                :limit="3"
                :limitText="count => `و ${count} آخرين`"
                class="shadow-xs focus:outline-none"
              />
              <h3 class="mt-6" v-if="BadReportOpen">
                ما هو تشخيصك؟
              </h3>
              <p v-if="BadReportOpen">
                في ضوء اتصالاتك الاجتماعية الأخيرة ، هل تعتقد أنك أصبت بـ Covid-19؟
              </p>
              <div>
                <button
                  class="font-bold text-base mx-2 px-3 py-1 uppercase border rounded-sm shadow-lg focus:bg-btn-blue focus:border-btn-blue border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:text-white"
                  @click="nonAnswerHandler"
                >
                  لا
                </button>
                <button
                  class="font-bold text-base mx-2 px-3 py-1 uppercase rounded-sm shadow-lg focus:bg-btn-green border border-ui-primary focus:outline-none focus:border-btn-green transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:text-white"
                  @click="probAnswerHandler"
                >
                  لا أدري
                </button>
                <button
                  class="font-bold text-base mx-2 px-3 py-1 my-3 uppercase border rounded-sm shadow-lg focus:bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:bg-btn-red focus:border-btn-red focus:text-white"
                  @click="ouiAnswerHandler"
                >
                  نعم
                </button>
              </div>
              <div class="mt-6 text-xs" v-if="nonAnswer && GoodReportOpen">
                <p>
                  عظيم! إبق في المنزل حتى لو لم تكن مريضا لتجنب إنتشار الفيروس.
                </p>
              </div>
              <div
                class="mt-6 text-xs"
                v-if="probAnswer && GoodReportOpen"
              ></div>
              <div class="mt-6">
                <h3>أين تعيش الآن؟</h3>
                <multiselect
                  v-model="report.selectedCity.wilaya"
                  :options="wilayas"
                  :showNoResults="true"
                  :multiple="false"
                  :preselect-first="false"
                  placeholder="إخـــتر الولاية"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :preserve-search="true"
                  track-by="nom"
                  label="nom"
                  class="shadow-xs focus:outline-none mb-3"
                />
                <multiselect
                  v-model="report.selectedCity.city"
                  :options="citiesOfwilaya"
                  :showNoResults="true"
                  :multiple="false"
                  :preselect-first="false"
                  placeholder="إختر المنطقة التي تقطن فيها"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :preserve-search="true"
                  track-by="nom"
                  label="nom"
                  class="shadow-xs focus:outline-none"
                />
                <button
                  class="mt-6 flex items-center text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 font-bold leading-none text-white border rounded-full shadow-lg text-ui-primary border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="sendReport"
                  :disabled="true ? !fieldsNotEmpty : false"
                >
                  <pulse-loader
                    :loading="loading"
                    :color="spinnerColor"
                    size="10px"
                    class="px-6"
                  ></pulse-loader>
                  <span v-if="!loading">
                    أرسل
                    <SendIcon class="mr-2 inline" size="1x" /></span
                  >
                </button>
              </div>
            </div>
          </div>
          <div
            class="mt-4 p-2 bg-alert-lighter items-center text-white leading-none rounded-full flex lg:inline-flex sm:w-4/5 md:w-3/4 lg:w-full xl:w-3/4"
            role="alert"
          >
            <AlertCircleIcon size="2x" class="text-white mr-2" />
            <span
              class="text-xs sm:text-sm font-semibold mr-2 text-right flex-auto px-2"
              >نحن لا نحتفظ بأي معلومات شخصية على خوادمنا!</span
            >
          </div>
        </div>
        <div class="hidden lg:block md:w-1/2">
          <img
            src="../assets/corona-1.svg"
            alt="covid19-wallpaper"
            class="w-4/5 my-0 mr-auto ml-0"
          />
        </div>
      </div>

      <div
        class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"
      ></div>
      <div class="flex flex-wrap justify-center -mx-4">
        <div
          class="flex flex-col items-center w-full px-4 mb-8 text-center w-full"
        >
          <SmileIcon size="5x" class="text-ui-primary" />
          <h1
            class="text-4xl text-center lg:text-5xl text-ui-primary tracking-wide"
          >
            شكرا لدعمكم!
          </h1>
          <p class="text-base sm:text-lg text-center font-semibold">
            اتصل بنا على إحدى هذه المنصات.
          </p>
          <div class="flex">
            <a
              v-if="settings.twitter"
              :href="settings.twitter"
              class="ml-3 sm:block"
              target="_blank"
              rel="noopener noreferrer"
              title="تويتر"
              name="Twitter"
            >
              <TwitterIcon size="1.5x" />
            </a>
            <a
              v-if="settings.linkedin"
              :href="settings.linkedin"
              class="ml-3 sm:block"
              target="_blank"
              rel="noopener noreferrer"
              title="لينكد إن"
              name="linkedin"
            >
              <LinkedinIcon size="1.5x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<static-query>
query {
  metadata {
    siteName
    settings {
      linkedin
      twitter
    }
  }
  wilayas: allWilayas {
    edges{
      node{
        data{code nom}
      }
    }
  }
  cities: allCities {
    edges{
      node{
        data{id wilaya_id nom longitude latitude code_postal}
      }
    }
  }
}
</static-query>

<script>
import axios from "axios"
import Multiselect from "vue-multiselect"
import Logo from "@/components/Logo"
import {
  HeartIcon,
  CodeIcon,
  MoonIcon,
  SearchIcon,
  FrownIcon,
  AlertCircleIcon,
  SmileIcon,
  TwitterIcon,
  LinkedinIcon,
  SendIcon
} from "vue-feather-icons"

import PulseLoader from "vue-spinner/src/PulseLoader.vue"

export default {
  components: {
    PulseLoader,
    Multiselect,
    SendIcon,
    Logo,
    HeartIcon,
    CodeIcon,
    MoonIcon,
    SearchIcon,
    FrownIcon,
    AlertCircleIcon,
    SmileIcon,
    TwitterIcon,
    LinkedinIcon
  },

  data() {
    return {
      loading: false,
      disable: true,
      spinnerColor: "var(--color-ui-primary)",
      GoodReportOpen: false,
      BadReportOpen: false,
      nonAnswer: false,
      probAnswer: false,
      ouiAnswer: false,
      report: {
        selectedCity: {
          wilaya: null,
          city: null
        },
        diagnose: {
          sick: null,
          infection: null,
          symptoms: null
        }
      },
      symptomsList: [
        { name: "حمى (درجة حرارة أكبر من 38)" },
        { name: "سُعال" },
        { name: "التقيؤ" },
        { name: "ضيق في التنفس" },
        { name: "الإرهاق و التعب" },
        { name: "صداع" },
        { name: "زكام" },
        { name: "الإسهال" },
        { name: "اضطرابات في التذوق أو الشم" },
        { name: "أعراض أخرى" }
      ]
    }
  },
  methods: {
    startGoodReport() {
      this.GoodReportOpen = true
      this.BadReportOpen = false
      this.report.diagnose.sick = false
    },
    startBadReport() {
      this.GoodReportOpen = false
      this.BadReportOpen = true
      this.report.diagnose.sick = true
    },
    clearInputs() {
      this.report.selectedCity = ""
      this.report.diagnose.infection = null
      this.report.diagnose.sick = null
    },
    nonAnswerHandler() {
      this.nonAnswer = true
      this.probAnswer = false
      this.ouiAnswer = false
      this.report.diagnose.infection = "non"
    },
    probAnswerHandler() {
      this.nonAnswer = false
      this.probAnswer = true
      this.ouiAnswer = false
      this.report.diagnose.infection = "inconnue"
    },
    ouiAnswerHandler() {
      this.nonAnswer = false
      this.probAnswer = false
      this.ouiAnswer = true
      this.report.diagnose.infection = "oui"
    },
    async sendReport() {
      this.loading = true
      const data = {
        reportInformations: this.report.selectedCity,
        diagnose: this.report.diagnose
      }
      try {
        await axios.post(
          "http://localhost:5000/api/v1/reports/dz",
          data
        )
        this.clearInputs()
        this.$swal(
          "!شكرا لتفهمكم",
          "!كن متفائلاً وكل شيء سيكون على ما يرام",
          "success",
          {
            button: "حسـنا"
          }
        )
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$swal(
          "!أووه",
          "حدثت مشكلة غير متوقعة. حاول مرة أخرى",
          "error",
          {
            button: "حسـنا"
          }
        )
        this.clearInputs()
      }
    }
  },
  computed: {
    meta() {
      return this.$static.metadata
    },
    settings() {
      return this.meta.settings
    },
    cities() {
      return this.$static.cities.edges[0].node.data
    },
    wilayas() {
      return this.$static.wilayas.edges[0].node.data
    },
    citiesOfwilaya() {
      const wilaya_code = this.report.selectedCity.wilaya != null ? this.report.selectedCity.wilaya.code : null
      if (wilaya_code == null) {
        return this.cities
      } else {
        return this.cities.filter(city => city.wilaya_id === wilaya_code)
      }
    },
    fieldsNotEmpty() {
      const size =
        this.report.selectedCity != null
          ? Object.getOwnPropertyNames(this.report.selectedCity).length
          : false
      return size > 1 && this.report.diagnose.infection != null
    }
  },
  metaInfo() {
    const title = "الجزائـر"
    const description =
      "أداة الإبلاغ الذاتي عن جائحة Covid-19 في الجزائر"
    return {
      title: title,
      meta: [
        {
          name: "description",
          content: description
        },
        {
          key: "og:title",
          name: "og:title",
          content: title
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: title
        },
        {
          key: "og:description",
          name: "og:description",
          content: description
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: description
        }
      ]
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
