<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <img alt="Real Estate Care logo" class="logo" src="./assets/images/RealEstateCare_logo_v.svg" width="240" height="152" />
      <HelloWorld msg="Hello world!" />
    </div>
  </header>

  <main>
    
  </main>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
  }

  header .wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>
