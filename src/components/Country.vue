<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9 offset-2">
        <MapChart
          :countryData="chartData"
          highColor="#ff0000"
          lowColor="#aaaaaa"
          countryStrokeColor="#909090"
          defaultCountryFillColor="#dadada"
        />
      </div>
    </div>

    <div class="row">
      <b-col class="offset-6"></b-col>
      <b-col sm="3">
        <b-form-input id="input-default" v-model="q" placeholder="Search Country"></b-form-input>
      </b-col>
      <b-col sm="2">
        <b-button variant="success" @click="result()">Search</b-button>
      </b-col>
    </div>
    <div class="row mt-4">
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
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MapChart from "vue-map-chart";
import NumComma from "@/mixins/NumComma";

export default {
  name: "Country",
  components: {
    MapChart
  },
  data() {
    return {
      chartData: {},
      temp: [],
      xx: [],
      q: ""
    };
  },
  mixins: [NumComma],
  methods: {
    getHumanDate: function(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MMM");
    },
    TotalConfirmedCases() {
      this.temp = this.$store.getters.allItems;

      for (var i = 0; i < this.temp.length - 1; i++) {
        this.chartData[this.temp[i].CountryCode] = this.temp[i].TotalConfirmed;
      }
      this.xx = this.$store.getters.allItems;
    },
    result() {
      if (this.q != "") {
        this.xx = this.xx.filter(res => {
          return (
            res.Country.toLowerCase().includes(this.q.toLowerCase()) ||
            res.Slug.toLowerCase().includes(this.q.toLowerCase())
          );
        });
        console.log(this.xx);
      } else {
        this.xx = this.$store.getters.allItems;
      }
    }
  },

  mounted() {
    this.TotalConfirmedCases();
  }
};
</script>

<style>
</style>