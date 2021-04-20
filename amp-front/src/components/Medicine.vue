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
        <q-card-section v-if="thumbnail">
          <q-img
                :src="thumbnail.img_64"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              />
        </q-card-section>
        <q-card-section v-else>
          <p>No picture to display</p>
        </q-card-section>
      <q-separator/>
      <q-card-actions class="justify-end" >
        <q-btn flat>Action 1</q-btn>
        <q-btn color="positive" icon="add" />
      </q-card-actions>
    </q-card>
    </div>
</template>
<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'Medicine',
  props: {
    med: {
      type: Object,
      default: undefined
    },
    id: {
      type: Number
    },
    name: {
      type: String,
      default: 'default name medicine'
    },
    description: {
      type: String,
      default: 'default for description for medicine'
    },
    fullCard: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      intro: 'bienvenu dans le composant medicament',
      lorem: 'lorem ipsum dollor et etcetera',
      thumbnail: undefined
    }
  },
  methods: {
    getPicture () {
      console.log('on va requete l\'image du medoc')
      axiosInstance.get(`medicines/thumbnail/${this.id}`).then(elem => {
        this.thumbnail = elem.data
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
    }
  },
  created () {
    console.log('a la creation d\'un composant medicine')
    console.log(this.med)
    this.getPicture()
  }
}
</script>
