<template>
  <el-card class="top-container">
    <title slot="header">
      人员
    </title>
    <div class="titleRow">
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="edit">
        编辑
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="save">
        保存
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="cannel">
        取消
      </el-button>
    </div>
    <div class="tableBody">
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
            clearable
            style="width: 380px"
            class="filter-item"
          >
            <el-option v-for="item in rlues" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="自我介绍">
          <el-input v-model="introduction" type="textarea" style="width: 380px" />
        </el-form-item>
      </el-form>
    </div>
    <div />
  </el-card>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      userData: [],
      rlues: [{ key: 'admin', display_name: '管理员' }, { key: 'editor', display_name: '编辑员' }, {
        key: 'user',
        display_name: '用户'
      }],
      searchname: '',
      chooseRlue: 'editor',
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
  methods: {
    edit() {},
    save() {},
    cannel() {}
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
