<template>
  <div>
    <transition name="fade">
      <sui-message
        v-if="visible"
        header="Welcome back!"
        :content="msg"
        dismissable
        @notify="notify"
      />
    </transition>
    <p v-if="!visible">
      Message will come back in 4s
    </p>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      visible: false,
      msg: '',
    };
  },
  methods: {
    notify() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 4000);
    },
  },
};
</script>

<style media="screen" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>