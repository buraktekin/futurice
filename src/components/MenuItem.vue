<template>
  <sui-list :class="pos">
    <sui-list-item v-for="(item, index) in items" :key="index">
      <router-link is="sui-list-header" :to="item.route" v-if="!brand">
        <i :class="item.icon + ' icon'"></i>
        {{ item.name }}
      </router-link>
      <router-link is="sui-list-header" :to="item.route" v-else>
        <div class="hq-brand" data-abbr="HQ">
          <img class="hq-brand__logo" src='@/assets/logo.svg' alt="Logo" />
          <p class="hq-brand__title">{{item.name}}</p>
        </div>
      </router-link>
    </sui-list-item>
  </sui-list>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FeedItem from '@/components/FeedItem.vue';
import store from '@/store/index';
import { CircleMarker, CircleMarkerOptions } from 'leaflet';

@Component({
  name: 'Feed',
  components: {
    FeedItem,
  },
  props: {
    pos: {
      type: String,
    },
    brand: {
      type: Boolean,
    },
    items: {
      type: Array,
    },
  },
})
export default class Feed extends Vue {
  public earthquakes: CircleMarker[] = [];

  constructor() {
    super();
  }

  // Methods
  public mounted() {
    this.earthquakes = store.state.earthquakes;
  }
}
</script>

<style lang="scss">
.hq-feed {
  width: 100%;
}
</style>