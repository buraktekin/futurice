<template>
  <sui-feed-event 
    @mouseenter="handleMouseEnter(eq)"
    @mouseleave="handleMouseLeave(eq)"
    @click="getCharts(eq)"
  >
    <sui-feed-label>
      <h3>{{ eq.options.mag.toFixed(1) }}</h3>
      <sui-image :src="image" />
    </sui-feed-label>
    <sui-feed-content>
      <span><i class="icon lightning"/> Significancy: {{this.obj.sig}}</span>
      <h4>{{this.obj.place}}</h4>
      <p>Latitude: {{this.obj.latlng[0]}} -
      Longitude: {{this.obj.latlng[1]}}</p>
      <sui-feed-date :content="date"/>
      <p><i class="icon linkify"/><a :href="this.obj.url">Source</a></p>
      
    </sui-feed-content>
  </sui-feed-event>
</template>

<script lang="ts">
import L, { CircleMarker, CircleMarkerOptions } from 'leaflet';
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import event from '@/services/eventService';
import store from '@/store/index';

@Component({
  name: 'FeedItem',
  components: {},
  props: {
    eq: {
      type: CircleMarker,
    },
  },
})
export default class FeedItem extends Vue {
  private obj: CircleMarker = this.$props.eq.options;
  // @ts-ignore
  private mag: number = this.obj.mag;
  // @ts-ignore
  private image: string = this.getIndicator(this.mag);
  // @ts-ignore
  private date: string = new Date(this.obj.time).toString();
  // @ts-ignore
  private finding: any = null;

  constructor() {
    super();
  }

  get isActive() {
    return store.state.charts.active;
  }

  // Methods
  private getIndicator(datum: number) {
    return(
      datum > 8.0 ? 'https://img.icons8.com/windows/96/000000/--lethal-22.png' :
      datum > 6.0 ? 'https://img.icons8.com/office/80/000000/high-risk.png' :
      datum > 4.0 ? 'https://img.icons8.com/color/96/000000/earthquakes.png' :
      'https://img.icons8.com/ultraviolet/80/000000/approximately-equal-2.png'
    );
  }

  // private filterLocation(item: CircleMarker) {}
  private findLocation(item: CircleMarker) {
    item.bringToFront();
    // @ts-ignore
    store.state.map.flyTo(item.options.latlng, 5);
  }

  private handleMouseEnter(item: CircleMarker) {
    item.setStyle({
      fillColor: '#FF0000',
      color: '#FF0000',
    });
    this.findLocation(item);
  }

  private handleMouseLeave(item: CircleMarker) {
    item.setStyle({
      // @ts-ignore
      fillColor: event.getColor(item.options.mag),
      // @ts-ignore
      color: event.getColor(item.options.mag),
    });
    store.state.charts.active = false;
  }

  private getCharts(item: CircleMarker) {
    store.state.charts.active = true;
    store.state.charts.data = item;

    const filters = {
      latitude: this.$props.eq.options.latlng[0],
      longitude: this.$props.eq.options.latlng[1],
      maxradius: 2,
      format: 'geojson',
      limit: 100,
    };
    const end = new Date(Date.now());
    // @ts-ignore
    filters.endtime = event.dateFormatted(end);
    const start = new Date(end.setDate(end.getDate() - 3 * 365));
    // @ts-ignore
    filters.starttime = event.dateFormatted(start);

    // set url
    const url = event.setFilterParamsToURL(filters);
    store.state.chartloading = true;
    const response = axios.get(url);
    response.then((res) => {
      const data = [];
      const features = res.data.features;
      for (const feature of features) {
        const prop = feature.properties;
        data.push([prop.time, prop.mag]);
      }
      store.state.charts.axis = data;
      store.state.chartloading = false;
    });
  }
}
</script>

<style lang="scss" scoped>
h3, .label {
  color: #000000;
  text-align: center;
}
p, h4 {
  color: #000;
}
span{
  color: #a5a5a5;
}
.date {
  margin-bottom: 3px;
}
</style>