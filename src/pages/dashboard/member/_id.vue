<template>
  <div>
    <v-row class="pt-1" align="center" justify="center" no-gutters>
      <v-col align="left">
        <v-btn text @click="back"> <v-icon>mdi-arrow-left</v-icon> Back </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <edit-photo-form
          :memberId="member.id"
          :lastname="member.lastname"
          :firstname="member.firstname"
          :image="member.img"
        >
          <template #img>
            <v-avatar size="200" color="secondary">
              <v-img :src="member.img" />
            </v-avatar>
          </template>
          <template #alt>
            <v-avatar size="200" color="secondary">
              <span align="center" style="width: 100%">{{ userinitials }}</span>
            </v-avatar>
          </template>
        </edit-photo-form>
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
            <td><b>Birthday</b></td>
            <td>{{ member.birthday }}</td>
          </tr>
          <tr>
            <td><b>Mobile</b></td>
            <td>{{ member.mobile }}</td>
          </tr>
          <tr>
            <td><b>Labels</b></td>
            <td>
              <v-chip v-for="l in member.labels" :key="l" x-small>{{
                l
              }}</v-chip>
            </td>
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

  get userinitials() {
    return this.member!.firstname[0] + this.member!.lastname[0]
  }

  back() {
    this.$router.back()
  }
}
</script>
