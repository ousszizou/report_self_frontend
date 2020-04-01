<template>
  <div class="py-2 border-t-2 border-ui-primary">
    <div class="container">
      <div class="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2 bg-ui-background">
        <div class="flex-1 flex justify-between items-center">
          <a href="#">
            <div class="flex flex-col items-center px-2 mr-auto sm:px-4 sm:flex-row">
              <g-link
                to="/"
                class="flex items-center text-ui-primary"
                title="Home"
              >
                <Logo :width="40" class="text-ui-primary" />
                <span class="hidden ml-2 font-xs font-black tracking-tighter uppercase sm:block">
                  {{ meta.siteName }}
                </span>
              </g-link>
            </div>
          </a>
        </div>

        <label for="menu-toggle" class="pointer-cursor lg:hidden block">
          <svg class="fill-current text-ui-primary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>

        <input class="hidden" type="checkbox" id="menu-toggle" />

        <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
          <nav>
            <ul class="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0 mb-0">
              <g-link to="/" exact class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400">Reporter</g-link>
              <g-link to="/visualize/" class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400">Consulter</g-link>
              
              <li><a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400" href="#">FAQ</a></li>
              <li><a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400 lg:mb-0 mb-2" href="#">A propos</a></li>
            </ul>
          </nav>
        </div>

        <div class="flex items-center justify-end px-2 sm:px-4">
          <a v-if="settings.web" :href="settings.web" class="hidden ml-3 xl:block" target="_blank" rel="noopener noreferrer" title="Website" name="Website">
            <GlobeIcon size="1.5x" />
          </a>

          <a v-if="settings.twitter" :href="settings.twitter" class="hidden ml-3 xl:block" target="_blank" rel="noopener noreferrer" title="Twitter" name="Twitter">
            <TwitterIcon size="1.5x" />
          </a>

          <a v-if="settings.github" :href="settings.github" class="hidden ml-3 xl:block" target="_blank" rel="noopener noreferrer" title="Github" name="Github">
            <GithubIcon size="1.5x" />
          </a>

          <ToggleDarkMode class="xl:ml-3">
            <template slot="default" slot-scope="{ dark }">
              <MoonIcon v-if="dark" size="1.5x" />
              <SunIcon v-else size="1.5x" />
            </template>
          </ToggleDarkMode>

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
      web
      github
      twitter
    }
  }
}
</static-query>

<script>
import ToggleDarkMode from "@/components/ToggleDarkMode";
import Logo from '@/components/Logo';
import { SunIcon, MoonIcon, GlobeIcon, GithubIcon, TwitterIcon } from "vue-feather-icons";



export default {
  components: {
    Logo,
    ToggleDarkMode,
    SunIcon,
    MoonIcon,
    GlobeIcon,
    GithubIcon,
    TwitterIcon
  },

  computed: {
    meta() {
      return this.$static.metadata;
    },
    settings() {
      return this.meta.settings;
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
