<template lang="">
  <div>
    <IconAndTitle :icon="'settings'" :title="message"/>
    {{ message }}
    <div class="col">
      <div class="q-pa-md">
        <q-toggle v-model="valueOne" label="one" />
        <q-toggle v-model="valueTwo" label="two" color="green" />
        <q-toggle v-model="valueThree" label="three" color="yellow" />
        <q-toggle v-model="valueFour" label="four" color="red" />
      </div>
    </div>
  </div>
</template>
<script>
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'settings_page',
  components: {
    IconAndTitle
  },
  data () {
    return {
      message: 'setting pages to do',
      valueOne: true,
      valueTwo: true,
      valueThree: true,
      valueFour: true
    }
  }
}
</script>
