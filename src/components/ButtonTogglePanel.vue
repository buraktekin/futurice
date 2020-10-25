<template>
  <sui-button 
      class="hq-btn hq-btn-expand" 
      data-target="expand" 
      icon="bullhorn" 
      size='huge'
      circular
      secondary
      @click='togglePanel'
    />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Map from '@/components/Map.vue';
import store from '@/store/index';

@Component({
  name: 'ButtonTogglePanel',
  components: {},
})
export default class ButtonTogglePanel extends Vue {
  constructor() {
    super();
  }

  get isActive() {
    return store.state.isSidePanelOpen;
  }

  // Methods
  public togglePanel() {
    return store.dispatch('toggleSidePanel', !this.isActive);
  }
}
</script>

<style scoped></style>
