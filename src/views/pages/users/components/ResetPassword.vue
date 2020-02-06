<template>
  <el-button
    size="mini"
    type="danger"
    @click="handleResetPassword"
  >重置密码</el-button>
</template>

<script>
import { resetPassword } from '@/svc/account'

export default {
  name: 'ResetPassword',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    handleResetPassword() {
      this.$confirm('确定要重置[' + this.info.id + ']的密码吗？', '确认', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        resetPassword({ id: this.info.id }).then(res => {
          if (res['error']) {
            this.$message({
              type: 'error',
              message: res['error']
            })
          } else {
            this.$message({
              type: 'success',
              message: '重置成功'
            })
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
