<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2 mb-4">
        <MapChart
          :countryData="chartData"
          highColor="#0000FF"
          lowColor="#ADD8E6"
          countryStrokeColor="#909090"
          defaultCountryFillColor="#dadada"
        />
      </div>
    </div>

    <div class="row">
      <b-col class="offset-md-6"></b-col>
      <b-col sm="3" md="3" class="mb-2">
        <b-form-input id="input-default" v-model="q" placeholder="Search Country"></b-form-input>
      </b-col>
      <br />
      <b-col sm="2" md="2">
        <b-button variant="success" @click="result()">Search</b-button>
      </b-col>
    </div>
    <div class="row-cols-md-12 row-cols-sm-12 mt-4">
      <table class="table table-hover">
        <thead class="thead-light">
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
              <b-icon icon="arrow-up" font-scale="1" variant="danger"></b-icon>
              <i>({{i.NewConfirmed | numberWithCommas}})</i>
              {{i.TotalConfirmed | numberWithCommas}}
            </td>
            <td>
              <b-icon icon="arrow-up" font-scale="1" variant="danger"></b-icon>
              <i>({{i.NewRecovered | numberWithCommas}})</i>
              {{i.TotalRecovered | numberWithCommas}}
            </td>
            <td>
              <b-icon icon="arrow-up" font-scale="1" variant="danger"></b-icon>
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
      console.log(this.chartData);
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

  created() {
    this.TotalConfirmedCases();
  }
};
</script>

<style>
</style>