<template>
  <div id="charts" :class="isActive ? ' active': ''">
    <sui-card-group :items-per-row="1" v-model="chartItem" v-if="isActive">
      <chart-area v-model="chartItem"></chart-area>
      <chart-sync v-model="chartItem"></chart-sync>
    </sui-card-group>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import ChartArea from '@/components/ChartArea.vue';
import store from '@/store/index';

@Component({
  name: 'Charts',
  components: {
    ChartArea,
  },
})
export default class Charts extends Vue {
  constructor() {
    super();
  }

  get isActive() {
    return store.state.charts.active;
  }

  get chartItem() {
    return store.state.charts.data;
  }

  get chartData() {
    return store.state.charts.axis;
  }

  public toggleCharts() {
    return store.state.charts.active = !this.isActive;
  }
}
</script>
<style lang="scss" scoped>
#charts {
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: -100;
  width: 25vw;
  height: calc(100% - 100px);
  z-index: 10;
  overflow: scroll;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: all 1s ease-in-out;
  &.active {
    opacity: 1;
    bottom: 30px;
    left: 30px;
  }
}
</style>