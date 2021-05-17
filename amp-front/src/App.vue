<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      testValeur: 'valeur de test en global'
    }
  }
}
</script>
