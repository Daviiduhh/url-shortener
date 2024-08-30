<script setup lang="ts">
import { ref, Ref } from "vue"
import type { BitlyErrorType, shortedLink } from './types.ts'

import UrlInput from './components/UrlInput.vue'
import ShortedLink from './components/ShortedLink.vue'
import ErrorMessage from './components/ErrorMessage.vue'

const BITLY_ERROR_TYPES: Record<BitlyErrorType, string> = {
  "INVALID_ARG_LONG_URL": "The long URL is not formatted correctly, usually because either http:// or https:// is missing.",
  "INVALID_ARG_DOMAIN": "The Short Links used a custom domain that you don't have access to.",
  "INVALID_ARG_BITLINK": "The custom back-half is not formatted correctly or uses an invalid character. Visit our article on supported characters for help.",
  "FORBIDDEN": "This is usually for Short Links that use the bit.ly domain, when your custom back-half has already been used with that domain.",
  "ALREADY_A_BITLY_LINK": "There's already a Short Link for this URL in your account.",
  "KEYWORD_OVERRIDES_LIMIT_EXCEEDED": "You've reached your monthly limit for custom back-halves.",
  "OVERRIDE_ALREADY_EXISTS": "The custom domain and custom back-half combination already exists in this account, or within the same group (for accounts with multiple groups). We still shorten links with this error, but using a random back-half.",
  "INVALID_ARG_GROUP_GUID": "The custom domain and custom back-half combination already exists in another group within the same account. We still shorten links with this error, but using a random back-half.",
  "TOO_MANY_TAGS_PER_GROUP": "You've reached your limit of 1,000 tags per account or group (for accounts with multiple groups).",
  "TOO_MANY_TAGS_PER_BITLINK": "You've exceeded the limit of 100 tags per link."
};

const errorMessage = ref(""),
  shortedUrl: Ref<shortedLink> = ref({ link: '' });

const shortUrl = (longUrl: string) => {
  fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer a37950da31400196b01a803f6deb61093ce9bec3`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ "long_url": longUrl }),
  }).then(response => response.json())
    .then(
      (data) => {
        if (data.errors !== undefined) {
          const errorKey = data.message as BitlyErrorType;
          shortedUrl.value = data

          if (errorKey in BITLY_ERROR_TYPES) {
            errorMessage.value = BITLY_ERROR_TYPES[errorKey];
          } else {
            errorMessage.value = "An unknown error occurred.";
          }

          setTimeout(() => {
            errorMessage.value = ""
          }, 5000);
          return
        }

        shortedUrl.value = data
      }
    )
    .catch(error => console.log(error))
}

</script>

<template>
  <header class="header glass">
    <h1>URL shortener</h1>
  </header>

  <main class="main">
    <UrlInput @short-url="shortUrl" placeholder="https://daviiduhh.com/" />
    <ShortedLink :shortedUrl="shortedUrl.link" v-show="shortedUrl.link !== undefined" />
    <ErrorMessage :errorMessage="errorMessage" />
  </main>

  <footer class="footer glass">
    <p>
      More in
      <a href="https://daviiduhh.com/">daviiduhh.com</a>
    </p>
  </footer>
</template>

<style scoped lang="scss">
h1 {
  margin: 0 1rem;
  background: radial-gradient(circle, #EDF1F4 0%, #C3CBDC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header {
  width: 100%;
  padding: 1rem;

  h1 {
    text-align: left;
    font-size: 2rem;
  }
}

.main {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  margin: 0 1rem;
}

.footer {
  width: 100%;
  padding: 1rem;
}
</style>
