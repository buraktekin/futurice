<template>
  <div class="'hq-sidepanel" v-if="isActive">
    <FeedHeader/>
    <Feed/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FeedHeader from '@/components/FeedHeader.vue';
import Feed from '@/components/Feed.vue';
import store from '@/store/index';

@Component({
  name: 'SidePanel',
  components: {
    FeedHeader,
    Feed,
  },
})
export default class SidePanel extends Vue {
  constructor() {
    super();
  }

  get isActive() {
    return store.state.isSidePanelOpen;
  }

  public togglePanel() {
    return store.dispatch('toggleSidePanel', !this.isActive);
  }

   // Methods
}
</script>

<style lang="scss"></style>