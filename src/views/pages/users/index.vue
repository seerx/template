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
      <el-table
        :data="users"
      >
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
          label="角色"
        >
          <template slot-scope="scope">
            <set-roles
              :scope="scope"
              :role-map="roleMap"
              :role-list="roles"
              @setRoles="setRoles"
            />
          </template>
        </el-table-column>
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
import SetRoles from './components/SetRoles'
import { listAccountsAndRoles } from '@/svc/account'

export default {
  name: 'Users',
  components: { Content100, AuthImage, ResetPassword, CreateAccount, SetStatus, SetRoles },
  data() {
    return {
      users: [],
      roles: [],
      roleMap: {}
    }
  },
  mounted() {
    listAccountsAndRoles().then(res => {
      if (res['error']) {
        this.$error(res['error'])
        return
      }
      const acts = res['account.List'][0]
      if (acts['error']) {
        this.$error(acts['error'])
        return
      }
      this.users = acts['data']

      const roles = res['role.List'][0]
      if (roles['error']) {
        this.$error(roles['error'])
        return
      }
      this.roles = roles['data']
      this.roleMap = {}
      this.roles.forEach((item, n) => {
        this.roleMap[item['id']] = item['name']
      })
    })
    // list().then(res => {
    //   if (res['error']) {
    //     this.$error(res['error'])
    //     return
    //   }
    //   this.users = res['data']
    // }).catch(err => {
    //   // console.log('err', err)
    //   this.$error(err)
    // })
  },
  methods: {
    handleCreated(info) {
      this.users.push(info)
      // this.users.splice(0, 0, info)
    },
    statusChanged(id, index, newStatus) {
      this.users.forEach(user => {
        if (user.id === id) {
          user.status = newStatus
          return
        }
      })
      // this.users[index].status = newStatus
    },
    setRoles(id, index, roles) {
      // this.users[index].roles = roles
      this.users.forEach(user => {
        if (user.id === id) {
          user.roles = roles
          return
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
