<template>
  <vs-tabs>
    <vs-tab label="User">
      <div>
        <!-- Table View of All Users with their Images -->
        <vs-table :data="users">
          <template slot="header">
            <h3>Users</h3>
          </template>
          <template slot="thead">
            <vs-th>Email</vs-th>
            <vs-th>No of Images</vs-th>
          </template>
          <!-- List all User -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.email">
                <h3>{{tr.email}}</h3>
              </vs-td>
              <vs-td :data="tr.images.length">{{tr.images.length}}</vs-td>
              <!-- Expands to show User Images -->
              <template slot="expand">
                <!-- Show User's Images -->
                <Gallery :images="tr.images"></Gallery>
              </template>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-tab>
    <vs-tab label="Images">
      <div>
        <Gallery :images="images"></Gallery>
      </div>
    </vs-tab>
  </vs-tabs>
</template>
<script>
import Gallery from "@/components/Gallery.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import ACTION_CONSTANTS from "../store/ACTION_CONSTANTS";
export default {
  data() {
    return {};
  },
  mounted() {
    this[ACTION_CONSTANTS.GET_ALL_USERS]();
    this[ACTION_CONSTANTS.GET_ALL_IMAGES]();
  },
  methods: {
    ...mapActions([
      ACTION_CONSTANTS.GET_ALL_USERS,
      ACTION_CONSTANTS.GET_ALL_IMAGES,
    ]),
  },
  components: {
    Gallery,
  },
  computed: {
    ...mapState({
      users: (state) => state.Admin.users,
    }),
    ...mapGetters({ images: "adminImages" }),
  },
};
</script>
<style lang="scss" >
.content-tr-expand {
  width: 100%;
  & > div {
    width: 100%;
  }
  & img {
    height: 200px;
    width: 200px;
  }
  & .vs-image-img {
    height: 200px;
    width: 200px;
  }
}
</style>