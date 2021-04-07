<template lang="">
    <div>
        {{ intro }}
    </div>
</template>
<script>
export default {
  name: 'medicine_page',
  data () {
    return {
      intro: 'la page de medicament'
    }
  },
  created () {
    console.log('medicine page created')
  }
}
</script>
<style lang="">
</style>
