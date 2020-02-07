<template>
  <iframe :style="frame" :src="api" />
</template>

<script>

export default {
  name: 'Api',
  data() {
    return {
      api: '',
      frameHeight: 100,
      frame: {
        height: '100px',
        padding: '0',
        width: '100%'
      }
    }
  },
  watch: {
    '$store.state.settings.viewHeight': function() {
      this.calcHeight()
    }
  },
  mounted() {
    this.calcHeight()
    this.$nextTick(() => {
      this.api = '/api?tokenfield=' + this.$store.getters.key + '&tokenvalue=' + this.$store.getters.token
    })
  },
  methods: {
    calcHeight() {
      this.frame.height = this.$store.getters.contentHeight + 'px'
    }
  }
}
</script>

<style scoped lang="less" >
  body {
    height: 100%;
  }

  .frame {
    height: 100%;
    padding: 0;
    .window {
      width: 100%;
      height: 100%;
      min-height: 800px;
    }
  }
  .app-main {
    height: 100%;
  }
</style>
