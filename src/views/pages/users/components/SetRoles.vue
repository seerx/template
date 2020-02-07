<template>
  <div>
    <span>{{ roles }}</span>
    <el-button size="mini" title="设置角色" style="float: right;" @click="dlg=true">设置</el-button>

    <el-dialog
      :title="'设置' + scope.row.name + '角色'"
      :visible.sync="dlg"
      width="550px"
      @open="showRoles"
    >
      <!--      <el-checkbox-group v-model="checks">-->
      <el-checkbox
        v-for="(role) in roleList"
        :key="role['id']"
        :label="role['name']+'[' + role['id'] + ']'"
        :value="roleSet[role['id']]"
        @change="onChange($event, role['id'])"
      />
      <!--      </el-checkbox-group>-->
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!saving" @click="dlg=false">取 消</el-button>
        <el-button type="primary" :loading="saving" @click="handleSetRole">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { setRoles } from '@/svc/account'

export default {
  name: 'SetRoles',
  props: {
    scope: {
      type: Object,
      default: () => {
        return {}
      }
    },
    roleMap: {
      type: Object,
      default: () => {
        return {}
      }
    },
    roleList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      roles: '',
      roleSet: {},
      dlg: false,
      saving: false
    }
  },
  // watch: {
  //   'this.scope.row.roles': () => {
  //     this.showRoles()
  //   }
  // },
  created() {
    this.roleList.forEach((item) => {
      this.roleSet[item['id']] = false
    })
    this.showRoles()
  },
  methods: {
    handleSetRole() {
      const roles = []
      for (const role in this.roleSet) {
        if (role !== '') {
          if (this.roleSet[role]) {
            roles.push(role)
          }
        }
      }
      this.saving = true
      setRoles(this.scope.row.id, roles).then(res => {
        this.saving = false
        if (res['error']) {
          this.$error(res['error'])
          return
        }
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        // console.log('res', res)
        const setRoles = res['data']['roles']
        // console.log('setRoles', setRoles)
        this.$emit('setRoles', this.scope.row.id, this.scope.$index, setRoles)
        this.showRoles()
        this.dlg = false
      }).catch(() => {
        this.saving = false
      })
    },
    onChange(evt, id) {
      // this.roleSet[id] = evt
      const set = {}
      for (var k in this.roleSet) {
        if (k === id) {
          set[k] = evt
        } else {
          set[k] = this.roleSet[k]
        }
      }
      this.roleSet = set
    },
    showRoles() {
      this.roles = ''
      if (this.scope.row.roles) {
        const set = {}
        for (var k in this.roleSet) {
          set[k] = false
        }
        for (let n = 0; n < this.scope.row.roles.length; n++) {
          let r = this.scope.row.roles[n]
          set[r] = true
          const rname = this.roleMap[r]
          if (rname) {
            r = rname + '[' + r + ']'
          }
          if (n === 0) {
            this.roles = r
          } else {
            this.roles += ',' + r
          }
        }
        this.roleSet = set
      }
    }
  }
}
</script>

<style scoped>

</style>
