<script setup lang="ts">
import UrlInput from './components/UrlInput.vue'
</script>

<template>
  <header class="header glass">
    <h1>URL shortener</h1>
  </header>
  <UrlInput placeholder="https://daviiduhh.com/" />
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

.footer {
  width: 100%;
  padding: 1rem;
}
</style>
