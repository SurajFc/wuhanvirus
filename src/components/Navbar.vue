<template>
  <div>
    <b-navbar toggleable="md" class="mynav">
      <b-navbar-brand class="offset-1">
        <router-link to="/">
          <img src="@/assets/logo.jpg" alt="logo" height="30px" width="35px" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">WuhanVirus</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/country">Map</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/news">News</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/symptoms">Symptoms</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/about">About</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.mynav {
  color: blue;
}
</style>