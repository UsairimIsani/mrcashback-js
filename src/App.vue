<template>
  <div style="height:100%;">
    <div>
      <vs-navbar style="height:100%;">
        <div slot="title">
          <vs-navbar-title>{{$route.name}}</vs-navbar-title>
        </div>
      </vs-navbar>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
    };
  },
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.vs-navbar--header {
  padding: 1em;
  & h3 {
    font-size: 2.2em;
  }
}
.router-view {
  height: 90vh;
  padding: 1em;
}
.vs-row,
.vs-col {
  height: 100%;
}
.column {
  flex-direction: column;
}
.form-container {
  flex-direction: column;
  & div {
    width: 100%;
    margin: 0.5em;
  }
  .submit {
    min-width: 200px;
    max-width: 500px;
    width: auto;
  }
}
.vs-input {
  min-width: 200px;
  max-width: 500px;
  width: auto;
}
.remeber-me {
  align-self: flex-start;
  margin: 2% 0;
}
</style>
