<template>
  <div>
    <v-list>
      <v-list-item v-for="m in participants" :key="m.id" :value="m.id">
        <template #default="">
          <v-list-item-action class="mr-3">
            <v-checkbox
              v-if="date"
              v-model="selected"
              :value="m.id"
              color="primary"
            >
            </v-checkbox>
            <v-icon v-else>mdi-account-outline</v-icon>
          </v-list-item-action>
          <edit-photo-form
            :memberId="m.id"
            :lastname="m.lastname"
            :firstname="m.firstname"
            :image="m.img"
          />
          <v-list-item-content>
            {{ m.lastname }} {{ m.firstname }}
          </v-list-item-content>
          <v-list-item-action>
            <v-menu left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <edit-photo-form :memberId="m.id" />
                <v-list-item @click="() => {}">
                  <v-list-item-title>Remove</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
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
@Component
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
