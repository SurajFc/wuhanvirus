<template>
  <div class="container mb-3 mt-3">
    <b-card-group deck class="mb-3">
      <b-card bg-variant="danger" text-variant="white" header="Confirmed" class="text-center">
        <b-card-text>{{global.TotalConfirmed | numberWithCommas}}</b-card-text>
      </b-card>

      <b-card bg-variant="info" text-variant="white" header="Active" class="text-center">
        <b-card-text>{{(global.TotalConfirmed - global.TotalRecovered - global.TotalDeaths)| numberWithCommas}}</b-card-text>
      </b-card>

      <b-card bg-variant="success" text-variant="white" header="Recovered" class="text-center">
        <b-card-text>{{global.TotalRecovered | numberWithCommas}}</b-card-text>
      </b-card>
      <b-card bg-variant="light" text-variant="black" header="Deceased" class="text-center">
        <b-card-text>{{global.TotalDeaths | numberWithCommas}}</b-card-text>
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
        <tr>
          <th scope="row">#</th>
          <td>
            <router-link to="/country">World</router-link>
          </td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{global.NewConfirmed | numberWithCommas}})</i>
            {{global.TotalConfirmed | numberWithCommas}}
          </td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{global.NewRecovered | numberWithCommas}})</i>
            {{global.TotalRecovered | numberWithCommas}}
          </td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{global.NewDeaths | numberWithCommas}})</i>
            {{global.TotalDeaths | numberWithCommas}}
          </td>
        </tr>
        <tr v-for="(i,index) in xx" :key="i.id">
          <th scope="row">{{index+1}}</th>
          <td>
            <router-link :to="{name: 'Details',params: { country: i.Slug}}">{{i.Country}}</router-link>
          </td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{i.NewConfirmed | numberWithCommas}})</i>
            {{i.TotalConfirmed | numberWithCommas}}
          </td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{i.NewRecovered | numberWithCommas}})</i>
            {{i.TotalRecovered | numberWithCommas}}
          </td>
          <td>
            <b-icon
              icon="arrow-counterclockwise"
              animation="spin-reverse"
              font-scale="1"
              variant="danger"
            ></b-icon>
            <i>({{i.NewDeaths | numberWithCommas}})</i>
            {{i.TotalDeaths | numberWithCommas}}
          </td>
        </tr>
      </tbody>
    </table>
    <span class="float-right">
      <router-link to="/country">View All</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      newitems: [],
      global: [],
      xx: []
    };
  },
  filters: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    mysort() {
      this.newitems = this.$store.getters.allItems;
      this.global = this.$store.getters.allGlobal;

      this.xx = this.newitems
        .sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1))
        .slice(0, 30);
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