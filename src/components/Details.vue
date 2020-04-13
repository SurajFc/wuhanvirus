<template>
  <div class="container mt-3 mb-2">
    detailed view
    {{country}}
    <div class="row-2">
      <GChart type="LineChart" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Details",
  props: ["country"],
  data() {
    return {
      data: [],
      // casedate: [],
      // cases: [],
      chartData: [["date", "Cases"]],
      chartOptions: {
        chart: {
          title: "No of Cases",
          subtitle: "From Mar to Current"
        }
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
        this.chartData.push([e["Date"].split("T")[0], e["Cases"]]);
      });
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