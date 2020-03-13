<template>
  <el-card class="top-container">
    <title slot="header">
      人员
    </title>
    <div class="titleRow">
      <el-input
        v-model="searchName"
        placeholder="账号"
        clearable
        style="width: 200px;"
        class="filter-item"
      />
      <el-select
        v-model="chooseRule"
        placeholder="账号类型"
        style="width: 180px"
        class="filter-item"
      >
        <el-option v-for="item in rules" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">
        添加
      </el-button>
    </div>
    <div class="tableBody">
      <el-dialog
        title="账号信息"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form>
          <el-form-item label="姓名">
            <el-input v-model="name" style="width: 380px" />
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="userName" style="width: 380px" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" style="width: 380px" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="phone" style="width: 380px" />
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="school" style="width: 380px" />
          </el-form-item>
          <el-form-item label="头像地址">
            <el-input v-model="avatar" style="width: 380px" />
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="IDCard" style="width: 380px" />
          </el-form-item>
          <el-form-item label="账号类型">
            <el-select
              v-model="userType"
              placeholder="账号类型"
              style="width: 380px"
              class="filter-item"
            >
              <el-option v-for="item in rules" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="自我介绍">
            <el-input v-model="introduction" type="textarea" style="width: 380px" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateOrInsert">确 定</el-button>
        </span>
      </el-dialog>
      <el-table :data="userData" border highlight-current-row>
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="姓名" width="150" show-overflow-tooltip />
        <el-table-column prop="userType" label="账号类型" width="150" show-overflow-tooltip />
        <el-table-column prop="introduction" label="个人介绍" width="150" show-overflow-tooltip />
        <el-table-column prop="avatar" label="头像地址" width="150" show-overflow-tooltip />
        <el-table-column prop="iDCard" label="身份证号" width="150" show-overflow-tooltip />
        <el-table-column prop="phone" label="手机" width="150" show-overflow-tooltip />
        <el-table-column prop="school" label="学校" width="150" show-overflow-tooltip />
        <el-table-column prop="userName" label="账号" width="150" show-overflow-tooltip />
        <el-table-column prop="password" label="密码" width="150" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div />
  </el-card>
</template>

<script>
import { insertUser, updateUser, search, deleteUser } from '../../api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {
      userData: [],
      rules: [{ key: 'admin', display_name: '管理员' }, { key: 'editor', display_name: '招聘人' }, {
        key: 'user',
        display_name: '求职者'
      }],
      searchName: '',
      chooseRule: 'editor',
      dialogVisible: false,
      pk_user: '',
      name: '',
      userName: '',
      password: '',
      phone: '',
      userType: '',
      introduction: '',
      avatar: '',
      IDCard: '',
      school: '',
      role: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  mounted() {
    this.role = this.roles[0]
    if (this.role === 'editor') {
      this.chooseRule = 'user'
      this.rules = [{
        key: 'user',
        display_name: '用户'
      }]
    }
    const obj = {
      searchName: this.searchName,
      chooseRule: this.chooseRule
    }
    search(obj).then(response => {
      this.userData = response.data
    })
  },
  methods: {
    search() {
      const obj = {
        searchName: this.searchName,
        chooseRule: this.chooseRule
      }
      search(obj).then(response => {
        this.userData = response.data
      })
    },
    add() {
      this.pk_user = ''
      this.name = ''
      this.userName = ''
      this.password = ''
      this.phone = ''
      this.avatar = ''
      this.introduction = ''
      this.userType = 'editor'
      this.IDCard = ''
      this.school = ''
      this.dialogVisible = true
    },
    edit(row) {
      this.pk_user = row.pk_user
      this.name = row.name
      this.userName = row.userName
      this.password = row.password
      this.phone = row.phone
      this.avatar = row.avatar
      this.introduction = row.introduction
      this.userType = row.userType
      this.IDCard = row.IDCard
      this.school = row.school
      this.dialogVisible = true
    },
    deleteUser(row) {
      deleteUser(row).then(response => {
        this.$notify({
          type: 'success',
          message: '删除成功!'
        })
        this.search()
      })
    },
    updateOrInsert() {
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
      if (this.pk_user === '') {
        insertUser(obj).then(response => {
          const user = response.user
          if (user.avatar === '') {
            user.avatar = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
          }
          this.userData.push(user)
          this.dialogVisible = false
        })
      } else {
        updateUser(obj).then(response => {
          this.dialogVisible = false
        })
      }
    }
  }
}
</script>

<style scoped>
  .el-card__header {
    background: #0a76a4;
  }

  .titleRow {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .tableBody {
    width: 100%;
  }

  .top-container {
    margin: 30px;
    width: 85vw;
    height: 85vh;
  }
</style>
