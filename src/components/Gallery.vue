<template>
  <div>
    <!-- Picture Gallery -->
    <vs-images v-if="images" alternating>
      <vs-image
        class="images"
        :key="index"
        :src="image.url"
        v-for="(image, index) of images"
        @click.native="openImage(image)"
      />
    </vs-images>
    <!-- Placeholder Image. In case of no Images -->
    <img v-else height="480px" width="640px" src="@/assets/no-image.svg" />
  </div>
</template>
<script>
// import { mapActions, mapState } from "vuex";
// import ACTION_CONSTANTS from "../store/ACTION_CONSTANTS";
export default {
  props: ["images"],
  data() {
    return {};
  },
  methods: {
    // * Opens image of specific ID in Images View
    openImage(e) {
      this.$router.push(`/img/${e.id}`);
    },
  },
  mounted() {
    // * Make Dum
    // if (this.$props.userId) {
    //   this[ACTION_CONSTANTS.GET_ALL_USER_IMAGES](this.$props.userId);
    // } else {
    //   this[ACTION_CONSTANTS.GET_ALL_USER_IMAGES](this.user.id);
    // }
    //  // * Placeholder Images to test Async Behavior
    //   setTimeout(() => {
    //     // * Create a new Array of length 10
    //     // * Map each element of empty array to image with metadata.
    //     this.images = Array.from(new Array(10)).map((_, index) => {
    //       return {
    //         url: `https://picsum.photos/400/400?image=2${index}`,
    //         id: index,
    //       };
    //     });
    //     // * Timeout to Simulate Async Behavior
    //   }, 0);
  },
  // computed: mapState({
  //   user: (state) => state.User.user,
  //   images: (state) =>
  //     state.Gallery.images.map((img) => {
  //       return { ...img, url: URL.createObjectURL(img.blob) };
  //     }) || [],
  // }),
};
</script>
<style lang="scss" scoped>
.images {
  max-width: 300px;
  min-width: 200px;
}
</style>
