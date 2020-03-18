<template>
  <el-card class="top-container">
    <div slot="header">
      <span>公司信息</span>
    </div>
    <div class="titleRow">
      <el-button v-if="isEdit" class="filter-item" type="primary" icon="el-icon-edit" @click="Edit">
        编辑
      </el-button>
      <el-button v-if="!isEdit" class="filter-item" type="primary" @click="Sure">
        确定
      </el-button>
      <el-button v-if="!isEdit" class="filter-item" type="primary" icon="el-icon-back" @click="Cancel">
        取消
      </el-button>
    </div>
    <div class="tableBody">
      <el-card class="box-card">
        <el-form :model="company">
          <el-form-item label="公司名称">
            <el-input v-model="company.name" :disabled="isEdit" />
          </el-form-item>
          <el-form-item label="公司所在地">
            <el-input v-model="company.address" :disabled="isEdit" />
          </el-form-item>
          <el-form-item label="公司介绍">
            <el-input v-model="company.introduction" :disabled="isEdit" type="textarea" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div />
  </el-card>
</template>

<script>
import { getCompany, updateCompany } from '../../api/company'

export default {
  name: 'Index',
  data() {
    return {
      company: {
        name: '',
        address: '',
        introduction: ''
      },
      isEdit: true
    }
  },

  mounted() {
    this.getCompany()
  },
  methods: {
    getCompany() {
      getCompany({}).then(response => {
        this.company = response.company
      })
    },
    Edit() {
      this.isEdit = false
    },
    Cancel() {
      this.getCompany()
      this.isEdit = true
    },
    Sure() {
      this.isEdit = true
      updateCompany(this.company).then(response => {
        if (!response === undefined) { this.getCompany() }
      }
      )
    }
  }
}
</script>

<style scoped>
  .box-card {
    margin-left: 300px;
    width: 680px;
  }
  .el-card__header {
    background: #0a76a4;
  }
  .el-dialog-footer{
    float: right;
  }
  .el-dialog-picker{
    width: 60%;
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
