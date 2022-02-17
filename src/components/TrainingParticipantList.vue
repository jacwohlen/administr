<template>
  <div>
    <v-list-item-group v-model="selected" multiple active-class="">
      <v-list-item v-for="m in participants" :key="m.id" :value="m.id">
        <template #default="{ active }">
          <v-list-item-action>
            <v-checkbox v-if="date" :input-value="active" color="primary">
            </v-checkbox>
            <v-icon v-else>mdi-account-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ m.lastname }} {{ m.firstname }}
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { administraStore } from '~/store'

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
@Component({
  layout: 'DashboardLayout',
})
export default class extends PrefilledProps {
  get selected(): string[] {
    if (!administraStore.confirmedParticipants) return []
    return administraStore.confirmedParticipants.members.map((i) => i.id)
  }

  set selected(newValue: string[]) {
    this.check(newValue)
  }

  get participants() {
    if (!administraStore.training) return
    if (!administraStore.training.participants) return
    return administraStore.training.participants
  }

  check(participantsIds: string[]) {
    administraStore.setParticipants({
      participantsIds,
      tId: this.trainingId,
      date: this.date,
    })
  }
}
</script>
