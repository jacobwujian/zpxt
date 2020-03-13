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
      <el-select
        v-model="job"
        placeholder="职位"
        style="width: 180px"
        class="filter-item"
      >
        <el-option v-for="item in jobs" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
    </div>
    <div class="tableBody">
      <el-table :data="actsData">
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div />
  </el-card>
</template>

<script>
import { getActsForUser } from '@/api/act'
import { getResume } from '../../api/resume'
import ActView from '../../components/ActView/actView'
export default {
  name: 'Index',
  components: { ActView },
  data() {
    return {
      resume: '',
      dialogVisible: false,
      actsData: [],
      actData: {},
      searchName: '',
      job: '',
      jobs: [{ key: 1, display_name: 'wang' }]
    }
  },
  mounted() {
    getActsForUser().then(response => {
      this.actsData = response.acts
    })
    getResume().then(response => {
      this.resume = response.data
    })
  },
  methods: {
    search() {

    },
    view(row) {
      this.actData = row
      this.$set(this.actData, 'pk_resume', this.resume.pk_resume)
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
