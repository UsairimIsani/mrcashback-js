<template>
  <div class="camera-container">
    <div class="video-container" @click="takePicture">
      <video :src-object.prop.camel="videoSrc" autoplay></video>
    </div>
    <div>
      <img v-if="imageSrc" :src="imageSrc" alt />
      <img v-else height="480px" width="640px" src="@/assets/no-image.svg" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoSrc: null,
      imageSrc: null,
    };
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((e) => {
        this.videoSrc = e;
      });
  },
  methods: {
    takePicture(e) {
      new ImageCapture(this.videoSrc.getVideoTracks()[0])
        .takePhoto()
        .then((e) => {
          const imageUrl = URL.createObjectURL(e);
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
