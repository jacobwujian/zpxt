<template>
  <el-card class="top-container">
    <el-dialog title="详细信息" fullscreen destroy-on-close :visible.sync="dialogTableVisible">
      <ViewResume :resume="chooseResume" :user="user" />
    </el-dialog>
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
        placeholder="招聘职位"
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
    <div class="tableBody">
      <label style="color: #ff642a">活动:</label>
      <label style="margin-left:12%;color: #ff642a">简历:</label>
      <br>
      <br>
      <el-scrollbar class="el-tree">
        <el-tree
          ref="tree"
          :data="actsData"
          :props="defaultProps"
          highlight-current
          @node-click="getResumes"
        >
          <span slot-scope="{ node }" class="custom-tree-node">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </el-scrollbar>
      <el-card class="resume_table">
        <el-select
          v-model="resumeSelect.job"
          placeholder="职位意向"
          style="width: 180px"
          class="filter-item"
          clearable
        >
          <el-option v-for="item in jobs" :key="item.pk_ref" :label="item.name" :value="item.name" />
        </el-select>
        <el-select
          v-model="resumeSelect.sex"
          placeholder="性别"
          style="width: 180px"
          class="filter-item"
          clearable
        >
          <el-option v-for="item in sex" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
        <el-select
          v-model="resumeSelect.age"
          placeholder="年龄"
          style="width: 180px"
          class="filter-item"
          clearable
        >
          <el-option v-for="item in age" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
        <el-button class="filter-item" type="primary" :disabled="nowAct.pk_act===undefined" icon="el-icon-search" @click="searchResume">
          搜索
        </el-button>
        <br>
        <el-table :data="resumes.slice((currentPage-1)*currentPageSize, currentPageSize*currentPage)">
          <el-table-column type="index" align="center" label="序号" width="60" />
          <el-table-column prop="name" align="center" label="姓名" show-overflow-tooltip />
          <el-table-column prop="sex" align="center" label="性别" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.sex === 'man'">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" align="center" label="年龄" show-overflow-tooltip />
          <el-table-column prop="job" align="center" label="求职意向" show-overflow-tooltip />
          <el-table-column prop="education" align="center" label="学历" show-overflow-tooltip />
          <el-table-column align="center" label="操作" width="350">
            <template slot-scope="scope">
              <el-button size="small" type="warning" @click="view(scope.row)">详情</el-button>
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
      </el-card>
    </div>
    <div />
  </el-card>
</template>

<script>
import { getAllActs } from '@/api/act'
import { getResumes } from '@/api/resume'
import { getRef } from '@/api/ref'
import ViewResume from './components/index'
import { getInfo } from '../../api/user'
import { getWorks } from '@/api/resume'

export default {
  name: 'Index',
  components: { ViewResume },
  data() {
    return {
      searchName: null,
      actsData: [],
      nowAct: {},
      defaultProps: {
        children: 'children',
        label: 'act_name'
      },
      dialogTableVisible: false,
      state: 2,
      states: [{ key: 2, name: '进行中' }, { key: 3, name: '已结束' }],
      job: null,
      jobs: [],
      resumeSelect: {
        age: null,
        sex: null,
        education: null,
        job: null
      },
      age: [{ name: '18岁~23岁', key: ' and age between 18 and 23' }, { name: '24岁~30岁', key: ' and age between 24 and 30' }, { name: '30岁~40岁', key: ' and age between 30 and 40' }, { name: '大于40岁', key: ' and age > 40' }],
      sex: [{ name: '男', key: 'man' }, { name: '女', key: 'woman' }],
      resumes: [],
      chooseResume: {},
      user: {},
      currentPage: 1,
      currentPageSize: 10
    }
  },

  mounted() {
    getRef({ type: 78 }).then(response => {
      this.jobs = response.data
    })
    this.refurbish()
  },
  methods: {
    handleSizeChange(size) {
      this.currentPageSize = size
    },
    handleCurrentChange(page) {
      this.currentPage = page
    },
    refurbish() {
      const obj = {
        name: this.searchName === '' ? null : this.searchName,
        state: this.state === '' ? null : this.state,
        job: this.job === '' ? null : this.job
      }
      getAllActs(obj).then(response => {
        this.actsData = response.acts
      })
    },
    search() {
      this.refurbish()
      this.nowAct = {}
      this.resumes = []
    },
    searchResume() {
      this.currentPage = 1
      let example = 'select * from resume where pk_resume in (' + this.nowAct.resultCount + ')'
      for (const e in this.resumeSelect) {
        if (this.resumeSelect[e] !== null && this.resumeSelect[e] !== '') {
          if (e !== 'age') {
            example = example + ' and ' + e + ' = "' + this.resumeSelect[e] + '"'
          } else if (this.resumeSelect.age !== null) {
            example += this.resumeSelect.age
          }
        }
      }
      if (this.nowAct.resultCount !== '') {
        getResumes({ example: example }).then(response => {
          this.resumes = response.data
        })
      }
    },
    getResumes(data) {
      if (this.nowAct.pk_act === undefined || this.nowAct.pk_act !== data.pk_act) {
        this.nowAct = data
        this.searchResume()
      }
    },
    view(row) {
      const eduData = []
      eduData.push({ name: row.school1, type: row.schoolType1, startTime: row.start1, endTime: row.end1 })
      eduData.push({ name: row.school2, type: row.schoolType2, startTime: row.start2, endTime: row.end2 })
      eduData.push({ name: row.school3, type: row.schoolType3, startTime: row.start3, endTime: row.end3 })
      this.chooseResume = row
      if ((this.chooseResume.city !== '' || this.chooseResume.city !== undefined) && typeof (this.chooseResume.city) === 'string') {
        this.chooseResume.city = this.chooseResume.city.substring(2, this.chooseResume.city.length - 2)
        this.chooseResume.city = this.chooseResume.city.split('], [')
        for (const item in this.chooseResume.city) {
          this.chooseResume.city[item] = this.chooseResume.city[item].substring(this.chooseResume.city[item].indexOf(',') + 1)
        }
      }
      if (typeof (this.chooseResume.skills) === 'string') {
        this.chooseResume.skills = this.chooseResume.skills.split(',')
      }
      if (this.chooseResume.eduData === undefined) {
        this.$set(this.chooseResume, 'eduData', eduData)
      }
      getInfo({ pk_user: row.pk_user }).then(response => {
        this.user = response.data
        if (this.chooseResume.works === undefined) {
          getWorks({ pk_user: this.chooseResume.pk_user }).then(response => {
            this.$set(this.chooseResume, 'works', response.works)
            this.dialogTableVisible = true
          })
        } else {
          this.dialogTableVisible = true
        }
      })
    }
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding-right: 8px;
    margin-top: 10px;
  }
  .el-tree{
    float: left;
    height: 600px;
    width: 200px;
  }
  /deep/.el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .resume_table{
    float: left;
    margin-left: 20px;
    width: 1200px;
    height: 600px;
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
