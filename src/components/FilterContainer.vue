<template>
  <div class="hq-filters" v-if="isActive">
    <div class="hq-filter-container">
      <label>Magnitude: </label>
      <FilterByMagnitude/>
    </div>
    <div class="hq-filter-container">
      <label>Date: </label>
      <FilterByTime/>
    </div>

    <div class="hq-filter-container">
      <label>Data Limit (Points): </label>
      <FilterByNumber/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FilterByMagnitude from '@/components/FilterByMagnitude.vue';
import FilterByTime from '@/components/FilterByTime.vue';
import FilterByNumber from '@/components/FilterByNumber.vue';
import store from '@/store/index';

@Component({
  name: 'FilterContainer',
  components: {
    FilterByMagnitude,
    FilterByTime,
    FilterByNumber,
  },
})
export default class FilterContainer extends Vue {
  get isActive() {
    return store.state.isFilterOpen;
  }
}
</script>

<style scoped lang="scss"></style>
