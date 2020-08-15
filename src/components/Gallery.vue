<template>
  <div>
    <vs-images v-if="images">
      <vs-image
        class="images"
        :key="index"
        :src="image.url"
        v-for="(image, index) of images"
        @click.native="openImage(image)"
      />
    </vs-images>
    <img v-else height="480px" width="640px" src="@/assets/no-image.svg" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: null,
    };
  },
  methods: {
    openImage(e) {
      this.$router.push(`img/${e.id}`);
    },
  },
  mounted() {
    // Testing async behaviour
    setTimeout(() => {
      this.images = Array.from(new Array(10)).map((_, index) => {
        return {
          url: `https://picsum.photos/400/400?image=2${index}`,
          id: index,
        };
      });
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
