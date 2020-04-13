<template>
  <div class="container mb-3 mt-3">
    <b-card-group deck>
      <b-card bg-variant="danger" text-variant="white" header="Confirmed" class="text-center">
        <b-card-text>{{global.TotalConfirmed}}</b-card-text>
      </b-card>

      <b-card bg-variant="info" text-variant="white" header="Active" class="text-center">
        <b-card-text>{{global.TotalConfirmed - global.TotalRecovered - global.TotalDeaths}}</b-card-text>
      </b-card>

      <b-card bg-variant="success" text-variant="white" header="Recovered" class="text-center">
        <b-card-text>{{global.TotalRecovered}}</b-card-text>
      </b-card>
      <b-card bg-variant="light" text-variant="black" header="Deceased" class="text-center">
        <b-card-text>{{global.TotalDeaths}}</b-card-text>
      </b-card>
    </b-card-group>

    <b>World Covid-19 Tracker</b>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Country</th>
          <!-- <th scope="col">NewConfirmed</th> -->
          <th scope="col">Total Confirmed</th>
          <th scope="col">Total Recovered</th>
          <th scope="col">Total Deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i,index) in x" :key="i.id">
          <th scope="row">{{index+1}}</th>
          <td @click="detailed(i)">{{i.Country}}</td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{i.NewConfirmed}})</i>
            {{i.TotalConfirmed}}
          </td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{i.NewRecovered}})</i>
            {{i.TotalRecovered}}
          </td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{i.NewDeaths}})</i>
            {{i.TotalDeaths}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      newitems: [],
      global: [],
      x: []
    };
  },

  methods: {
    mysort() {
      this.newitems = this.$store.getters.allItems;
      this.global = this.$store.getters.allGlobal;

      console.log("here");

      this.x = this.newitems
        .sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1))
        .slice(0, 50);
      console.log(this.x);
    },

    detailed(i) {
      console.log(i, i.slug);
      this.$router.push({
        path: "/country/" + i.Slug,
        params: { country: i.Country }
      });
    }
  },
  created() {
    this.mysort();
  }
};
</script>
<style scoped>
i {
  color: red;
}
</style>