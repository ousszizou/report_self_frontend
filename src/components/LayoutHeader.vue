<template>
  <div class="py-2 border-t-2 border-ui-primary">
    <div class="container">
      <div class="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2 bg-ui-background">
        <div class="flex-1 flex justify-between items-center">
          <a href="#">
            <div class="flex flex-col items-center px-2 mr-auto sm:px-4 sm:flex-row">
              <g-link to="/" class="flex items-center text-ui-primary titleLogo" title="Home" exact>
                <img src="../assets/covid-19.svg" width="52px" height="52px" />
                <span
                  class="mx-2 text-2xl font-black tracking-tighter uppercase"
                >{{ meta.siteName }}</span>
                <img
                  src="../assets/algeria-flag.png"
                  alt="france flag"
                  class="ml-1"
                  width="20"
                  height="20"
                />
              </g-link>
            </div>
          </a>
        </div>

        <label for="menu-toggle" class="cursor-pointer lg:hidden block" @click="showMenu">
          <svg
            class="fill-current text-ui-typo"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>

        <input class="hidden" type="checkbox" id="menu-toggle" />

        <div
          class="flex items-center justify-end px-2 sm:px-4"
          :class="open ? 'order-1' : 'order-2'"
        >
          <a
            v-if="settings.linkedin"
            :href="settings.linkedin"
            class="hidden ml-3 lg:block"
            target="_blank"
            rel="noopener noreferrer"
            title="لينكد إن"
            name="linkedin"
          >
            <LinkedinIcon size="1.5x" />
          </a>

          <a
            v-if="settings.twitter"
            :href="settings.twitter"
            class="hidden ml-3 lg:block"
            target="_blank"
            rel="noopener noreferrer"
            title="تويتر"
            name="Twitter"
          >
            <TwitterIcon size="1.5x" />
          </a>

          <ToggleDarkMode class="lg:ml-12 active:outline-none focus:outline-none">
            <template slot="default" slot-scope="{ dark }">
              <MoonIcon v-if="dark" size="1.5x" />
              <SunIcon v-else size="1.5x" />
            </template>
          </ToggleDarkMode>
        </div>
        <div
          :class="open ? 'block order-2' : 'hidden order-1'"
          class="lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul class="lg:flex items-center justify-between text-base pt-4 lg:pt-0 mb-0">
              <g-link
                to="/"
                exact
                class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-btn-green"
              >الرئيسية</g-link>
              <g-link
                to="/visualize/"
                class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-btn-green"
              >خريطة</g-link>
              <g-link
                to="/faq/"
                class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-btn-green"
              >أسئلة</g-link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    settings {
      twitter
      linkedin
    }
  }
}
</static-query>

<script>
import ToggleDarkMode from "@/components/ToggleDarkMode";
import Logo from "@/components/Logo";
import {
  SunIcon,
  MoonIcon,
  GlobeIcon,
  TwitterIcon,
  LinkedinIcon
} from "vue-feather-icons";

export default {
  components: {
    Logo,
    ToggleDarkMode,
    SunIcon,
    MoonIcon,
    GlobeIcon,
    TwitterIcon,
    LinkedinIcon
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    meta() {
      return this.$static.metadata;
    },
    settings() {
      return this.meta.settings;
    }
  },
  methods: {
    showMenu() {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="scss">
header {
  svg:not(.feather-search) {
    &:hover {
      @apply text-ui-primary;
    }
  }
}

.nav-link {
  &.active {
    @apply text-ui-primary font-bold border-ui-primary;
  }
}
</style>
