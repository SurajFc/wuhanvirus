<template>
  <div class="container-fluid">
    <!-- detailed view
    {{country}}-->
    <div class="container">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>
    <div class="row mt-4 mb-4">
      <h3 class="text-center offset-4">Coronavirus Cases:</h3>
      <h3
        style="color:gray; font-weight: bold;"
      >{{this.$store.getters.CurItem['TotalConfirmed'] | numberWithCommas}}</h3>
    </div>
    <div class="row mt-4 mb-4">
      <h3 class="text-center offset-4">Deaths:</h3>
      <h3
        style="color:red; font-weight: bold;"
      >{{this.$store.getters.CurItem['TotalDeaths'] | numberWithCommas}}</h3>
    </div>
    <div class="row mt-4 mb-4">
      <h3 class="text-center offset-4">Recovered:</h3>
      <h3
        style="color:green; font-weight: bold;"
      >{{this.$store.getters.CurItem['TotalRecovered'] | numberWithCommas}}</h3>
    </div>
    <!-- <div class="row mt-4 mb-4">
      <h4>Todays Cases</h4>
    </div>-->
    <div class="row">
      <div class="col-6">
        Total Coronavirus Cases in
        <b style="margin-left:5px;">
          <p class="text-capitalize">{{country}}</p>
        </b>
        <GChart
          type="AreaChart"
          :data="chartData"
          :options="{
          chart: {
          title: 'Confirmed',
          curveType: 'function'
        },
        is3D: true,
        width: 600,
        height: 360,
        hAxis: { title: 'Date' },
        vAxis: { title: 'Cases'}
        }"
        />
      </div>
      <div class="col-6">
        Daily New Cases in
        <b style="margin-left:5px;">
          <p class="text-capitalize">{{ country}}</p>
        </b>
        <GChart
          type="ColumnChart"
          :data="daily"
          :options="{
      chart: {
      title: 'Confirmed',
      curveType: 'function'
      },
      width: 600,
      height: 360,
      bars: 'vertical',
      hAxis: { title: 'Date' },
      vAxis: { title: 'Cases' }
      }"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-6">
        Total Coronavirus Deaths in
        <b style="margin-left:5px;">
          <p class="text-capitalize">{{ country}}</p>
        </b>
        <GChart
          type="AreaChart"
          :data="death"
          :options="{
        chart: {
          title: 'Deaths',
          curveType: 'function'
        },
        is3D: true,
        width: 650,
        height: 400,
        hAxis: { title: 'Date' },
        vAxis: { title: 'Cases', logScale: true }
      }"
        />
      </div>
      <div class="col-6">
        Daily New Deaths in
        <b style="margin-left:5px;">
          <p class="text-capitalize">{{ country}}</p>
        </b>
        <GChart
          type="ColumnChart"
          :data="dailyDeath"
          :options="{
        chart: {
          title: 'Deaths',
          curveType: 'function'
        },
        is3D: true,
        width: 650,
        height: 400,
        hAxis: { title: 'Date' },
        vAxis: { title: 'Cases' }
      }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Details",
  props: ["country"],
  data() {
    return {
      items: [
        {
          text: "Home",
          to: { path: "/" }
        },
        {
          text: "Country",
          to: { name: "country" }
        },
        { text: this.country, active: true }
      ],
      data: [],
      chartData: [["date", "Confirmed"]],
      daily: [["date", "Daily"]],
      tdata: [],
      death: [["date", "deaths"]],
      dailyDeath: [["date", "deaths"]]
    };
  },
  filters: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    filterData() {
      console.log("in filter data");
      for (var i = 0; i < this.data.length - 1; i++) {
        var t = 0;

        for (var j = i + 1; j < this.data.length; j++) {
          console.log(
            this.data[i].Date.split("T")[0],
            this.data[j].Date.split("T")[0]
          );
          if (
            this.data[i].Date.split("T")[0] == this.data[j].Date.split("T")[0]
          ) {
            t += this.data[j].Cases;
            console.log("=====>", t);
          } else {
            t = this.data[i].Cases;
            i = j - 1;
            break;
          }
        }
        this.chartData.push([this.getHumanDate(this.data[i].Date), t]);
        console.log(this.chartData);
      }
      this.$store.dispatch("GetDetails", this.country);
    },
    newDailyCases() {
      for (var j = this.data.length - 45; j < this.data.length - 2; ++j) {
        var k = j + 1;
        this.daily.push([
          this.getHumanDate(this.data[j].Date),
          Math.abs(this.data[k].Cases - this.data[j].Cases)
        ]);
      }
    },
    AllDeathData() {
      for (var i = this.tdata.length - 45; i < this.tdata.length; i++) {
        this.death.push([
          this.getHumanDate(this.tdata[i].Date),
          this.tdata[i].Cases
        ]);
      }
    },
    newDailyDeathCases() {
      for (var j = this.tdata.length - 45; j < this.tdata.length - 2; ++j) {
        var k = j + 1;
        this.dailyDeath.push([
          this.getHumanDate(this.tdata[j].Date),
          Math.abs(this.tdata[k].Cases - this.tdata[j].Cases)
        ]);
      }
    },
    getHumanDate: function(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MMM");
    }
  },
  created() {
    axios
      .get(
        `https://api.covid19api.com/dayone/country/${this.country}/status/confirmed`
      )
      .then(res => {
        this.data = res.data;
        this.filterData();
        this.newDailyCases();
      })
      .catch();
    axios
      .get(
        `https://api.covid19api.com/dayone/country/${this.country}/status/deaths`
      )
      .then(res => {
        console.log("DEaths", res.data);
        this.tdata = res.data;
        this.AllDeathData();
        this.newDailyDeathCases();
      })
      .catch();
  }
};
</script>
<style scoped>
</style>