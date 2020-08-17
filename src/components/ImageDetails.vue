<template>
  <!-- Image view -->
  <!-- Views Image of Specific ID -->
  <!-- For All images use Gallery -->
  <div class="img-update">
    <div>
      <img :src="url()" class="default-img-size" />
    </div>
    <vs-input label-placeholder="Unnamed
    " v-model="name" />
    <vs-textarea
      width="50%"
      counter="50"
      label="Description"
      :counter-danger.sync="limit"
      v-model="description"
    />
    <vs-chips color="primary" placeholder="New Element" v-model="chips">
      <vs-chip :key="chip" @click="remove(chip)" v-for="chip in chips" closable>{{ chip }}</vs-chip>
    </vs-chips>
    <vs-button color="primary" type="filled" @click="update">Update</vs-button>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import ACTION_CONSTANTS from "../store/ACTION_CONSTANTS";
export default {
  data() {
    return {
      chips: [],
      limit: false,
      description: "",
      name: "",
    };
  },
  mounted() {
    // * Get Image
    this[ACTION_CONSTANTS.GET_IMAGE](this.$route.params.id);
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
    },
    ...mapActions([ACTION_CONSTANTS.GET_IMAGE, ACTION_CONSTANTS.UPDATE_IMAGE]),
    url() {
      if (this.image.blob) {
        return URL.createObjectURL(this.image.blob);
      } else {
        return "../assets/no-image.svg";
      }
    },
    update() {
      this[ACTION_CONSTANTS.UPDATE_IMAGE]({
        ...this.image,
        name: this.name,
        description: this.description,
        tags: this.chips,
      });
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
<style lang="scss" scoped>
.img-update {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>