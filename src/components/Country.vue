<template>
  <div class="container">
    <GChart
      type="AreaChart"
      :data="chartData"
      :options="{
          chart: {
          title: 'Confirmed',
          curveType: 'function'
        },
        is3D: true,
        width: 1200,
        height: 400,
        hAxis: { title: 'Date' },
        vAxis: { title: 'Cases'}
        }"
    />
  </div>
</template>

<script>
// import axios from "axios";
import moment from "moment";

export default {
  name: "Country",
  data() {
    return {
      chartData: [["Country", "Popularity"]],
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
      console.log(this.temp);
      for (var i = 0; i < this.temp.length - 1; i++) {
        this.chartData.push([
          this.temp[i].Country,
          this.temp[i].TotalConfirmed
        ]);
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