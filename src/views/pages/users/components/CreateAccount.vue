<template>
  <div>
    <el-button
      :size="'mini'"
      type="primary"
      @click="dlg=true"
    >添加账号</el-button>
    <el-dialog
      title="添加账号"
      :visible.sync="dlg"
      width="550px"
    >
      <el-form
        :model="form"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="账号">
          <el-input v-model="form.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlg=false">取 消</el-button>
        <el-button type="primary" @click="handleCreate">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createAccount } from '@/svc/account'

export default {
  name: 'CreateAccount',
  data() {
    return {
      dlg: false,
      form: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    handleCreate() {
      createAccount({
        id: this.form.id,
        name: this.form.name
      }).then(res => {
        if (res['error']) {
          this.$error(res['error'])
        } else {
          this.$emit('onAccountCreate', res['data'])
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
