<template>
  <div id='app'>
    <Home/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from '@/views/Home.vue';

@Component({
  name: 'App',
  components: {
    Home,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  width: 100vw;
  height: 100vh;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  height: var(--height);
  left: 0;
  top: 0;
  z-index: 1;
  background-color: rgb(0,0,0);

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
