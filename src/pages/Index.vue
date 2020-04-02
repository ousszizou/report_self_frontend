<template>
  <Layout>
    <div class="pt-8 md:pt-24 px-6 lg:px-16">
      <div class="flex px-6 md:px-4">
        <div class="w-full lg:w-1/2">
          <p class="text-left font-light text-base leading-relaxed tracking-wide">
          Aidez-nous à combattre le nouveau Coronavirus en Suisse en nous communiquant votre état de santé.<br><br>
          Nous souhaitons fournir une visualisation de la progression du Covid-19 dans notre pays. Comment pouvons-nous 'applanir la courbe' sans avoir une représentation statistique de la situation actuelle? Aidez-nous en publiant votre état de santé
          </p>
          <h2 class="text-3xl mt-6 text-ui-primary">Comment allez-vous?</h2>
          <div class="flex mt-8">
            <button class="flex items-center text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 font-bold leading-none text-white border rounded-full shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none" @click="startGoodReport">
              <HeartIcon class="mr-4" size="1x" />
              je vais bien
            </button>
            <button class="flex items-center ml-4 text-sm sm:text-base px-4 sm:px-4 sm:px-6 py-3 sm:py-4 font-bold leading-none text-white border rounded-full shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none" @click="startBadReport">
              <FrownIcon class="mr-4" size="1x" />
              je suis malade
            </button>
          </div>
          <div class="flex flex-col mt-6" v-if="GoodReportOpen || BadReportOpen">
            <div>
              <h3  v-if="GoodReportOpen">
                Avez-vous été infecté par le Covid-19 puis guéri?
              </h3>
              <h3 v-if="BadReportOpen">
                Quels sont vos symptômes?
              </h3>
              <multiselect
                v-if="BadReportOpen"
                v-model="report.diagnose.symptoms" 
                :options="symptomsList"
                :multiple="true"
                :preselect-first="false"
                placeholder="Select you symptoms"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                track-by="name"
                label="name"
                :showNoResults="true"
                :limit="3"
                :limitText="count => `and ${count} more`"
                class="shadow-xs focus:outline-none"
              />
              <h3 class="mt-6" v-if="BadReportOpen">Quel est votre diagnostic?</h3>
              <p v-if="BadReportOpen">
                Au vu de vos contacts sociaux récents, pensez-vous avoir contracté le Covid-19 ?
              </p>
              <div>
                <button class="font-bold text-base mx-2 px-3 py-1 uppercase border rounded-sm shadow-lg focus:bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:text-white" @click="nonAnswerHandler">non</button>
                <button class="font-bold text-base mx-2 px-3 py-1 uppercase  rounded-sm shadow-lg focus:bg-btn-green border  border-ui-primary focus:outline-none focus:border-btn-green transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:text-white" @click="probAnswerHandler">probablement</button>
                <button class="font-bold text-base mx-2 px-3 py-1 uppercase border rounded-sm shadow-lg focus:bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:bg-btn-red focus:border-btn-red focus:text-white" @click="ouiAnswerHandler">c'est officiel</button>
              </div>
              <div class="mt-6 text-xs" v-if="nonAnswer && GoodReportOpen">
                <p>
                  Super! Restez à la maison même si vous n'êtes pas malade pour éviter la propagation du virus.
                </p>
              </div>
              <div class="mt-6 text-xs" v-if="probAnswer && GoodReportOpen"></div>
              <div class="mt-6 text-xs" v-if="ouiAnswer && GoodReportOpen">
                <p>
                  oui
                </p>
              </div>
              <div class="mt-6">
                <h3>
                  Où vivez-vous ?
                </h3>
                <multiselect 
                  v-model="report.selectedCity" 
                  :options="cities"
                  :showNoResults="true"
                  :multiple="false"
                  :preselect-first="false"
                  placeholder="Choisissez votre région"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  track-by="city"
                  label="city"
                  class="shadow-xs focus:outline-none"
                />
                <button class="mt-6 flex items-center text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 font-bold leading-none text-white border rounded-full shadow-lg text-ui-primary border-ui-primary transition-all duration-200 ease-out transform uppercase hover:shadow-xl hover:-translate-y-1 focus:outline-none" @click="sendReport">
                  <SendIcon class="mr-4" size="1x" />
                  Envoyer
                </button>
              </div>
            </div>
          </div>
          <div class="mt-4 p-2 bg-alert-lighter items-center text-white leading-none rounded-full flex lg:inline-flex" role="alert">
            <AlertCircleIcon size="2x" class="text-white mr-2" />
            <span class="text-xs sm:text-sm font-semibold mr-2 text-left flex-auto">Nous n'enregistrons aucune information personnelle sur nos serveurs !</span>
          </div>
        </div>
        <div class="hidden lg:block md:w-1/2">
          <img src="../assets/corona-1.svg" alt="covid19-wallpaper" class="w-4/5 my-0 ml-auto mr-0">
        </div>
      </div>

      <div class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>
      <div class="flex flex-wrap justify-center -mx-4">
        <div class="flex flex-col items-center w-full px-4 mb-8 text-center w-full">
          <SmileIcon size="5x" class="text-ui-primary" />
          <h1 class="text-4xl text-center lg:text-5xl text-ui-primary tracking-wide">
            Merci pour votre soutien!
          </h1>
          <p class="text-base sm:text-lg text-center font-semibold">
            Contactez-nous sur l'une de ces plateformes.
          </p>
          <div class="flex">
            <a v-if="settings.twitter" :href="settings.twitter" class="ml-3 sm:block" target="_blank" rel="noopener noreferrer" title="Twitter" name="Twitter">
              <TwitterIcon size="1.5x" />
            </a>
            <a v-if="settings.github" :href="settings.github" class="ml-3 sm:block" target="_blank" rel="noopener noreferrer" title="Github" name="Github">
              <GithubIcon size="1.5x" />
            </a>
            <a v-if="settings.linkedin" :href="settings.linkedin" class="ml-3 sm:block" target="_blank" rel="noopener noreferrer" title="linkedin" name="linkedin">
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
      github
      twitter
    }
  }
  cities: allCities {
    edges {
      node {
        records {
          city
          lat
          long
        }
      }
    }
  }
}
</static-query>


<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import Logo from '@/components/Logo';
import { HeartIcon, CodeIcon, MoonIcon, SearchIcon, FrownIcon, AlertCircleIcon, SmileIcon, TwitterIcon, GithubIcon, LinkedinIcon, SendIcon } from 'vue-feather-icons';

export default {
  components: {
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
    GithubIcon,
    LinkedinIcon
  },

  data() {
    return {
      GoodReportOpen: false,
      BadReportOpen: false,
      nonAnswer: false,
      probAnswer: false,
      ouiAnswer: false,
      report: {
        selectedCity: null,
        diagnose: {
          sick: null,
          infection: null,
          symptoms: null
        },
      },
      symptomsList: [
        { name: "Fièvre (plus de 38°C)" },
        { name: "Toux (sèche)" },
        { name: "Vomissements" },
        { name: "Détresse respiratoire" },
        { name: "Fatigue" },
        { name: "Maux de tête" },
        { name: "Rhume" },
        { name: "Diarrhée" },
        { name: "Troubles du goût ou de l'odorat" },
        { name: "Autres" },
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
      const data = {
        reportInformations: this.report.selectedCity,
        diagnose: this.report.diagnose
      }
      try {
        await axios.post('http://ec2-35-180-218-202.eu-west-3.compute.amazonaws.com:5000/api/v1/reports', data)
        this.clearInputs()
      } catch (error) {
        console.log(error)
        this.clearInputs()
      }
    }
  },
  computed: {
    meta() {
      return this.$static.metadata;
    },
    settings() {
      return this.meta.settings;
    },
    cities() {
      return this.$static.cities.edges[0].node.records
    }
  },
  metaInfo() {
    const title = 'France Covid-19';
    const description = 'Self health reporting tool for the Covid-19 pandemic in France';

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ]
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
