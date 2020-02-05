<template>
  <div class="app-container frame" :style="{ height: frameHeight + 'px' }">
    <iframe class="window" :src="api" />
  </div>
</template>

<script>
// import Driver from 'driver.js' // import driver.js
// import 'driver.js/dist/driver.min.css' // import driver.js css

export default {
  name: 'Api',
  data() {
    return {
      api: '',
      frameHeight: 100
    }
  },
  mounted() {
    // this.driver = new Driver()
    this.$nextTick(() => {
      // this.$refs.frame
      this.api = '/api?tokenfield=' + this.$store.getters.key + '&tokenvalue=' + this.$store.getters.token
    })

    this.frameHeight = document.documentElement.clientHeight - 88
    window.onresize = function() {
      this.frameHeight = document.documentElement.clientHeight - 88
      // console.log(this.frameHeight)
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
