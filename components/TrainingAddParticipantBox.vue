<template>
  <v-list>
    <v-list-item>
      <template #default>
        <v-list-item-action>
          <v-icon>mdi-account-plus-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-text-field
            id="name"
            v-model="name"
            name="Name"
            label="Lastname Firstname"
            single-line
            autocomplete="off"
          >
          </v-text-field>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn class="primary" @click="addParticipant">Add</v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { administraStore, alertStore } from '~/store'

const PrefilledProps = Vue.extend({
  props: {
    trainingId: {
      type: String,
      required: true,
    },
  },
})
@Component
export default class extends PrefilledProps {
  name: string = ''

  addParticipant() {
    administraStore
      .addParticipant({
        trainingId: this.trainingId,
        lastname: this.name,
        firstname: '',
      })
      .then(
        () => {
          this.name = ''
        },
        (err) => {
          alertStore.setError({ msg: err })
        }
      )
  }
}
</script>
>
