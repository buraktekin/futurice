<template>
  <sui-grid-column class="hq-sidemenu">
    <div class="hq-sidemenu__wrapper">
      <MenuItem :items="head" :brand="true" :pos="'list-start'" />
      <MenuItem :items="body" :pos="'list-center'"/>
      <MenuItem :items="footer" :pos="'list-end'"/>
    </div>
  </sui-grid-column>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuItem from '@/components/MenuItem.vue';

@Component({
  name: 'Navbar',
  components: {
    MenuItem,
  },
})
export default class Navbar extends Vue {
  public head = [
    {name: 'Heardquake', icon: '', route: '/'},
  ];
  public body = [
    {name: 'Home', icon: 'home', route: '/'},
    // {name: 'About', icon: 'question', route: '/about'},
  ];
  public footer = [
    // {name: 'Preferences', icon: 'cog', route: ''},
  ];
}
</script>

<style lang="scss"></style>