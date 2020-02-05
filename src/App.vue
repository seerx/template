<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions([
      'settings/changeWidth',
      'settings/changeHeight'
    ])
  },
  mounted() {
    // 监听窗口尺寸变化
    const thiz = this
    window.onresize = function() {
      thiz['settings/changeWidth'](document.documentElement.clientWidth)
      thiz['settings/changeHeight'](document.documentElement.clientHeight)
      // thiz.$store.dispatch('settings/changeWidth', document.documentElement.clientWidth)
      // thiz.$store.dispatch('settings/changeHeight', document.documentElement.clientHeight)
    }
  }
}
</script>
