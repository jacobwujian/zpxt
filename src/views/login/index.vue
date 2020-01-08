<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">招聘系统</h3>
      </div>
      <el-dialog
        title="注册账号"
        :visible.sync="dialogVisible"
        fullscreen
        :center="true"
        class="el-dialog-longin"
      >
        <el-form :rules="rules">
          <el-form-item class="elbody" label="姓名">
            <el-input v-model="name" style="width: 380px" @change="Check" />
          </el-form-item>
          <el-form-item class="elbody" label="账号">
            <el-input v-model="userName" style="width: 380px" />
          </el-form-item>
          <el-form-item class="elbody" label="密码">
            <el-input v-model="password" style="width: 380px" />
          </el-form-item>
          <el-form-item class="elbody" label="手机号">
            <el-input v-model="phone" style="width: 380px" />
          </el-form-item>
          <el-form-item class="elbody" label="学校">
            <el-input v-model="school" style="width: 380px" />
          </el-form-item>
          <el-form-item class="elbody" label="头像地址">
            <el-input v-model="avatar" style="width: 380px" />
          </el-form-item>
          <el-form-item class="elbody" label="身份证号">
            <el-input v-model="IDCard" style="width: 380px" />
          </el-form-item>
          <el-form-item class="elbody" label="个人标签">
            <el-input v-model="introduction" type="textarea" style="width: 380px" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="insert">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item class="el-fo-it" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          class="el-in"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item class="el-fo-it" prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            class="el-in"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:48%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>
      <el-button :loading="loading" type="primary" style="width:48%;margin-bottom:30px;" @click.native.prevent="register">注册</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { checkName, insertUser } from '../../api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validateSpace = (rule, value, callback) => {
      if (value.trim() + '' === '') {
        callback(new Error('内容不能全为空格'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      dialogVisible: false,
      name: '',
      userName: '',
      password: '',
      phone: '',
      userType: 'user',
      introduction: '',
      avatar: '',
      IDCard: '',
      school: '',
      rules: {
        name: [
          { required: true, message: '姓名', trigger: 'blur' },
          { validator: validateUsername }
        ],
        password: [
          { required: true, message: '密码', trigger: 'blur' },
          { validator: validatePassword }
        ],
        userName: [
          { required: true, message: '账号', trigger: 'blur' },
          { validator: validateUsername }
        ],
        IDCard: [
          { required: true, message: '身份证', trigger: 'blur' },
          { validator: validateSpace }
        ]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          // this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    register() {
      this.dialogVisible = true
    },
    insert() {
      const obj = {
        pk_user: this.pk_user,
        name: this.name,
        userName: this.userName,
        password: this.password,
        phone: this.phone,
        avatar: this.avatar,
        introduction: this.introduction,
        userType: this.userType,
        IDCard: this.IDCard,
        school: this.school
      }
      insertUser(obj).then(response => {
        console.log(response)
        this.$message({
          message: '注册成功',
          type: 'danger'
        })
        this.dialogVisible = false
      })
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    Check() {
      checkName({ name: this.name }).then(
        response => {
          console.log(response.data)
        }
      )
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.elbody{
  margin-left:40%;
}
.el-dialog-longin .el-dialog{
  background-image: url("../../assets/loginbg/bgre.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
$bg: rgba(119, 84, 127, 0.44);
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-in input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-in {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-fo-it {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  background-image: url("../../assets/loginbg/ma.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    background-color: rgba(0, 0, 255, 0.11);
    position: relative;
    right: 500px;
    top: 100px;
    width: 420px;
    max-width: 100%;
    padding: 20px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
