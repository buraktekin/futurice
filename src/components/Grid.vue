<template>
  <div class="hq-grid">
    <sui-grid :columns="2" divided>
      <router-view/>
    </sui-grid>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';

import Map from '@/components/Map.vue';
import Navbar from '@/components/Navbar.vue';
import store from '@/store/index';

@Component({
  name: 'Grid',
  components: {
    Navbar,
    Map,
  },
})
export default class Grid extends Vue {
  public panelOpen: boolean = false;

  constructor() {
    super();
  }

  public togglePanel() {
    this.panelOpen = !this.panelOpen;
  }

  public data() {
    return {
      loading: this.$store.state.loading,
      percent: 100,
      panelOpen: this.panelOpen,
    };
  }
}
</script>

<style scoped></style>
