<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9 offset-2">
        <MapChart
          :countryData="chartData"
          highColor="#0000A0"
          lowColor="#ADD8E6"
          countryStrokeColor="#909090"
          defaultCountryFillColor="#dadada"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MapChart from "vue-map-chart";

export default {
  name: "Country",
  components: {
    MapChart
  },
  data() {
    return {
      chartData: {},
      temp: []
    };
  },
  filters: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
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
    }
  },
  created() {
    this.TotalConfirmedCases();
  }
};
</script>

<style>
</style>