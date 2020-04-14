<template>
  <div class="container mt-3 mb-2">
    detailed view
    {{country}}
    <div class="row">
      <div class="col-8">
        <GChart type="AreaChart" :data="chartData" :options="chartOptions" />
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
      data: [],
      tdata: [],
      chartData: [["date", "Confirmed"]],
      chartOptions: {
        chart: {
          title: "Confirmed",
          curveType: "function"
        },
        is3D: true,
        width: 650,
        height: 400,
        hAxis: { title: "Date" },
        vAxis: { title: "Cases" }
      }
    };
  },

  methods: {
    filterData() {
      //   this.data.forEach(e => {
      //     this.casedate.push(e["Date"].split("T")[0]),
      //       this.cases.push(e["Cases"]);
      //   });
      //   this.casedate.map((val, idx) => {
      //     this.chartData[val].push([this.cases[idx]]);
      //   });
      //   console.log("skjfhsdkjf", this.chartData);
      // }
      this.data.forEach(e => {
        this.tdata.push([this.getHumanDate(e["Date"]), e["Cases"]]);
      });
      console.log(this.tdata, this.tdata.length);
      for (var i = this.tdata.length - 45; i < this.tdata.length; i++) {
        this.chartData.push(this.tdata[i]);
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
      })
      .catch();
  }
};
</script>