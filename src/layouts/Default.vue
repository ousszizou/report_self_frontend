<template>
  <div class="font-sans antialiased text-ui-typo bg-ui-background" dir="rtl">
    <div class="flex flex-col justify-start min-h-screen">
      <header
        ref="header"
        class="sticky top-0 z-10 w-full border-b bg-ui-background border-ui-border"
      >
        <LayoutHeader />
      </header>

      <main class="container relative flex flex-wrap justify-start flex-1 w-full bg-ui-background">
        <div class="w-full md:pb-16">
          <slot />
        </div>
      </main>
    </div>
    <footer class="flex justify-center text-center mt-8">
      <p class="text-xs sm:text-base">
        صنع بالحب
        <HeartIcon size="1x" class="inline text-ui-primary" /> من طرف
        <a
          href="https://www.linkedin.com/in/omarabdelmalek/"
          target="_blank"
          class="font-bold text-ui-primary"
        >Om_A</a> و
        <a
          href="https://www.linkedin.com/in/oussama-djaidri-ab2143149/"
          target="_blank"
          class="font-bold text-ui-primary"
        >Ou_D </a>جميع الحقوق محفوظة © 2020
      </p>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import LayoutHeader from "@/components/LayoutHeader";
import { HeartIcon } from "vue-feather-icons";

export default {
  components: {
    LayoutHeader,
    HeartIcon
  },
  metaInfo() {
    return {
      meta: [
        {
          key: "og:type",
          name: "og:type",
          content: "website"
        },
        {
          key: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          key: "og:image",
          name: "og:image",
          content: process.env.SITE_URL + "/logo.jpg"
        },
        {
          key: "twitter:image",
          name: "twitter:image",
          content: process.env.SITE_URL + "/logo.jpg"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
:root {
  --color-ui-background: theme("colors.white");
  --color-ui-typo: theme("colors.gray.700");
  --color-ui-border: theme("colors.gray.300");
  --color-ui-primary: #4caf50;
}

html[lights-out] {
  --color-ui-background: theme("colors.gray.900");
  --color-ui-typo: theme("colors.gray.100");
  --color-ui-border: theme("colors.gray.800");
  --color-ui-primary: #4caf50;

  pre[class*="language-"],
  code[class*="language-"] {
    @apply bg-ui-border;
  }
}

html:not(.multiselect) {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

/* multiselect */
.multiselect * {
  color: #35495e;
}

/* Vue2-map-leaflet */
.vue2leaflet-map * {
  color: var(--color-ui-typo);
}

.leaflet-popup-content-wrapper, .leaflet-popup-tip {
  background:var(--color-ui-background) !important;
}

.leaflet-bar a,
.leaflet-control-layers-toggle {
  background: var(--color-ui-background) !important;
}

.active:not(.titleLogo) {
  color: var(--color-ui-primary);
  border-bottom: 2px solid;
  font-weight: 700;
}

h1,
h2,
h3,
h4 {
  @apply leading-snug font-black mb-4 text-ui-typo;

  &:hover {
    a::before {
      @apply opacity-100;
    }
  }

  a {
    &::before {
      content: "#";
      margin-left: -1em;
      padding-right: 1em;
      @apply text-ui-primary absolute opacity-0 float-left;
    }
  }
}

h1 {
  @apply text-4xl;
}

h2 {
  @apply text-2xl;
}

h3 {
  @apply text-xl;
}

h4 {
  @apply text-lg;
}

a:not(.active):not(.text-ui-primary):not(.text-white) {
  @apply text-ui-typo;
}

p,
ol,
ul,
pre,
strong,
blockquote {
  @apply mb-4 text-base text-ui-typo;
}

.content {
  a {
    @apply text-ui-primary underline;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply -mt-12 pt-20;
  }

  h2 + h3,
  h2 + h2,
  h3 + h3 {
    @apply border-none -mt-20;
  }

  h2,
  h3 {
    @apply border-b border-ui-border pb-1 mb-3;
  }

  ul {
    @apply list-disc;

    ul {
      list-style: circle;
    }
  }

  ol {
    @apply list-decimal;
  }

  ol,
  ul {
    @apply pl-5 py-1;

    li {
      @apply mb-2;

      p {
        @apply mb-0;
      }

      &:last-child {
        @apply mb-0;
      }
    }
  }
}

blockquote {
  @apply border-l-4 border-ui-border py-2 pl-4;

  p:last-child {
    @apply mb-0;
  }
}

code {
  @apply px-1 py-1 text-ui-typo bg-ui-primary font-mono border-b border-r border-ui-border text-sm rounded;
}

pre[class*="language-"] {
  @apply max-w-full overflow-x-auto rounded;

  & + p {
    @apply mt-4;
  }

  & > code[class*="language-"] {
    @apply border-none leading-relaxed;
  }
}

header {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

table {
  @apply text-left mb-6;

  td,
  th {
    @apply py-3 px-4;
    &:first-child {
      @apply pl-0;
    }
    &:last-child {
      @apply pr-0;
    }
  }

  tr {
    @apply border-b border-ui-border;
    &:last-child {
      @apply border-b-0;
    }
  }
}
</style>
