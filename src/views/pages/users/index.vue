<template>
  <content100>
    <el-card class="root-card-h">
      <div slot="header">
        <span>用户管理</span>
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
            <el-switch
              :value="scope.row.status"
              :active-value="1"
              :inactive-value="2"
              active-text="正常"
              inactive-text="禁用"
              @change="changeStatus($event, scope.row.id, scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="resetPassword(scope.row.id)"
            >重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </content100>
</template>

<script>
import Content100 from '@/components/Content100'
import AuthImage from '@/components/AuthImage'
import { list, setStatus } from '@/svc/account'

export default {
  name: 'Users',
  components: { Content100, AuthImage },
  data() {
    return {
      users: []
    }
  },
  mounted() {
    list().then(res => {
      this.users = res['data']
      // console.log(res)
    }).catch(err => {
      console.log('err', err)
    })
  },
  methods: {
    resetPassword(id) {
      console.log(id)
    },
    changeStatus(evt, id, index) {
      setStatus({
        id: id,
        status: evt
      }).then((res) => {
        if (!res['error']) {
          this.users[index].status = evt
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
