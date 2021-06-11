<template>
  <div>
    <div class="q-ml-md q-mt-md q-mb-md">
      <div class="row justify-left">
        <div class="col-1">
          <q-icon v-bind:name="this.icon" :color="this.color" :size="'xl'" />
        </div>
        <div class="col-11">
          <div class="text-h4">{{ title | upperFirstChar }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'IconAndTitle',
  props: {
    title: {
      type: String,
      default: 'default title'
    },
    icon: {
      type: String,
      default: 'insert_emoticon'
    },
    color: {
      type: String,
      default: 'info'
    }
  },
  data () {
    return {
      intro: 'icon and title component'
    }
  },
  filters: {
    upperFirstChar: function (str) {
      return str.replace(str.charAt(0), str.charAt(0).toUpperCase())
    }
  }
}
</script>

<style>

</style>
