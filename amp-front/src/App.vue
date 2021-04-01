<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'AMP',
  data () {
    return {
      baseUrl: 'toto/titi'
    }
  }
}
</script>
