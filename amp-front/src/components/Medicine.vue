<template lang="">
    <div>
          <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{name}}</div>
            <div class="text-subtitle2">sous titre</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>Remove Card</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Send Feedback</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Share</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        {{ description }}
      </q-card-section>

      <q-separator />

      <q-card-actions class="justify-end" >
        <q-btn flat>Action 1</q-btn>
        <q-btn color="positive" icon="add" />
      </q-card-actions>
    </q-card>
    </div>
</template>
<script>
export default {
  name: 'Medicine',
  props: {
    name: {
      type: String,
      default: 'default name medicine'
    },
    description: {
      type: String,
      default: 'defult for description for medicine'
    }
  },
  data () {
    return {
      intro: 'bienvenu dans le composant medicament',
      lorem: 'lorem ipsum dollor et etcetera'
    }
  }
}
</script>
<style lang="">

</style>
