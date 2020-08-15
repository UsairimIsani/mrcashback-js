<template>
  <div>
    <!-- Picture Gallery -->
    <vs-images v-if="images">
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
export default {
  data() {
    return {
      images: null, // *  List of images
    };
  },
  methods: {
    // * Opens image of specific ID in Images View
    openImage(e) {
      this.$router.push(`img/${e.id}`);
    },
  },
  mounted() {
    // * Placeholder Images to test Async Behaviour
    setTimeout(() => {
      // * Create a new Array of length 10
      // * Map each element of empty array to image with metadata.
      this.images = Array.from(new Array(10)).map((_, index) => {
        return {
          url: `https://picsum.photos/400/400?image=2${index}`,
          id: index,
        };
      });
      // * Timeout to Simulate Async Behaviour
    }, 0);
  },
};
</script>
<style lang="scss" scoped>
.images {
  max-width: 300px;
  min-width: 200px;
}
</style>
