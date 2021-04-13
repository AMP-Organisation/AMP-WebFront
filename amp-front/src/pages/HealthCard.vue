<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg bg-teal-6 text-white">
          <q-card-section class="text-h6 ">
            <div class="text-h6">Fiche de santé</div>
            <div class="text-subtitle2">Compléter vos informations</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                 <!--  <q-input dark color="white" dense v-model="user_details.user_name" label="User Name"/> -->
                  <q-select
                    class="GNL__select"
                    multiple
                    use-chips
                    dark
                    color="green"
                    v-model="allergies_model"
                    use-input
                    label="allergie(s)"
                    :options="allergies_options"
                    option-value="id"
                    option-label="name"
                    @filter="filterAllergie"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    class="GNL__select"
                    multiple
                    use-chips
                    dark
                    color="green"
                    v-model="disease_model"
                    use-input
                    label="maladie(s) chronique"
                    :options="disease_options"
                    option-value="id"
                    option-label="name"
                    @filter="filterDisease"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    class="GNL__select"
                    dark
                    color="green"
                    v-model="blood_model"
                    use-input
                    label="groupe sanguin"
                    :options="blood_option"
                    option-value="id"
                    option-label="name"
                    @filter="filterBlood"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info text-white">Enregistrer</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">

        <q-card class="bg-teal-6 text-white">
          <q-card-section class="text-center bg-transparent">
            <q-avatar size="100px" class="shadow-10">
              <img src="../assets/profile.svg" alt="profile picture">
            </q-avatar>
            <div class="text-subtitle2 q-mt-lg">By AMP team</div>
          </q-card-section>
          <q-card-section>
            <div class="text-body2 text-justify">
              Bonjour, bienvenu sur votre fiche de santé, vous pouvez renseigner vos informations personnelle si vous le souhaitez,
              affin que nous puissions vous aider du mieux que possible.
              <br>
              <br>
              Cordialement,
              <br>
              AMP team.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HealthCard',
  data () {
    return {
      user_details: {

      },
      password_dict: {},
      blood_model: null,
      default_blood: [
        { id: 1, name: 'A+' },
        { id: 2, name: 'A-' },
        { id: 3, name: 'B+' },
        { id: 4, name: 'B-' },
        { id: 5, name: 'AB+' },
        { id: 6, name: 'AB-' },
        { id: 7, name: 'O+' },
        { id: 8, name: 'O-' }
      ],
      blood_option: this.default_blood,
      allergies_model: null,
      allergies_default: [],
      allergies_options: this.allergies_default,
      disease_model: null,
      disease_default: [],
      disease_options: this.disease_default
    }
  },
  methods: {
    filterAllergie (val, update) {
      if (val === '') {
        update(() => {
          this.allergies_options = this.allergies_default
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.allergies_options = this.allergies_default.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterBlood (val, update) {
      if (val === '') {
        update(() => {
          this.blood_option = this.default_blood
        })
        return this.blood_option
      }
      update(() => {
        const needle = val.toLowerCase()
        this.blood_option = this.blood_option.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterDisease (val, update) {
      if (val === '') {
        update(() => {
          this.disease_options = this.disease_default
        })
        return this.blood_option
      }
      update(() => {
        const needle = val.toLowerCase()
        this.disease_options = this.disease_default.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style scoped>
.GNL__select {
  display: flex;
}
</style>
