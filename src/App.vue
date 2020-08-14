<template>
  <div style="height:100%;">
    <div style="height:10vh;">
      <vs-navbar style="height:100%;">
        <div slot="title">
          <vs-navbar-title>Hello world</vs-navbar-title>
        </div>

        <vs-navbar-item index="0">
          <a href="#">Home</a>
        </vs-navbar-item>
        <vs-navbar-item index="1">
          <a href="#">News</a>
        </vs-navbar-item>
        <vs-navbar-item index="2">
          <a href="#">Update</a>
        </vs-navbar-item>
      </vs-navbar>
    </div>
    <vs-row vs-type="flex" vs-align="center" vs-justify="center">
      <vs-col vs-type="flex">
        <router-view></router-view>
      </vs-col>
    </vs-row>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
}
.column {
  flex-direction: column;
}
</style>
