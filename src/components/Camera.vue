<template>
  <!-- Camera -->
  <div class="camera-container">
    <!-- Live feed from Camera. To View one self before taking a picture -->
    <div class="video-container" @click="takePicture">
      <video :src-object.prop.camel="videoSrc" autoplay></video>
    </div>
    <div>
      <!-- After Taking a Picture. Preview of Picture -->
      <img v-if="imageSrc" :src="imageSrc" alt />
      <!-- Before Taking a Picture. Placeholder Image -->
      <img v-else height="480px" width="640px" src="@/assets/no-image.svg" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoSrc: null, // * Live video feed from camera.
      imageSrc: null, // * Picture Preview Source.
    };
  },
  mounted() {
    // * Browser API to access Media Devices i.e Camera
    navigator.mediaDevices
      // * Media Device Constraints i.e Video and/or Audio, from device
      // * Using Media Devices requires User's permission.
      .getUserMedia({
        video: true,
      })
      .then((e) => {
        // * Setting Camera feed to Video feed.
        this.videoSrc = e;
      });
  },
  destroyed() {
    // * Close Camera
    // * Stops Camera feed and frees camera for other Application use.
    this.videoSrc.getVideoTracks().forEach((e) => {
      e.stop();
    });
  },
  methods: {
    // * Takes picture from the current Camera feed.
    takePicture(e) {
      // * Takes Video feed and saves a frame as an ImageCapture Blob(Binary Format).
      new ImageCapture(this.videoSrc.getVideoTracks()[0])
        .takePhoto()
        .then((e) => {
          // * Creates  URL for the blob
          const imageUrl = URL.createObjectURL(e);
          // * Sets image source to URL of taken Photo.
          this.imageSrc = imageUrl;
        });
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
  & div {
    margin: 1em;
  }
}
.video-container {
  position: relative;
}

// *  Camera Button to takes Photos
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
