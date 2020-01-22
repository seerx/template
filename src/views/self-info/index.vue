<template>
  <div class="app-container">
    <div if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <info :user="user" />
        </el-col>
        <el-col :span="18" :xs="24">
          <avatar />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Info from './components/Info'
import Avatar from './components/Avatar'

export default {
  name: 'SelfInfo',
  components: { Info, Avatar },
  data() {
    return {
      user: {}
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
