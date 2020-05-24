<template>
  <div class="login-container">
    <el-dialog
      title="注册账号"
      :visible.sync="dialogVisible"
      :center="true"
      class="el-dialog-login"
      @close="$refs.formData.clearValidate()"
    >
      <el-form ref="formData" :model="formData" :rules="rules" :label-position="right">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" style="margin-left:50px;width: 580px" />
        </el-form-item>
        <el-form-item label="账号" prop="userName">
          <el-input v-model="formData.userName" style="margin-left:50px;width: 580px" />
        </el-form-item>
        <el-form-item label="密码" prop="password1">
          <el-input v-model="formData.password1" type="password" style="margin-left:50px;width: 580px" />
        </el-form-item>
        <el-form-item label="重复密码" prop="password2">
          <el-input v-model="formData.password2" type="password" style="margin-left:50px;width: 580px" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" style="margin-left:50px;width: 580px" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false;formData = {userType: 'user',
                                                    name: null,
                                                    userName: null,
                                                    password1: null,
                                                    password2: null,
                                                    phone: null}"
        >取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
      </span>
    </el-dialog>

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">招聘系统</h3>
      </div>
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
import { checkName, insertUser } from '../../api/user'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === null || value.length < 6) {
        callback(new Error('密码不能少于六位'))
      } else {
        callback()
      }
    }
    const validateSpace = (rule, value, callback) => {
      if (value === null || value.trim() + '' === '') {
        callback(new Error('内容不能全为空格'))
      } else {
        callback()
      }
    }
    return {
      right: 'top',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateSpace }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      dialogVisible: false,
      formData: {
        userType: 'user',
        name: null,
        userName: null,
        password1: null,
        password2: null,
        phone: null
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur', validator: validateSpace },
          { validator: validateSpace }
        ],
        password1: [
          { required: true, message: '密码不能少于六位', trigger: 'blur' },
          { validator: validatePassword }
        ],
        password2: [
          { required: true, message: '密码不能少于六位', trigger: 'blur' },
          { validator: validatePassword }
        ],
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur', validator: validateSpace },
          { validator: validateSpace }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
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
      checkName({ name: this.formData.userName }).then(response => {
        if (!response.data) {
          this.$message({
            message: '该用户名已存在',
            type: 'danger'
          })
        } else {
          let can = true
          for (const item in this.formData) {
            if (this.formData[item] === null || this.formData[item] === '') {
              this.$message({
                message: '不能有信息为空',
                type: 'danger'
              })
              can = false
              break
            }
          }
          if (can) {
            if (this.formData.password1.length < 6) {
              this.$message({
                message: '密码长度不能小于6位',
                type: 'danger'
              })
            } else {
              if (this.formData.password1 === this.formData.password2) {
                insertUser(this.formData).then(response => {
                  this.$message({
                    message: '注册成功',
                    type: 'danger'
                  })
                  this.dialogVisible = false
                  this.formData = {
                    userType: 'user',
                    name: null,
                    userName: null,
                    password1: null,
                    password2: null,
                    phone: null
                  }
                })
              } else {
                this.$message({
                  message: '两次密码不一致',
                  type: 'danger'
                })
              }
            }
          }
        }
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
              this.$message({
                message: '登陆失败，账号不存在或账号密码不一致',
                type: 'danger'
              })
              this.loading = false
            })
        } else {
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
.el-dialog-login .el-dialog{
  background-color: rgb(61, 60, 60);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.el-dialog__title{
  color: #2ac06d;
}
$bg: rgba(119, 84, 127, 0.08);
$light_gray:#fff;
$cursor: #787878;

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
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-fo-it {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: rgba(69, 69, 69, 0.77);
  }
}
</style>

<style lang="scss" scoped>
$bg: rgba(48, 75, 50, 0.03);
$dark_gray: rgba(102, 12, 7, 0.97);
$light_gray: #eeeeee;

.login-container {
  background-image: url("../../assets/loginbg/ma1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    background-color: rgba(90, 142, 62, 0.49);
    position: relative;
    right: 0;
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
      margin: 0 auto 40px auto;
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
