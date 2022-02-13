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
    <v-list-item>
      <v-combobox
        v-model="name"
        :items="members"
        :search-input.sync="search"
        item-text="lastname"
        cache-items
        flat
        :hide-no-data="!search"
        hide-details
        label="Add participant"
        solo-inverted
        auto-select-first
      >
        <template #item="data">
          <v-list-item-content>
            <v-list-item-title>
              {{ data.item.lastname }}
              {{ data.item.firstname }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <template #append-item>
          <v-list-tile
            v-if="search"
            @click="model.push({ text: search }), (search = '')"
          >
            <span class="subheading">+ Add</span>
            <v-chip label small>
              {{ search }}
            </v-chip>
          </v-list-tile>
        </template>
        <template #no-data>
          <v-list-tile>
            <span class="subheading">+ Add</span>
            <v-chip label small>
              {{ search }}
            </v-chip>
          </v-list-tile>
        </template>
      </v-combobox>
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

  get members() {
    return administraStore.members
  }
  search: string = ''

  addParticipant() {
    let o = { firstname: '', lastname: '' }
    if (typeof this.name !== 'object') {
      o = this.name
    } else {
      o.lastname = this.name
    }

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
