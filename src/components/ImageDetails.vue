<template>
  <!-- Image view -->
  <!-- Views Image of Specific ID -->
  <!-- For All images use Gallery -->
  <div>
    <img :src="url()" class="default-img-size" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import ACTION_CONSTANTS from "../store/ACTION_CONSTANTS";
export default {
  data() {
    return {};
  },
  mounted() {
    // * Get Image
    this[ACTION_CONSTANTS.GET_IMAGE](this.$route.params.id);
  },
  methods: {
    ...mapActions([ACTION_CONSTANTS.GET_IMAGE]),
    url() {
      if (this.image.blob) {
        return URL.createObjectURL(this.image.blob);
      } else {
        return "../assets/no-image.svg";
      }
    },
  },
  computed: mapState({
    image: (state) => {
      return {
        ...state.Gallery.image,
      };
    },
  }),
};
</script>