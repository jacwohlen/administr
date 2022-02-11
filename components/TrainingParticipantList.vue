<template>
  <!-- <p v-if="$fetchState.pending">Fetching mountains...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else> -->
    <div>
    <v-list-item v-for="m in participants" :key="m.id">
      <template #default>
        <v-list-item-action>
          <v-checkbox
            v-if="date"
            v-model="selected"
            color="primary"
            :value="m"
            @click="check(m)"
          ></v-checkbox>
          <v-icon v-else>mdi-account-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          {{ m.lastname }} {{ m.firstname }}
        </v-list-item-content>
      </template>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { administraStore } from '~/store'
import { Member } from '~/types/models'

const PrefilledProps = Vue.extend({
  props: {
    trainingId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: null,
      required: false,
    },
  },
})
@Component
export default class extends PrefilledProps {
  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
    await administraStore.init()
    await administraStore.initTraining({
      trainingId: this.trainingId,
    })
    await administraStore.initPresentList({
      trainingId: this.trainingId,
      date: this.date,
    })

    // add selected
    if (administraStore.confirmedParticipants)
      this.selected = administraStore.confirmedParticipants.members
  }

  selected: Member[] = []

  get participants() {
    if (!administraStore.training) return
    if (!administraStore.training.participants) return
    return administraStore.training.participants
  }

  check(m: Member) {
    if (this.selected.includes(m)) {
      administraStore.markAsPresent({
        m,
        tId: this.trainingId,
        date: this.date,
      })
    } else {
      administraStore.markAsNotPresent({
        m,
        tId: this.trainingId,
        date: this.date,
      })
    }
  }
}
</script>
