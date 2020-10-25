<template>
  <div class="home">
    <Navbar/>
    <Grid/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Grid from '@/components/Grid.vue';
import Navbar from '@/components/Navbar.vue';

@Component({
  name: 'Home',
  components: {
    Grid,
    Navbar,
  },
  props: {
    panel: {
      type: Function,
    },
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-flex !important;
}
</style>
