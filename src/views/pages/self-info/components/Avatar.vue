<template>

  <el-card>
    <div slot="header"><span>上传头像</span></div>
    <el-upload
      class="avatar-uploader"
      action="demo"
      :show-file-list="false"
      :on-preview="handlePreview"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="doUpload"
      :auto-upload="true"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </el-card>

</template>

<script>
import { uploadAvatar } from '@/svc/account'

export default {
  name: 'Avatar',
  data() {
    return {
      imageUrl: null
    }
  },
  methods: {
    doUpload(upload) {
      const fileObject = upload.file
      uploadAvatar(fileObject).then(res => {
        if (res['error']) {
          this.$error(res['error'])
          return
        }
        const avatar = res['data']['account.UploadAvatar'][0]['data']
        this.$store.commit('user/SET_AVATAR', avatar)
        this.imageUrl = URL.createObjectURL(fileObject)
        this.$message({
          type: 'success',
          message: '头像上传成功'
        })
        // this.$emit('onAvatarUpdate', this.imageUrl)
      }).catch(err => {
        console.log(err)
      })
    },
    handleAvatarSuccess(res, file) {
      // console.log('handleAvatarSuccess')
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    handlePreview(file) {
      // console.log('preview')
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      console.log('before')
      const isImage = file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      const yes = isImage && isLt2M
      if (yes) {
        // 上传文件 file
        // this.imageUrl = URL.createObjectURL(file.raw)
      }
      return yes
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
