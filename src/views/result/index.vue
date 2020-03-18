<template>
  <el-card class="top-container">
    <div slot="header">
      <span>活动详情</span>
    </div>
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
        clearable
      >
        <el-option v-for="item in jobs" :key="item.pk_ref" :label="item.name" :value="item.name" />
      </el-select>
      <el-select
        v-model="state"
        placeholder="状态"
        style="width: 180px"
        class="filter-item"
      >
        <el-option v-for="item in states" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
    </div>
    <div class="tableBody"><el-scrollbar class="eltree">
      <el-tree
        ref="tree"
        :expand-on-click-node="false"
        accordion
        :data="actsData"
        highlight-current
      >
        <span slot-scope="{ node, data }" class="custom-tree-node" @click="getResumes(data)">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </el-scrollbar>
    </div>
    <div />
  </el-card>
</template>

<script>
import { getAllActs } from '@/api/act'

import { getRef } from '@/api/ref'
export default {
  name: 'Index',
  data() {
    return {
      searchName: null,
      actsData: [],
      state: 2,
      states: [{ key: 2, name: '进行中' }, { key: 3, name: '已结束' }],
      job: null,
      jobs: []
    }
  },

  mounted() {
    getRef({ type: 78 }).then(response => {
      this.jobs = response.data
    })
    this.refurbish()
  },
  methods: {
    refurbish() {
      const obj = {
        name: this.searchName === '' ? null : this.searchName,
        state: this.state === '' ? null : this.state
      }
      getAllActs(obj).then(response => {
        this.actsData = response.acts
      })
    },
    search() {
      this.refurbish()
    },
    getResumes(data){
      console.log(data)
    }
  }
}
</script>

<style scoped>
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
    margin-top: 10px;
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
