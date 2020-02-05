<template>

  <el-card>
    <div slot="header"><span>修改信息</span></div>
    <el-form ref="form" label-position="right" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { modifyInfo } from '@/svc/account'

export default {
  name: 'ModifyInfo',
  data() {
    return {
      form: {
        nickName: ''
      },
      rules: {
        nickName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.nickName = this.$store.getters.name
    })
  },
  methods: {
    saveInfo() {
      this.$refs.form.validate(valid => {
        if (valid) {
          modifyInfo({
            'name': this.form.nickName
          }).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$store.commit('user/SET_NAME', this.form.nickName)
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
