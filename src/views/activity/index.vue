<template>
  <el-card class="top-container">
    <div slot="header">
      <span>招聘活动</span>
    </div>
    <div class="titleRow">
      <el-input
        v-model="searchname"
        placeholder="活动名"
        clearable
        style="width: 200px;"
        class="filter-item"
      />
      <el-select
        v-model="chooseRlue"
        placeholder="状态"
        style="width: 180px"
        class="filter-item"
      >
        <el-option v-for="item in rlues" :key="item.key" :label="item.display_name" :value="item.key" />
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
        width="80%"
      >
        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
          <el-step title="项目名称" />
          <el-step title="过滤条件" />
          <el-step title="起止时间" />
        </el-steps>
        <div style="height: 400px;margin: 30px">
          <view1 v-if="active === 0" ref="view1" :dia-data1="diaData1" />
          <view2 v-if="active === 1" ref="view2" :dia-data2="diaData2" />
          <view3 v-if="active === 3" ref="view3" :dia-data3="diaData3" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="active===3" type="primary" @click="updateOrInsert">确 定</el-button>
          <el-button v-if="active!==3" type="primary" @click="updateOrInsert">暂 存</el-button>
          <el-button v-if="active!==0" style="margin-top: 12px;" @click="font">上一步</el-button>
          <el-button v-if="active!==3" style="margin-top: 12px;" @click="next">下一步</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-table :data="userData" border highlight-current-row>
        <el-table-column type="index" align="center" label="序号" width="100" />
        <el-table-column prop="name" align="center" label="招聘活动名" width="350" show-overflow-tooltip />
        <el-table-column prop="userType" align="center" label="开始时间" width="350" show-overflow-tooltip />
        <el-table-column prop="introduction" align="center" label="结束时间" width="350" show-overflow-tooltip />
        <el-table-column prop="password" align="center" label="状态" width="150" show-overflow-tooltip />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div />
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import View1 from './components/View1'
import View2 from './components/View2'
import View3 from './components/View3'
export default {
  name: 'Index',
  components: { View1, View2, View3 },
  data() {
    return {
      userData: [],
      rlues: [{ key: 'notStart', display_name: '未开始' }, { key: 'starting', display_name: '进行中' }, {
        key: 'over',
        display_name: '已结束'
      }],
      searchname: '',
      chooseRlue: 'starting',
      dialogVisible: false,
      pk_user: '',
      diaData1: {
        activityName: '',
        userName: '',
        job: '',
        jobNumber: '',
        introduction: '',
        company: ''
      },
      diaData2: [
        {
          key: '学历',
          value: ''
        },
        {
          key: '年龄',
          value: ''
        }
      ],
      diaData3: {
        startTime: '',
        endTime: ''
      },
      role: '',
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'name'
    ])
  },
  mounted() {
    this.diaData1.userName = this.name
  },
  methods: {
    search() {
    },
    add() {
      this.dialogVisible = true
    },
    edit(row) {
      this.dialogVisible = true
    },
    deleteUser(row) {

    },
    next() {
      const canNext = this.verify()
      if (!canNext) {
        return
      }
      if (this.active < 4) {
        this.active++
        if (this.active === 2) {
          this.active++
        }
      }
    },
    font() {
      if (this.active > 0) {
        this.active--
        if (this.active === 2) {
          this.active--
        }
      }
    },
    updateOrInsert() {
      if (this.diaData1.pk_act === undefined) {

      } else {

      }
    },
    verify() {
      // 校验
      if (this.active === 0) {
        return this.$refs.view1.verify()
      } else if (this.active === 1) {
        return false
      } else if (this.active === 3) {
        return false
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
