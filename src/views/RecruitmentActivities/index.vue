<template>
  <el-card class="top-container">

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
      <el-table>
        <el-table-column type="index" align="center" label="序号" width="60" />
        <el-table-column prop="act_name" align="center" label="招聘活动名" show-overflow-tooltip />
      </el-table>
    </div>
    <div />
  </el-card>
</template>

<script>
import { getActsForUser, getActInformation, getActByExample, insertAct, insertActScreens, updateAct, deleteScreens, deleteAct } from '@/api/act'

export default {
  name: 'Index',
  data() {
    return {
      actData: [],
      searchName: '',
      job: '',
      jobs: [{key: 1, display_name: 'wang'}]
    }
  },
  mounted() {
    getActsForUser().then(response => {
      this.actData = response.acts
    })
  },
  methods: {
    search() {

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
