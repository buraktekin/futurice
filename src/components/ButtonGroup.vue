<template>
  <div>
    <div :class="'hq-button-group ' + (this.$store.state.isFilterOpen ? '' : 'top')">
      <button-open-filter/>
      <button-toggle-panel/>
    </div>
    <div class="hq-button-group bottom">
      <button-reset-zoom/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ButtonOpenFilter from '@/components/ButtonOpenFilter.vue';
import ButtonTogglePanel from '@/components/ButtonTogglePanel.vue';
import ButtonResetZoom from '@/components/ButtonResetZoom.vue';
import store from '@/store/index';

@Component({
  name: 'ButtonGroup',
  components: {
    ButtonOpenFilter,
    ButtonTogglePanel,
    ButtonResetZoom,
  },
})
export default class ButtonGroup extends Vue {
  constructor() {
    super();
  }
  get isFilterActive() {
    return store.state.isFilterOpen;
  }
  // Methods
}
</script>

<style scoped></style>
