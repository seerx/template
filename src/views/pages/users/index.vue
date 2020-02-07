<template>
  <content100>
    <el-card class="root-card-h">
      <div slot="header">
        <span>用户管理</span>
        <create-account
          style="float: right; margin-top: -4px;"
          @onAccountCreate="handleCreated"
        />
      </div>
      <el-table :data="users">
        <el-table-column
          fixed
          label="账号"
          width="180"
        >
          <template slot-scope="scope">
            <el-avatar :size="18">
              <auth-image
                :image-arg="{'service':'account.Avatar','arg':{'avatar':scope.row.avatar}}"
              />
            </el-avatar>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180"
        />
        <el-table-column
          prop="roles"
          label="角色"
        />
        <el-table-column
          label="状态"
          width="180"
        >
          <template slot-scope="scope">
            <set-status
              :scope="scope"
              @statusChanged="statusChanged"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <reset-password :info="scope.row" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </content100>
</template>

<script>
import Content100 from '@/components/Content100'
import AuthImage from '@/components/AuthImage'
import ResetPassword from './components/ResetPassword'
import CreateAccount from './components/CreateAccount'
import SetStatus from './components/SetStatus'
import { list } from '@/svc/account'

export default {
  name: 'Users',
  components: { Content100, AuthImage, ResetPassword, CreateAccount, SetStatus },
  data() {
    return {
      users: []
    }
  },
  mounted() {
    list().then(res => {
      if (res['error']) {
        this.$error(res['error'])
        return
      }
      this.users = res['data']
    }).catch(err => {
      // console.log('err', err)
      this.$error(err)
    })
  },
  methods: {
    handleCreated(info) {
      this.users.splice(0, 0, info)
    },
    statusChanged(id, index, newStatus) {
      this.users[index].status = newStatus
    }
  }
}
</script>

<style lang="less">
</style>
