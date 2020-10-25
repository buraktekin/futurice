<template>
  <div>
    <sui-form>
      <sui-form-fields inline>
        <sui-form-field>
          <sui-checkbox label="Current Events" radio value="1" v-model="value"/>
        </sui-form-field>
        <sui-form-field>
          <sui-checkbox label="> 3.0" radio value="3" v-model="value"/>
        </sui-form-field>
        <sui-form-field>
          <sui-checkbox label="> 5.0" radio value="5" v-model="value"/>
        </sui-form-field>
        <sui-form-field>
          <sui-checkbox label="> 7.0" radio value="7" v-model="value" />
        </sui-form-field>
      </sui-form-fields>
    </sui-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import event from '@/services/eventService';
import store from '@/store/index';

@Component({
  name: 'FilterByMagnitude',
  components: {},
})
export default class FilterByMagnitude extends Vue {
  public value: string = '1';

  constructor() {
    super();
  }

  @Watch('value')
  public onValueChanged(newVal: string, oldVal: string) {
    const limit = store.state.magLimit = parseInt(newVal, 10);
    event.getEarthquakeInformation(store.state.map, {minmagnitude: limit});
    console.log(store.state.filters);
    this.value = newVal;
  }
}
</script>

<style scoped></style>
