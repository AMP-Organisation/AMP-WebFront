<template lang="">
  <div>
    <IconAndTitle :title="intro" :icon="'notifications'"/>
  </div>
</template>
<script>
// import { axiosInstance } from 'boot/axios'
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'notifications_page',
  data () {
    return {
      intro: 'page des notifications de l\'utilisateur'
    }
  },
  components: {
    IconAndTitle
  },
  created () {
    console.log('page créé')
  }
}
</script>
