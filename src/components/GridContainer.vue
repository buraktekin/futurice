<template>
  <sui-grid-row class="hq-grid-row">
    <sui-grid-column :class="'hq-infoarea' + (!isPanelActive ? '__wide' : '')">
      <FilterContainer/>
      <Map/>
      <ButtonGroup/>
      <Charts/>
      <Loading v-if="this.$store.state.loading"/>
    </sui-grid-column>

    <sui-grid-column :class="'hq-globe' + (isPanelActive ? '__active' : '')">
      <SidePanel/>
    </sui-grid-column>
  </sui-grid-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Map from '@/components/Map.vue';
import Loading from '@/components/Loading.vue';
import SidePanel from '@/components/SidePanel.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import FilterContainer from '@/components/FilterContainer.vue';
import Charts from '@/components/Charts.vue';
import store from '@/store/index';

@Component({
  name: 'GridContainer',
  components: {
    Map,
    Loading,
    SidePanel,
    ButtonGroup,
    FilterContainer,
    Charts,
  },
})
export default class GridContainer extends Vue {
  constructor() {
    super();
  }

  // Getters
  get isPanelActive() {
    return store.state.isSidePanelOpen;
  }

  // Methods
}
</script>

<style scoped>
.hq-grid-row {
  top: 0px;
}
</style>
