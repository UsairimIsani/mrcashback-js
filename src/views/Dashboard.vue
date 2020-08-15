<template>
  <div>
    <Camera></Camera>
    <vs-divider position="left" color="success">Gallery</vs-divider>
    <Gallery></Gallery>
  </div>
</template>

<script>
// @ is an alias to /src
import Camera from "@/components/Camera.vue";
import Gallery from "@/components/Gallery.vue";

export default {
  name: "Dashboard",
  components: { Camera, Gallery },
};
</script>
