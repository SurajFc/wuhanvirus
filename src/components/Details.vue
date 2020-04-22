<template>
  <div class="container">
    <div class="row mt-2">
      <h3 class="text-center offset-md-5">Total Cases :</h3>
      <h3
        style="color:gray; margin-left:5px; font-weight: bold;"
      >{{this.$store.getters.CurItem['TotalConfirmed'] | numberWithCommas}}</h3>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3 col-sm-10">
        <GChart
          type="PieChart"
          :data="[['Status','Cases'],
        ['Active',this.$store.getters.CurItem['TotalConfirmed'] - this.$store.getters.CurItem['TotalDeaths'] - this.$store.getters.CurItem['TotalRecovered']],
        ['Deaths',this.$store.getters.CurItem['TotalDeaths']],
        ['Recovered',this.$store.getters.CurItem['TotalRecovered'] ]
        ]"
          :options="{
      chart: {
      title: 'Confirmed',
      curveType: 'function',
      },
      height:500,
   
      is3D:true,
      hAxis: { title: 'Date' },
      vAxis: { title: 'Cases'}
      }"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
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
          curveType: 'function',
          
        },
        height:400,
        colors:['gray'],
        is3D:true,
        hAxis: { title: 'Date' },
        vAxis: { title: 'Cases'}
        }"
        />
      </div>
      <div class="col-md-6 col-sm-12">
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
      height:400,
    colors:['gray'],
      vAxis: { title: 'Cases', logScale: true }
      }"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 col-sm-12">
        Total Coronavirus Patients Recovered in
        <b style="margin-left:5px;">
          <p class="text-capitalize">{{ country}}</p>
        </b>
        <GChart
          type="AreaChart"
          :data="rec"
          :options="{
        chart: {
          title: 'Recovered',
          curveType: 'function'
        },
        colors:['green'],
        logScale:true,
        height:400,
       
        hAxis: { title: 'Date' },
        vAxis: { title: 'Cases' }
      }"
        />
      </div>
      <div class="col-md-6 col-sm-12">
        Daily New Recovered in
        <b style="margin-left:5px;">
          <p class="text-capitalize">{{ country}}</p>
        </b>
        <GChart
          type="ColumnChart"
          :data="dailyRec"
          :options="{
        chart: {
        title: 'Recovered',
        curveType: 'function'
        },
       colors:['green'],
       logScale:true,
        height:400,
        vAxis: { title: 'Cases' }
        }"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-6 col-sm-12">
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
        colors:['red'],
        height:400,
       
        hAxis: { title: 'Date' },
        vAxis: { title: 'Cases' }
      }"
        />
      </div>
      <div class="col-md-6 col-sm-12">
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
       colors:['red'],
        height:400,
        logScale:true,
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
import NumComma from "@/mixins/NumComma";

export default {
  name: "Details",
  props: ["country"],
  data() {
    return {
      data: [],
      chartData: [["date", "Confirmed"]],
      daily: [["date", "Daily"]],
      tdata: [],
      death: [["date", "deaths"]],
      dailyDeath: [["date", "deaths"]],

      rdata: [],
      rec: [["date", "Recovered"]],
      dailyRec: [["date", "Recovered"]]
    };
  },

  mixins: [NumComma],
  methods: {
    Cases(a, b) {
      for (var i = 0; i < a.length - 1; i++) {
        var t = a[i].Cases;
        for (var j = i + 1; j < a.length; j++) {
          if (a[i].Date.split("T")[0] == a[j].Date.split("T")[0]) {
            t += a[j].Cases;
          } else {
            i = j - 1;
            break;
          }
        }
        b.push([this.getHumanDate(a[i].Date), t]);
        console.log("here", b);
      }
    },

    newDailyCases() {
      for (var k = 0; k < this.chartData.length - 1; k++) {
        var l = k + 1;
        this.daily.push([
          this.chartData[k][0],
          Math.abs(this.chartData[l][1] - this.chartData[k][1])
        ]);
      }
    },

    newDailyDeathCases() {
      for (var j = 0; j < this.death.length - 1; j++) {
        var k = j + 1;
        this.dailyDeath.push([
          this.death[j][0],
          Math.abs(this.death[k][1] - this.death[j][1])
        ]);
      }
    },

    newDailyRec() {
      for (var j = 0; j < this.rec.length - 1; j++) {
        var k = j + 1;
        this.dailyRec.push([
          this.rec[j][0],
          Math.abs(this.rec[k][1] - this.rec[j][1])
        ]);
      }
    },
    getHumanDate: function(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MMM");
    }
  },
  created() {
    var currentdate = new Date().toISOString().split("T")[0];
    axios
      .get(
        `https://api.covid19api.com/country/${this.country}/status/confirmed?from=2020-03-01T00:00:00Z&to=${currentdate}T00:00:00Z`
      )
      .then(res => {
        this.data = res.data;
        this.Cases(this.data, this.chartData);
        this.$store.dispatch("GetDetails", this.country);
        this.newDailyCases();
      })
      .catch();

    axios
      .get(
        `https://api.covid19api.com/country/${this.country}/status/recovered?from=2020-03-01T00:00:00Z&to=${currentdate}T00:00:00Z`
      )
      .then(res => {
        this.rdata = res.data;
        this.Cases(this.rdata, this.rec);
        this.newDailyRec();
      })
      .catch();

    axios
      .get(
        `https://api.covid19api.com/country/${this.country}/status/deaths?from=2020-03-01T00:00:00Z&to=${currentdate}T00:00:00Z`
      )
      .then(res => {
        this.tdata = res.data;
        this.Cases(this.tdata, this.death);
        this.newDailyDeathCases();
      })
      .catch();
  }
};
</script>
<style scoped>
</style>