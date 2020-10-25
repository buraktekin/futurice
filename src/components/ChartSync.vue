<template>
  <sui-card class="chart" v-model="isDataLoaded">
    <ChartLoading v-if="this.$store.state.chartloading"/>
      <sui-card-header>Elliot Fu</sui-card-header>
      <sui-card-meta>Friend</sui-card-meta>
      <sui-card-description>
        <div id="synced-charts">
          <div id="chart-line"></div>
          <div id="chart-area"></div>
        </div>
      </sui-card-description>
    </sui-card-content>
  </sui-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import { CircleMarker } from 'leaflet';
import store from '@/store/index';
import ChartLoading from '@/components/ChartLoading.vue';
Vue.use(VueApexCharts);

@Component({
  name: 'ChartSync',
  components: {
    VueApexCharts,
    ChartLoading,
  },
  props: {
    item: {
      type: CircleMarker,
    },
  },
})
export default class ChartSync extends Vue {
  public optionsLine = {
    series: [{
      data: [45, 52, 38, 45, 19, 33],
    }],
    colors: ['#00E396'],
    chart: {
      id: 'line-1',
      group: 'social',
      type: 'line',
      height: 150,
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        minWidth: 40,
      },
    },
  };

  public optionsArea = {
    series: [{
      data: [45, 52, 38, 45, 19, 33],
    }],
    colors: ['#008FFB'],
    chart: {
      id: 'area-1',
      group: 'social',
      type: 'area',
      height: 150,
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        minWidth: 40,
      },
    },
  };

  constructor() {
    super();
  }

  // Getters
  get isDataLoaded() {
    return store.state.charts.axis;
  }
  // Methods
  public mounted() {
    const chart1 = new ApexCharts(document.querySelector('#chart-line'), this.optionsLine);
    const chart2 = new ApexCharts(document.querySelector('#chart-area'), this.optionsArea);
    chart1.render();
    chart2.render();
  }
}
</script>

<style scoped></style>
