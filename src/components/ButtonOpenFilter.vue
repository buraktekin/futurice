<template>
  <sui-button 
      class="hq-btn hq-btn-expand" 
      data-target="modal" 
      icon="calendar" 
      size='huge'
      circular
      color="red"
      @click='togglePanel'
    />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import store from '@/store/index';

@Component({
  name: 'ButtonOpenFilter',
  components: {},
})
export default class ButtonOpenFilter extends Vue {
  constructor() {
    super();
  }

  get isActive() {
    return store.state.isFilterOpen;
  }

  // Methods
  public togglePanel() {
    return store.dispatch('toggleFilter', !this.isActive);
  }
}
</script>

<style scoped></style>
