<template>
  <div>
    <!-- Camera Component to take photos -->
    <Camera></Camera>
    <vs-divider position="left" color="success">Gallery</vs-divider>
    <!-- Gallery to show User Images -->
    <Gallery :images="images"></Gallery>
  </div>
</template>

<script>
// @ is an alias to /src
import Camera from "@/components/Camera.vue";
import Gallery from "@/components/Gallery.vue";
import ACTION_CONSTANTS from "../store/ACTION_CONSTANTS";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: { Camera, Gallery },
  methods: {
    ...mapActions([ACTION_CONSTANTS.GET_ALL_USER_IMAGES]),
  },
  mounted() {
    this[ACTION_CONSTANTS.GET_ALL_USER_IMAGES](this.user.id);
  },
  computed: {
    ...mapState({
      user: (state) => state.User.user,
    }),
    ...mapGetters({ images: "userImages" }),
  },
};
</script>
