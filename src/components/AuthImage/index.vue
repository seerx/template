<template>
  <img ref="image" :src="imageUrl">
</template>

<script>
import { image } from '@/svc/image'

export default {
  name: 'AuthImage',
  props: {
    service: {
      type: String
    },
    param: {
      type: Object
    }
  },
  data() {
    return {
      imageUrl: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      image(this.service, this.param).then(blob => {
        this.imageUrl = URL.createObjectURL(blob)
      }).catch(err => {
        console.log(err)
      })
    })
    // console.log('service', this.service)
    // console.log('param', this.param)
  }
}
</script>

<style scoped>

</style>
