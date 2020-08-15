<template>
  <vs-table :data="users">
    <template slot="header">
      <h3>Users</h3>
    </template>
    <template slot="thead">
      <vs-th>Name</vs-th>
      <vs-th>No of Images</vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
        <vs-td :data="tr.username">
          <h3>{{tr.name}}</h3>
        </vs-td>
        <vs-td :data="tr.images.length">{{tr.images.length}}</vs-td>

        <template slot="expand">
          <Gallery></Gallery>
        </template>
      </vs-tr>
    </template>
  </vs-table>
</template>
<script>
import Gallery from "@/components/Gallery.vue";
export default {
  data() {
    return {
      users: [
        {
          username: "UsairimIsani",
          name: "Usairim Isani",
          images: [
            {
              name: "First Image",
              url: "../assets/no-image.svg",
            },
            {
              name: "First Image",
              url: "../assets/no-image.svg",
            },
            {
              name: "First Image",
              url: "../assets/no-image.svg",
            },
            {
              name: "First Image",
              url: "../assets/no-image.svg",
            },
          ],
        },
        {
          username: "UsairimIsani",
          name: "Usairim Isani",
          images: [
            {
              name: "First Image",
              url: "../assets/no-image.svg",
            },
            {
              name: "First Image",
              url: "../assets/no-image.svg",
            },
            {
              name: "First Image",
              url: "../assets/no-image.svg",
            },
            {
              name: "First Image",
              url: "../assets/no-image.svg",
            },
          ],
        },
      ],
    };
  },
  components: {
    Gallery,
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