<template>
  <div>
    <!-- Camera Component to take photos -->
    <Camera></Camera>
    <vs-divider position="left" color="success">Gallery</vs-divider>
    <!-- Gallery to show User Images -->
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
