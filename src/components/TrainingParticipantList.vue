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
          <v-list-item-avatar color="secondary" class="mr-3">
            <v-img v-if="m.img" :src="m.img" />
            <span v-else align="center" style="width: 100%">{{
              userinitials(m)
            }}</span>
          </v-list-item-avatar>
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
                <v-list-item :to="'/dashboard/member/' + m.id">
                  <v-list-item-title>View</v-list-item-title>
                </v-list-item>
                <v-list-item @click="removeParticipant(m)">
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

import { Member } from 'types/models'

import { administraStore } from '~/store'

function arrayUnique(array: any[]) {
  const a = array.concat()
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i].id === a[j].id) a.splice(j--, 1)
    }
  }
  return a
}

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
    let confirmedParticipants: Member[] = []
    if (administraStore.confirmedParticipants) {
      confirmedParticipants = administraStore.confirmedParticipants.members
    }

    // union with
    if (!administraStore.training) return
    if (!administraStore.training.participants) return

    return arrayUnique(
      confirmedParticipants.concat(administraStore.training.participants)
    )
  }

  userinitials(m: Member) {
    // FIXME: BUG: When adding a new particpant the retrieved list contains shortly an
    // unresolved reference such as '/member/1234/'. I guess it's a bug of
    // vuexfire. As a workaround I need to check if m contains 'lastname'.
    if (m.lastname === undefined) return ''
    return m.firstname[0] + m.lastname[0]
  }

  check(participantsIds: string[]) {
    administraStore.setParticipants({
      participantsIds,
      tId: this.trainingId,
      date: this.date,
    })
  }

  removeParticipant(m: Member) {
    administraStore.removeParticipant({
      trainingId: this.trainingId,
      memberId: m.id,
    })
  }
}
</script>
