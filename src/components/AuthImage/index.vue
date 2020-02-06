<template>
  <img
    ref="image"
    :src="imageUrl"
  >
</template>

<script>
import { image } from '@/svc/image'

export default {
  name: 'AuthImage',
  props: {
    imageArg: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      imageUrl: null,
      service_changed: false,
      param_changed: false
    }
  },
  watch: {
    imageArg: {
      handler: 'load',
      immediate: true
    },
    'imageArg.arg': {
      handler: 'load',
      immediate: true
    }
  },
  methods: {
    load() {
      const { service, arg } = this.imageArg
      // console.log('load image', this.imageArg)
      image(service, arg).then(blob => {
        // console.log('blob', blob)
        this.imageUrl = URL.createObjectURL(blob)
      }).catch(err => {
        console.log('load image error', err)
      })
    }
  }
}
</script>

<style scoped>

</style>
