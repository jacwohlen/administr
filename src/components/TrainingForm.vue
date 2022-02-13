<template>
  <div>
    <v-row v-if="training && training.title">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            >{{ training.title }}
            <v-chip small>{{ training.section }}</v-chip></v-list-item-title
          >
          <v-list-item-subtitle
            >{{ training.weekday }} {{ training.dateFrom }}-{{
              training.dateTo
            }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>
            <v-btn plain color="primary" @click="editTraining"> Edit </v-btn>
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-subheader>
          id: {{ trainingId }}
          <v-btn plain color="primary" @click="editTraining">
            Set Training Data
          </v-btn>
        </v-subheader>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog.show" persistent max-width="600px">
      <v-card>
        <v-card-title> Training Meta Data </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="dialog.title"
                  label="Title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dialog.section"
                  label="Section"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dialog.dateFrom"
                  label="Training Start"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dialog.dateTo"
                  label="Training End"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dialog.weekday"
                  label="Weekday"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog.show = false">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="updateTraining"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  },
})
@Component
export default class extends PrefilledProps {
  title: string = ''
  dateFrom: Date | null = null
  dateTo: Date | null = null
  section: string = ''
  weekday: string = ''

  dialog = {
    title: '',
    dateFrom: '',
    dateTo: '',
    section: '',
    weekday: '',
    show: false,
  }

  async mounted() {
    await administraStore.init()
    await administraStore.initTraining({
      trainingId: this.trainingId,
    })
  }

  get training() {
    return administraStore.training
  }

  editTraining() {
    this.dialog.title = this.training!!.title
    this.dialog.section = this.training!!.section
    this.dialog.dateFrom = this.training!!.dateFrom
    this.dialog.dateTo = this.training!!.dateTo
    this.dialog.weekday = this.training!!.weekday
    this.dialog.show = true
  }

  updateTraining() {
    administraStore.createTraining({
      id: this.trainingId,
      title: this.dialog.title,
      dateFrom: this.dialog.dateFrom,
      dateTo: this.dialog.dateTo,
      section: this.dialog.section,
      weekday: this.dialog.weekday,
      participants: [],
    })
    this.dialog.show = false
  }
}
</script>
