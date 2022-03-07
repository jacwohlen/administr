<template>
  <v-list>
    <v-list-item>
      <v-combobox
        v-model="name"
        :items="members"
        :search-input.sync="search"
        :filter="filter"
        cache-items
        hide-details
        flat
        solo-inverted
        :hide-no-data="!search"
        label="Add participant"
        auto-select-first
        append-icon="mdi-account-plus-outline"
        @input="addParticipant"
      >
        <template slot="selection" slot-scope="data">
          {{ data.item.lastname }}
          {{ data.item.firstname }}
        </template>
        <template #item="data">
          <v-list-item-content>
            {{ data.item.lastname }}
            {{ data.item.firstname }}
          </v-list-item-content>
        </template>
        <template #append-item>
          <v-list-item v-if="search" two-line @click="showDialog">
            <v-list-item-action>
              <v-icon>mdi-account-plus-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Create New Member '{{ search }}'
            </v-list-item-content>
          </v-list-item>
        </template>
        <template #no-data>
          <v-list-item two-line @click="showDialog">
            <v-list-item-content>
              No member '{{ search }}' found.
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
      <v-dialog v-model="dialog.show" persistent>
        <v-card>
          <v-card-title> New Participant </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="dialog.lastname"
                    label="Lastname"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="dialog.firstname"
                    label="Firstname"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog.show = false"> Cancel </v-btn>
            <v-btn color="primary" text @click="dialogSave"> Create </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { Member } from '~/types/models'

import { administraStore, alertStore } from '~/store'

const PrefilledProps = Vue.extend({
  props: {
    trainingId: {
      type: String,
      required: true,
    },
  },
})
@Component({
  layout: 'DashboardLayout',
})
export default class extends PrefilledProps {
  name: string | Member = ''

  get members() {
    return administraStore.members
  }

  search: string = ''
  dialog = {
    lastname: '',
    firstname: '',
    show: false,
  }

  filter(item: any, queryText: string) {
    queryText = queryText.toLowerCase().trim()
    const name = item.lastname + ' ' + item.firstname
    return name.toLowerCase().includes(queryText)
  }

  showDialog() {
    const a = this.search.split(' ')
    if (a.length > 0) {
      this.dialog.lastname = a[0]
    }
    if (a.length > 1) {
      this.dialog.firstname = a.slice(1).join(' ')
    }
    this.dialog.show = true
  }

  dialogSave() {
    this.name = {
      // create object with empty id
      id: '',
      lastname: this.dialog.lastname,
      firstname: this.dialog.firstname,
    }
    this.addParticipant()
  }

  addParticipant() {
    if (typeof this.name !== 'object') {
      this.showDialog()
      return
    }
    administraStore
      .addParticipant({
        trainingId: this.trainingId,
        memberId: this.name.id,
        lastname: this.name.lastname,
        firstname: this.name.firstname,
      })
      .then(
        () => {
          this.name = ''
          this.dialog.show = false
          this.dialog.lastname = ''
          this.dialog.firstname = ''
        },
        (err) => {
          alertStore.setError({ msg: err })
        }
      )
  }
}
</script>
>
