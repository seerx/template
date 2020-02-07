<template>
  <el-switch
    :value="scope.row.status"
    :active-value="1"
    :inactive-value="2"
    active-text="正常"
    inactive-text="禁用"
    @change="changeStatus($event, scope.row.id, scope.$index)"
  />
</template>

<script>
import { setStatus } from '@/svc/account'

export default {
  name: 'SetStatus',
  props: {
    scope: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    changeStatus(evt, id, index) {
      setStatus({
        id: id,
        status: evt
      }).then((res) => {
        if (!res['error']) {
          // this.users[index].status = evt
          this.$emit('statusChanged', id, index, evt)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$error(res['error'])
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
