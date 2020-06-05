<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :destroy-on-close="true" width="30%" @close="close()">
        <el-form ref="updateForm" v-loading.lock="loading" :model="form" :rules="rules" style="padding: 0px 40px">
          <el-form-item label="旧密码" label-width="80px" prop="oldPwd">
            <el-input v-model="form.oldPwd" minlength="6" maxlength="16" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" label-width="80px" prop="newPwd">
            <el-input v-model="form.newPwd" minlength="6" maxlength="16" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" label-width="80px" prop="surePwd">
            <el-input v-model="form.surePwd" minlength="6" maxlength="16" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updatePwd">确定</el-button>
        </div>
      </el-dialog>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <a @click="dialogFormVisible = true">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'
import { updateUserPassword } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Search
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === null || value.length < 6) {
        callback(new Error('密码不能少于六位'))
      } else if (value.length > 16) {
        callback(new Error('密码不能大于十六位'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        oldPwd: '',
        newPwd: '',
        surePwd: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '密码不能少于六位或大于十六位', trigger: 'blur' },
          { validator: validatePassword }
        ],
        newPwd: [
          { required: true, message: '密码不能少于六位或大于十六位', trigger: 'blur' },
          { validator: validatePassword }
        ],
        surePwd: [
          { required: true, message: '密码不能少于六位或大于十六位', trigger: 'blur' },
          { validator: validatePassword }
        ]
      },
      username: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    close() {
      this.form = {
        oldPwd: '',
        newPwd: '',
        surePwd: ''
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    updatePwd() {
      if (this.form.newPwd === this.form.surePwd && this.form.newPwd !== '' && this.form.newPwd.length >= 6 && this.form.newPwd.length <= 16) {
        updateUserPassword(this.form).then(response => {
          this.$notify({
            type: 'success',
            message: '修改成功!'
          })
          this.dialogFormVisible = false
        })
      } else {
        this.$notify({
          type: 'warning',
          message: '确认密码错误!'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
