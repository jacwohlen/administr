<template>
  <div>
    <v-row class="pt-1" align="center" justify="center" no-gutters>
      <v-col align="left">
        <v-btn text @click="back"> <v-icon>mdi-arrow-left</v-icon> Back </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-avatar size="200" color="secondary">
          <edit-photo-form
            :memberId="member.id"
            :lastname="member.lastname"
            :firstname="member.firstname"
            :image="member.img"
          />
        </v-avatar>
      </v-col>
    </v-row>

    <v-simple-table>
      <template #default>
        <tbody>
          <tr>
            <td><b>Lastname</b></td>
            <td>{{ member.lastname }}</td>
          </tr>
          <tr>
            <td><b>Firstname</b></td>
            <td>{{ member.firstname }}</td>
          </tr>
          <tr>
            <td><b>Phone</b></td>
            <td>{{ member.phone }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row class="pt-1" align="center" justify="center" no-gutters>
      <v-col align="left">
        <v-btn text @click="back"> <v-icon>mdi-arrow-left</v-icon> Back </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { administraStore } from '~/store'

@Component({
  layout: 'DashboardLayout',
  async asyncData({ params }) {
    await administraStore.initMember({ memberId: params.id })
    return { memberId: params.id }
  },
})
export default class PresentListPage extends Vue {
  memberId: string = '' // set via asyncData

  get member() {
    return administraStore.member
  }

  back() {
    this.$router.back()
  }
}
</script>
