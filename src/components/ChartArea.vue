<template>
  <sui-card class="chart">
    <ChartLoading v-if="this.$store.state.chartloading"/>
    <sui-card-content>
      <sui-card-header>{{item.options.place}}</sui-card-header>
      <sui-card-meta>Last 3 years of sismic activities</sui-card-meta>
      <sui-card-description>
        <div id="synced-charts">
          <div id="chart"></div>
        </div>
      </sui-card-description>
    </sui-card-content>
  </sui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
import axios from 'axios';
import event from '@/services/eventService';
import store from '@/store/index';
import { CircleMarker } from 'leaflet';
import ChartLoading from '@/components/ChartLoading.vue';

Vue.use(VueApexCharts);

@Component({
  name: 'ChartArea',
  components: {
    VueApexCharts,
    ChartLoading,
  },
})
export default class ChartSync extends Vue {
  public options = {
    series: [{
      data: this.axis,
    }],
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 200,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    annotations: {
      yaxis: [{
        y: 30,
        borderColor: '#999',
        label: {
          show: true,
          text: 'Magnitude',
          style: {
            color: '#fff',
            background: '#00E396',
          },
        },
      }],
      xaxis: [{
        x: new Date(Date.now()).getTime(),
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,
          text: 'Years',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
        },
      }],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  constructor() {
    super();
  }

  get item() {
    return store.state.charts.data;
  }

  get axis() {
    return store.state.charts.axis;
  }

  set axis(newVal) {
    store.state.charts.axis = newVal;
  }

  get isActive() {
    return store.state.charts.active;
  }

  public mounted() {
    const chart = new ApexCharts(document.querySelector('#chart'), this.options);
    chart.render();

    const resetCssClasses = (activeEl: any) => {
      const els = document.querySelectorAll('button');
      Array.prototype.forEach.call(els, (el) => {
        el.classList.remove('active');
      });

      activeEl.target.classList.add('active');
    };
  }
}
</script>

<style scoped></style>
