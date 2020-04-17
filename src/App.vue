<template>
  <div id="app">
    <Navbar />
    <div v-if="this.$store.getters.myload" class="text-center">
      <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label="Spinning"></b-spinner>
      <strong>
        <br />Loading...
      </strong>
    </div>
    <div class="container-fluid" v-else>
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  beforeCreate() {
    this.$store.dispatch("FetchItems");
  }
};
</script>
