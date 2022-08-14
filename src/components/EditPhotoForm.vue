<template>
  <div>
    <v-img v-if="img" :src="img" @click="edit" />
    <span v-else align="center" style="width: 100%" @click="edit">{{
      userinitials
    }}</span>
    <v-dialog v-model="dialog.show" persistent>
      <v-card>
        <v-card-title> Photo {{ firstname }} {{ lastname }} </v-card-title>
        <v-row no-gutters>
          <v-col v-show="img">
            <v-row no-gutters justify="center">
              <v-col align="center">
                <img :src="img" style="max-width: 100%; max-height: 100%" />
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col align="center">
                <v-btn class="primary" @click="onStart">
                  <v-icon left>mdi-camera-retake-outline</v-icon>
                  Take new photo
                </v-btn>
              </v-col>
              <v-col align="center">
                <v-btn @click="removePhoto"> Remove Photo </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-show="!img">
            <v-row no-gutters>
              <v-col>
                <vue-web-cam
                  ref="webcam"
                  :device-id="deviceId"
                  style="max-width: 100%; max-height: 100%"
                  @error="onError"
                  @cameras="onCameras"
                  @camera-change="onCameraChange"
                />
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12">
                <v-select
                  v-model="camera"
                  :items="devices"
                  class="px-6"
                  item-value="deviceId"
                  item-text="label"
                  prepend-icon="mdi-camera"
                  dense
                >
                </v-select>
              </v-col>
              <v-col align="center" cols="12">
                <v-btn class="primary" @click="onCapture">
                  Capture Photo
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancel"> Cancel </v-btn>
          <v-btn color="primary" text @click="update"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

import { administraStore } from '~/store'

interface Camera {
  deviceId: string
  label: string
}

@Component
export default class extends Vue {
  $refs!: {
    webcam: HTMLFormElement
  }

  @Prop({ required: true }) memberId!: string
  @Prop({ required: true }) firstname!: string
  @Prop({ required: true }) lastname!: string
  @Prop({ default: null }) image!: string | null

  title: string = ''

  dialog = {
    title: '',
    show: false,
  }

  // camera = {
  img: string | null = null
  camera: string | null = null
  deviceId: string | null = null
  devices: Camera[] = []

  created() {
    if (this.image) {
      this.img = this.image
    }
  }

  get userinitials() {
    return this.firstname[0] + this.lastname[0]
  }

  @Watch('camera')
  watchCamera(id: string) {
    this.deviceId = id
  }

  @Watch('devices')
  watchDevices() {
    // Once we have a list select the first one
    if (this.devices.length > 0) {
      this.camera = this.devices[0].deviceId
      this.deviceId = this.devices[0].deviceId
    }
  }

  get device() {
    return this.devices.find((n) => n.deviceId === this.deviceId)
  }

  onCapture() {
    this.img = this.$refs.webcam.capture()
    this.onStop()
  }

  onStop() {
    this.$refs.webcam.stop()
  }

  onStart() {
    this.img = null
    this.$refs.webcam.start()
  }

  onError(error: any) {
    console.log('On Error Event', error)
    // TODO: use alert service
  }

  onCameras(cameras: any) {
    this.devices = cameras
  }

  onCameraChange(deviceId: string) {
    this.deviceId = deviceId
    this.camera = deviceId
  }

  get training() {
    return administraStore.training
  }

  edit() {
    this.dialog.show = true
  }

  removePhoto() {
    this.img = null
  }

  cancel() {
    this.img = this.image
    this.onStop()
    this.dialog.show = false
  }

  update() {
    administraStore.addImgToMember({ memberId: this.memberId, img: this.img })
    this.dialog.show = false
  }
}
</script>
