<template>

  <el-card>
    <div slot="header"><span>修改密码</span></div>
    <el-form ref="form" :rules="rules" :model="form" label-position="right" label-width="100px">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input v-model="form.oldPwd" type="password" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="确认旧密码" prop="oldPwdAgain">
        <el-input v-model="form.oldPwdAgain" type="password" placeholder="再次输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePassword">修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { modifyPassword } from '@/svc/account'

export default {
  name: 'ModifyPassword',
  data() {
    const validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.oldPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        newPwd: '',
        oldPwd: '',
        oldPwdAgain: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        oldPwdAgain: [
          { required: true, message: '请再次输入旧密码', trigger: 'blur' },
          { validator: validatePassAgain, trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updatePassword() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          modifyPassword({
            'newPwd': this.form.newPwd,
            'oldPwd': this.form.oldPwd
          }).then(() => {
            this.$refs['form'].resetFields()
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
