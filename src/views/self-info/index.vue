<template>
  <div class="app-container">
    <div if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <info ref="info" :user="user" @onPage="setPage" />
        </el-col>
        <el-col :span="18" :xs="24">
          <avatar
            v-if="page==='avatar'"
            @onAvatarUpdate="updateAvatar"
          />
          <modify-info
            v-if="page==='info'"
          />
          <modify-password
            v-if="page==='password'"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Info from './components/Info'
import Avatar from './components/Avatar'
import ModifyInfo from './components/ModifyInfo'
import ModifyPassword from './components/ModifyPassword'

export default {
  name: 'SelfInfo',
  components: { Info, Avatar, ModifyInfo, ModifyPassword },
  data() {
    return {
      user: {},
      page: 'info'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    updateAvatar() {
      this.$refs.info.updateAvatar()
    },
    setPage(page) {
      this.page = page
    },
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  }
}
</script>

<style scoped>

</style>
