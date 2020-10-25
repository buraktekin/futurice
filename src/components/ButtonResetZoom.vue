<template>
    <sui-button 
      v-if="zoom > 2"
      class="hq-btn hq-btn-rzoom" 
      data-target="map"
      icon="zoom-out"
      size='huge'
      circular
      primary
      @click='resetZoom'
    ></sui-button>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { LatLng, LatLngBounds } from 'leaflet';
import { CENTER, ZOOM, BOUNDS } from '@/services/mapService';
import store from '@/store/index';

@Component({
  name: 'ButtonResetZoom',
  components: {},
})
export default class ButtonResetZoom extends Vue {
  constructor() {
    super();
  }

  get zoom() {
    const map: L.Map = store.state.map;
    // @ts-ignore
    return map._zoom;
  }

  // Methods
  private resetZoom() {
    // store.state.map.setMaxBounds(BOUNDS);
    store.state.map.flyTo(CENTER, ZOOM);
  }

}
</script>

<style scoped>
</style>