<template>
  <!-- Camera -->
  <div class="camera-container">
    <!-- Live feed from Camera. To View one self before taking a picture -->
    <div v-if="!device" class="video-container" @click="takePicture">
      <video :src-object.prop.camel="videoSrc" autoplay></video>
    </div>
    <div v-else>
      <img width="400px" height="400px" src="@/assets/camera.svg" @click="takeImage" />
    </div>
    <div>
      <!-- After Taking a Picture. Preview of Picture -->
      <img v-if="imageSrc" :src="imageSrc" alt class="default-img-size" />
      <!-- Before Taking a Picture. Placeholder Image -->
      <img v-else width="640px" height="480px" src="@/assets/no-image.svg" />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ACTION_CONSTANTS from "../store/ACTION_CONSTANTS";
export default {
  data() {
    return {
      videoSrc: null, // * Live video feed from camera.
      imageSrc: null, // * Picture Preview Source.
      image: {
        name: "Unnamed",
        blob: null,
        createdAt: null,
        updatedAt: null,
      },
      device: false,
    };
  },
  async mounted() {
    // document.addEventListener("deviceready", onDeviceReady, false);
    // function onDeviceReady() {
    //   this.device = this.$device.android
    //   console.log(navigator.camera);
    // }
    this.device = this.$device.android;
    // * Browser API to access Media Devices i.e Camera
    if (!this.device) {
      try {
        this.videoSrc = await navigator.mediaDevices

          // * Media Device Constraints i.e Video and/or Audio, from device
          // * Using Media Devices requires User's permission.

          .getUserMedia({
            video: true,
          });
      } catch (error) {
        this.$vs.notify({
          title: "Camera can't be accessed.",
          text: error.message,
          color: "danger",
          position: "top-right",
        });
      }
    }
  },
  destroyed() {
    // * Close Camera
    // * Stops Camera feed and frees camera for other Application use.

    this.videoSrc.getVideoTracks().forEach((e) => e.stop());
  },

  // * Component Methods

  methods: {
    // * Map Action to Methods

    ...mapActions([ACTION_CONSTANTS.ADD_IMAGE]),

    // * Takes picture from the current Camera feed - WEB

    async takePicture(e) {
      // * Takes Video feed and saves a frame as an ImageCapture Blob(Binary Format).

      const image = await new ImageCapture(
        this.videoSrc.getVideoTracks()[0]
      ).takePhoto();

      // * Creates  URL for the blob

      const imageUrl = URL.createObjectURL(image);

      // * Sets image source to URL of taken Photo.

      this.imageSrc = imageUrl;

      // * Create Image in DB

      // this.image.blob = new Blob([image], { type: image.type });
      this.image.blob = image;
      this.image.createdAt = new Date();
      this.image.updatedAt = new Date();

      // * Dispatch ADD Image
      this[ACTION_CONSTANTS.ADD_IMAGE](this.image);
    },
    takeImage() {
      navigator.camera.getPicture(
        (cameraSuccess) => {
          this.image.url = cameraSuccess.destinationType;
          this.image.createdAt = new Date();
          this.image.updatedAt = new Date();

          // * Dispatch ADD Image
          this[ACTION_CONSTANTS.ADD_IMAGE](this.image);
        },
        (cameraError) => {
          this.$vs.notify({
            title: "Camera Error",
            text: cameraError.message,
            color: "danger",
            position: "top-right",
          });
        },
        {}
      );
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  border: 0;
  padding: 0;
  background: none;
  width: 48px;
  height: 48px;
}
.camera-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  & div {
    margin: 1em;
  }
}
.video-container {
  position: relative;
}

// *  Camera Button to take Photos
.video-container::after {
  content: "";
  display: block;
  background: url("../assets/camera.svg") no-repeat;
  background-size: 48px;
  padding: 10px;
  height: 48px;
  width: 48px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
}
</style>
