<template>
  <el-card class="top-container">
    <ActView :act-data="actData" :dialog-visible="dialogVisible" :disabled="true" @close="close()" />
    <div class="titleRow">
      <el-input
        v-model="searchName"
        placeholder="活动名"
        clearable
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        v-model="address"
        placeholder="工作地"
        clearable
        style="width: 200px;"
        class="filter-item"
      />
      <el-select
        v-model="job"
        placeholder="职位"
        style="width: 180px"
        class="filter-item"
        clearable
      >
        <el-option v-for="item in jobs" :key="item.pk_ref" :label="item.name" :value="item.name" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
    </div>
    <div class="tableBody">
      <el-table :data="actsData.slice((currentPage-1)*currentPageSize, currentPageSize*currentPage)">
        <el-table-column type="index" align="center" label="序号" width="60" />
        <el-table-column prop="act_name" align="center" label="招聘活动名" show-overflow-tooltip />
        <el-table-column prop="company" align="center" label="公司名" show-overflow-tooltip />
        <el-table-column prop="address" align="center" label="工作地点" show-overflow-tooltip />
        <el-table-column prop="job" align="center" label="岗位名称" show-overflow-tooltip />
        <el-table-column prop="salary" align="center" label="薪资" show-overflow-tooltip />
        <el-table-column prop="jobNumber" align="center" label="人数" show-overflow-tooltip />
        <el-table-column align="center" label="操作" width="350">
          <template slot-scope="scope">
            <el-button size="small" type="warning" @click="view(scope.row)">详情</el-button>
            <el-button type="danger" :disabled="scope.row.resultCount.indexOf(String(resume.pk_resume)) !== -1" @click="updateActResult(scope.row)"><label v-if="scope.row.resultCount.indexOf(String(resume.pk_resume)) === -1">投简历</label><label v-else>已投简</label></el-button>
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
        :total="resumes.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div />
  </el-card>
</template>

<script>
import { getActsForUser, updateActResultCount } from '@/api/act'
import { getResume } from '../../api/resume'
import ActView from '../../components/ActView/actView'
import { getRef } from '@/api/ref'
export default {
  name: 'Index',
  components: { ActView },
  data() {
    return {
      commited: true,
      resume: '',
      dialogVisible: false,
      actsData: [],
      actData: {},
      searchName: null,
      job: null,
      jobs: [],
      address: null,
      currentPage: 1,
      currentPageSize: 10
    }
  },
  mounted() {
    this.getActs()
    getResume().then(response => {
      this.resume = response.data
    })
    getRef({ type: 78 }).then(response => {
      this.jobs = response.data
    })
  },
  methods: {
    handleSizeChange(size) {
      this.currentPageSize = size
    },
    handleCurrentChange(page) {
      this.currentPage = page
    },
    getActs() {
      const obj = {
        name: this.searchName === '' ? null : this.searchName,
        job: this.job === '' ? null : this.job,
        address: this.address === '' ? null : this.address
      }
      getActsForUser(obj).then(response => {
        this.actsData = response.acts
      })
    },
    updateActResult(row) {
      let count = []
      if (row.resultCount !== '') {
        count = row.resultCount.split(',')
      }
      count.push(this.resume.pk_resume)
      const obj = {
        pk_act: row.pk_act,
        resultCount: count.toLocaleString()
      }
      updateActResultCount(obj).then(response => {
        this.$notify({
          type: 'success',
          message: '投简成功!'
        })
        row.resultCount = obj.resultCount
      })
    },
    search() {
      this.getActs()
    },
    view(row) {
      this.actData = row
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
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
