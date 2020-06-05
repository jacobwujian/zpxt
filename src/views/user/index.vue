<template>
  <el-card class="top-container">
    <div slot="header">
      账户管理
    </div>
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
        <el-option v-for="item in options" :key="item.key" :label="item.display_name" :value="item.key" />
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
        :destroy-on-close="true"
        width="30%"
        @close="close()"
      >
        <el-form ref="formData" :model="formData" :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formData.name" style="width: 380px" />
          </el-form-item>
          <el-form-item label="账号" prop="userName">
            <el-input v-model="formData.userName" style="width: 380px" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" style="width: 380px" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formData.phone" style="width: 380px" />
          </el-form-item>
          <el-form-item label="头像地址">
            <el-input v-model="formData.avatar" style="width: 380px" />
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="formData.IDCard" style="width: 380px" />
          </el-form-item>
          <el-form-item label="账号类型">
            <el-select
              v-model="formData.userType"
              placeholder="账号类型"
              style="width: 380px"
              class="filter-item"
            >
              <el-option v-for="item in options" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateOrInsert">确 定</el-button>
        </span>
      </el-dialog>
      <el-table :data="userData.slice((currentPage-1)*currentPageSize, currentPageSize*currentPage)" border highlight-current-row height="600">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="姓名" width="150" show-overflow-tooltip />
        <el-table-column prop="userType" label="账号类型" width="150" show-overflow-tooltip />
        <el-table-column prop="avatar" label="头像地址" width="380" show-overflow-tooltip />
        <el-table-column prop="iDCard" label="身份证号" width="150" show-overflow-tooltip />
        <el-table-column prop="phone" label="手机" width="150" show-overflow-tooltip />
        <el-table-column prop="userName" label="账号" width="150" show-overflow-tooltip />
        <el-table-column prop="password" label="密码" width="150" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float: right"
        node-key="id"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div />
  </el-card>
</template>

<script>
import { insertUser, updateUser, search, deleteUser, checkName } from '../../api/user'

export default {
  name: 'Index',
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
    const validateSpace = (rule, value, callback) => {
      if (value === null || value.trim() + '' === '') {
        callback(new Error('内容不能全为空格'))
      } else {
        callback()
      }
    }
    return {
      currentPage: 1,
      currentPageSize: 10,
      userData: [],
      options: [{ key: 'admin', display_name: '管理员' }, { key: 'editor', display_name: '招聘人' }, {
        key: 'user',
        display_name: '求职者'
      }],
      searchName: '',
      chooseRule: 'editor',
      dialogVisible: false,
      pk_user: '',
      formData: {
        pk_user: '',
        password: '',
        userType: 'editor',
        name: '',
        userName: null,
        avatar: null,
        iDCard: null,
        phone: null
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur', validator: validateSpace },
          { validator: validateSpace }
        ],
        password: [
          { required: true, message: '密码不能少于六位或大于16位', trigger: 'blur' },
          { validator: validatePassword }
        ],
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur', validator: validateSpace },
          { validator: validateSpace }
        ]
      }
    }
  },
  mounted() {
    const obj = {
      searchName: this.searchName,
      chooseRule: this.chooseRule
    }
    search(obj).then(response => {
      this.userData = response.data
    })
  },
  methods: {
    handleSizeChange(size) {
      this.currentPageSize = size
    },
    handleCurrentChange(page) {
      this.currentPage = page
    },
    search() {
      this.currentPage = 1
      const obj = {
        searchName: this.searchName,
        chooseRule: this.chooseRule
      }
      search(obj).then(response => {
        this.userData = response.data
      })
    },
    close() {
      this.formData = {
        pk_user: '',
        password: '',
        userType: 'editor',
        name: '',
        userName: null,
        avatar: null,
        iDCard: null,
        phone: null
      }
    },
    add() {
      this.dialogVisible = true
    },
    edit(row) {
      this.formData = row
      this.dialogVisible = true
    },
    deleteUser(row, index) {
      this.$confirm('你確定要刪除账号' + row.userName + '嗎?', '刪除', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row).then(response => {
          this.userData.splice((this.currentPage - 1) * this.currentPageSize + index, 1)
          if (this.userData.slice((this.currentPage - 1) * this.currentPageSize, this.currentPageSize * this.currentPage).length === 0) {
            if (this.currentPage > 1) {
              this.currentPage -= 1
            }
          }
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    updateOrInsert() {
      if (this.formData.password === '' || this.formData.userName === '' || this.formData.password === null || this.formData.userName === null || this.formData.password.length < 6 || this.formData.password.length>16) {
        this.$notify({
          type: 'success',
          message: '账号密码不能为空成功!密码长度大于六'
        })
      } else {
        if (this.formData.pk_user === '') {
          checkName({ name: this.formData.userName }).then(response => {
            if (!response.data) {
              this.$message({
                message: '该用户名已存在',
                type: 'danger'
              })
            } else {
              insertUser(this.formData).then(response => {
                const user = response.user
                if (user.avatar === '') {
                  user.avatar = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
                }
                this.userData.push(user)
                this.dialogVisible = false
              })
            }
          })
        } else {
          updateUser(this.formData).then(response => {
            this.dialogVisible = false
            this.search()
          })
        }
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
