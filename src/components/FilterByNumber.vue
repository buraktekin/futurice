<template>
  <sui-form v-on:submit.prevent>
    <sui-form-field>
      <sui-form-fields>
        <sui-form-field>
          <sui-input
            placeholder="Limit"
            type="number"
            min="0"
            value=""
            size="mini"
            v-model="limit"
          />
        </sui-form-field>
      </sui-form-fields>
    </sui-form-field>
  </sui-form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import event from '@/services/eventService';
import store from '@/store/index';

@Component({
  name: 'FilterByNumber',
  components: {},
})
export default class FilterByNumber extends Vue {
  public value: string = '1';
  public limit = store.state.filters.limit;
  constructor() {
    super();
  }

  @Watch('limit')
  public onValueChanged(newVal: string, oldVal: string) {
    this.limit = newVal;
    event.getEarthquakeInformation(store.state.map, {limit: this.limit ? this.limit : ''});
    this.value = newVal;
  }
}
</script>

<style scoped></style>
