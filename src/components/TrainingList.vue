<template>
  <div>here you go</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import moment from 'moment'

import { administraStore } from '~/store'

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    // server side
    await administraStore.init()
  },
})
export default class CategoriesPage extends Vue {
  async mounted() {
    // client side
    await administraStore.init()
  }

  get todayStr() {
    return moment().format('ddd, DD. MMM yyyy')
  }

  get today() {
    return moment()
  }

  get trainings() {
    return administraStore.trainings
  }
}
</script>
