<template>
  <div>
    <vs-images v-if="images">
      <vs-image :key="index" :src="image.url" v-for="(image, index) of images" />
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
  mounted() {
    // Testing async behaviour
    setTimeout(() => {
      this.images = Array.from(new Array(10)).map((_, index) => {
        return {
          url: `https://picsum.photos/400/400?image=2${index}`,
        };
      });
    }, 3000);
  },
};
</script>
<style lang="scss" scoped></style>
