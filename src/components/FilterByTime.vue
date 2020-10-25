<template>
  <div class="date-input">
    <FunctionalCalendar
      v-model="calendarData"
      :configs="calendarConfigs"
    ></FunctionalCalendar>
    <sui-button 
      class="hq-btn" 
      data-target="expand" 
      icon="upload" 
      size='tiny'
      circular
      secondary
      @click='getCal'
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { FunctionalCalendar } from 'vue-functional-calendar';
import event from '@/services/eventService';
import store from '@/store/index';

@Component({
  name: 'FilterByMagnitude',
  components: {
    FunctionalCalendar,
  },
})
export default class FilterByMagnitude extends Vue {
  public calendarData: any = {
    selectedDates : [],
  };
  public calendarConfigs = {
      dateFormat: 'yyyy-mm-dd',
      isDatePicker: true,
      isDateRange: true,
      isModal: true,
      isDark: true,
      isTypeable: true,
  };

  constructor() {
    super();
  }

  public getCal() {
    this.calendarData.selectedDates = [this.calendarData.dateRange];
    const filters = {
      starttime: this.calendarData.dateRange.start,
      endtime: this.calendarData.dateRange.end,
    };
    store.state.filters.starttime = filters.starttime;
    store.state.filters.endtime = filters.endtime;
    event.getEarthquakeInformation(store.state.map, filters);
  }
}
</script>

<style scoped>
.date-input {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
