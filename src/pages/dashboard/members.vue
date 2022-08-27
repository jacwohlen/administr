<template>
  <div>
    <h1 align="center" class="text-h5">Members</h1>
    <v-list>
      <v-list-item v-for="m in members" :key="m.id" :value="m.id">
        <v-list-item-avatar color="secondary" class="mr-3">
          <v-img v-if="m.img" :src="m.img" />
          <span v-else align="center" style="width: 100%">{{
            userinitials(m.lastname, m.firstname)
          }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ m.lastname }} {{ m.firstname }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip v-for="l in m.labels" :key="l" x-small>{{ l }}</v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn text :to="'/dashboard/member/' + m.id"
            >View</v-btn
          ></v-list-item-action
        >
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { administraStore } from '~/store'

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    // server side
    await administraStore.init()
  },
})
export default class CategoriesPage extends Vue {
  userinitials(firstname: string, lastname: string) {
    return firstname[0] + lastname[0]
  }

  get members() {
    return administraStore.members
  }
}
</script>
