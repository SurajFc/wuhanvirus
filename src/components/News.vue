<template>
  <div class="container mb-3 mt-3">
    <div v-if="spin" class="offset-6">
      <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label="Spinning"></b-spinner>
      <strong>
        <br />Loading...
      </strong>
    </div>
    <div v-else>
      <b>Latest News</b>
      <div class="card mt-3">
        <div class="row mb-3" v-for="(x,index) in news" :key="index">
          <div class="col-md-3">
            <img :src="x.img" class="card-img" alt />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text">{{x.title}}</p>
              <p class="card-text">
                <small class="text-muted">
                  <a :href="x.link">Read More..</a>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "News",
  data() {
    return {
      news: [],
      spin: true
    };
  },
  mounted() {
    axios
      .get("https://cryptic-ravine-96718.herokuapp.com/")
      .then(res => {
        this.news = res.data["news"].splice(0, 30);
        this.spin = false;
      })
      .catch();
  }
};
</script>

<style>
</style>