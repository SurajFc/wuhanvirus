<template>


<div>
  <b-navbar toggleable="md" class="mynav" >
    <b-navbar-brand class="offset-1" > <img src="https://placekitten.com/g/30/30" alt="Kitten"><router-link to="/">WuhanVirus</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
           <b-nav-item ><router-link to="/about">News</router-link></b-nav-item>
        <b-nav-item ><router-link to="/about">About</router-link></b-nav-item>
         <b-nav-item ><router-link to="/about">Other</router-link></b-nav-item>
 
      </b-navbar-nav>

    </b-collapse>

  </b-navbar>

    </div>

</template>

<script>
export default {
name:"Navbar"
}
</script>

<style scoped>
.mynav {
    color: blue
}


</style>