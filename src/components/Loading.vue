<template lang="html">
  <sui-segment class="loading">
    <sui-dimmer active>
      <sui-loader size="large">Loading</sui-loader>
    </sui-dimmer>
  </sui-segment>
</template>

<script>
export default {
  name: 'Loading',
};
</script>
<style scoped>
.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: -14px;
  left: 0;
  z-index: 100;
  background: transparent !important;
  box-shadow: none;
  border: none;
}
.ui.loading.segment:before {
  background: rgba(0, 0, 0, .5);
  box-shadow: none;
}
</style>