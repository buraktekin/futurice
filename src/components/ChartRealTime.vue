<template>
  <sui-card class="chart">
    <sui-card-content>
      <sui-card-header>Elliot Fu</sui-card-header>
      <sui-card-meta>Friend</sui-card-meta>
      <sui-card-description>
        <div id="chart"></div>
      </sui-card-description>
    </sui-card-content>
  </sui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);

@Component({
  name: 'ChartRealTime',
  components: {
    VueApexCharts,
  },
})
export default class ChartRealTime extends Vue {
  public options = {};

  constructor() {
    super();
  }

  // Getters

  // Methods
  public mounted() {
    const chart = new ApexCharts(document.querySelector('#chart'), this.options);
    chart.render();
  }
}
</script>

<style scoped>
#charts {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
</style>
