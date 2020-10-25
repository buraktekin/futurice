<template>
  <div class="map-container">
    <div id="map" ref="mapElement"></div>
  </div>
</template>

<script lang="ts">
/**
 * ================
 * Map Component
 * ================
 * @purpose: Map component contains a Leaflet Map
 * to let us see the location points of the real-time
 * generated earthquake data.
 */
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { LMap, LTileLayer, LIcon } from 'vue2-leaflet';
import L from 'leaflet';
import createMap from '@/services/mapService';
import event from '@/services/eventService';
import store from '@/store/index';

import Notification from '@/components/Notification.vue';

@Component({
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LIcon,
    Notification,
  },
})
export default class Map extends Vue {
  public timer: any = null;
  public loading: boolean = false;
  public markers: [] = [];
  public map: any = {};

  constructor() {
    super();
  }

  // Watchers
  @Watch('isPanelActive')
  public onIsPanelActiveChanged(value: string, oldValue: string) {
    setTimeout(() => {
      this.map.invalidateSize(true);
    }, 200);
  }

  // Getters
  get isPanelActive() {
    return store.state.isSidePanelOpen;
  }

  // Methods
  private beforeDestroy() {
    clearInterval(this.timer);
  }

  private mounted() {
    this.map = createMap('map', L);
    store.state.map = this.map;
    event.getEarthquakeInformation(this.map);
    event.getRealTime(this.map);
  }
}
</script>

<style scoped lang="scss">
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

#notifications {
  position: fixed;
  width: 20%;
  height: 150px;
  top: 20px;
  right: 20px;
  z-index: 10;
}
</style>
