<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>我的信息</span>
    </div>
    <div class="user-profile">
      <div class="box-center">
        <el-avatar
          :size="120"
        >
          <auth-image
            ref="avatar"
            :image-arg="avatarArg"
          />
        </el-avatar>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>
    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>管理</span></div>
        <div class="user-bio-section-body">
          <el-menu class="el-menu-vertical-demo">
            <el-menu-item index="nickname" @click="$emit('onPage', 'info')">修改信息</el-menu-item>
            <el-menu-item index="nickname" @click="$emit('onPage', 'avatar')">上传头像</el-menu-item>
            <el-menu-item index="nickname" @click="$emit('onPage', 'password')">修改密码</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import AuthImage from '@/components/AuthImage'

export default {
  name: 'Info',
  components: { AuthImage },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: ''
        }
      }
    }
  },
  data() {
    // console.log('this.$router.getters.avatar', this.$router.getters.avatar)
    return {
      avatarArg: {
        service: 'account.Avatar',
        arg: {
          avatar: this.$store.getters.avatar
        }
      }
    }
  },
  watch: {
    '$store.state.user.avatar': function() {
      this.avatarArg.arg = {
        avatar: this.$store.getters.avatar
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .el-menu {
      border-right: none;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
