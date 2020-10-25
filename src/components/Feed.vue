<template>
  <sui-feed class="hq-feed">
    <FeedItem v-for="(item, i) in earthquakes" :key="i" :eq="item"/>
  </sui-feed>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { CircleMarker, CircleMarkerOptions } from 'leaflet';
import FeedItem from '@/components/FeedItem.vue';
import event from '@/services/eventService';
import store from '@/store/index';

@Component({
  name: 'Feed',
  components: {
    FeedItem,
  },
})
export default class Feed extends Vue {
  public interval: any = null;
  constructor() {
    super();
  }

  get earthquakes() {
    return store.state.earthquakes;
  }

  set earthquakes(newData: CircleMarker[]) {
    this.earthquakes = newData;
  }

  get magLimit() {
    return store.state.magLimit;
  }

  get limit() {
    return store.state.earthquakes;
  }

  // Methods
  public beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss">
.hq-feed {
  width: 100%;
  height: calc(100vh - 120px) !important;
  overflow: scroll;
}
</style>