<template>
  <el-card class="top-container">
    <div slot="header">
      <span>招聘活动</span>
    </div>
    <el-dialog title="启动" :visible.sync="isSelectDate">
      <div class="el-dialog-block">
        <div>
          <span class="demonstration">日期范围：</span>
          <el-date-picker
            v-model="dateValue"
            class="el-dialog-picker"
            align="right"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            :default-time="['00:00:00', '23:59:59']"
          />
        </div>
        <br>
        <div slot="footer" class="el-dialog-footer">
          <el-button :disabled="isStart" @click="isSelectDate = false">取消</el-button>
          <el-button type="primary" :loading="isStart" @click="isSelectDate = false">确定</el-button>
        </div>
        <!--        <div>-->
        <!--        </div>-->
      </div>
      <br>
    </el-dialog>
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
      <el-table :data="userData" :max-height="490" border highlight-current-row>
        <el-table-column type="index" align="center" label="序号" width="60" />
        <el-table-column prop="act_name" align="center" label="招聘活动名" show-overflow-tooltip />
        <el-table-column prop="startTime" align="center" label="开始时间" width="150" show-overflow-tooltip />
        <el-table-column prop="endTime" align="center" label="结束时间" width="150" show-overflow-tooltip />
        <el-table-column prop="job" align="center" label="职位" width="150" show-overflow-tooltip />
        <el-table-column prop="jobNumber" align="center" label="人数" width="100" show-overflow-tooltip />
        <el-table-column prop="state" align="center" label="状态" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.state === 0"><el-tag type="info">起草中</el-tag></div>
            <div v-if="scope.row.state === 1"><el-tag type="danger">未开始</el-tag></div>
            <div v-if="scope.row.state === 2"><el-tag type="success">进行中</el-tag></div>
            <div v-if="scope.row.state === 3"><el-tag type="warning">已完成</el-tag></div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="350">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state ===2" size="small" type="warning" @click="back(scope.row)">回退</el-button>
            <el-button v-if="scope.row.state === 1" type="success" size="small" @click="start(scope.row)">启动</el-button>
            <el-button type="danger" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button v-if="scope.row.state !== 2" type="danger" size="small" @click="deleteUser(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div />
  </el-card>
</template>

<script>
import { getAllActs, getActInformation, insertAct, insertActScreens, updateAct, deleteScreens, deleteAct } from '@/api/act'
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
        act_name: '',
        creator: '',
        job: '',
        jobNumber: '',
        introduction: '',
        company: '',
        state: 0
      },
      diaData2: [],
      diaData3: {
        startTime: '',
        endTime: ''
      },
      role: '',
      isStart: false, // 是否可以点击启动确认按钮
      pickerOptions: { // 日期
        shortcuts: [{
          text: '一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '一月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '三月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      active: 0,
      dateValue: [],
      isSelectDate: false // 是否显示时间选择窗口
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'name'
    ])
  },
  mounted() {
    getAllActs().then(response => {
      console.log(response)
      this.userData = response.acts
    })
  },
  methods: {
    search() {
    },
    back(row) {
      row.state = 1
      updateAct(row)
    },
    start(row) {
      this.dateValue = [new Date(), new Date()]
      this.isSelectDate = true
    },
    add() {
      this.diaData1 = {
        act_name: '',
        creator: this.name,
        job: '',
        jobNumber: '',
        introduction: '',
        company: '',
        state: 0
      }
      this.diaData2 = []
      this.diaData3 = {
        startTime: '',
        endTime: ''
      }
      this.dialogVisible = true
    },
    edit(row) {
      this.diaData1 = row
      this.dialogVisible = true
    },
    deleteUser(row, index) {
      console.log(row)
      deleteAct(row).then(response => {
        this.userData.splice(index, 1)
      })
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
      if (this.active === 3) {
        this.diaData1.state = 1
      }

      this.updateInsert(this.diaData1).then(response => {
        if (response.act !== undefined) {
          this.userData.push(response.act)
        }
      })

      this.dialogVisible = false
    },
    updateInsert(data) {
      if (this.diaData1.pk_act === undefined || this.diaData1.pk_act === '') {
        return insertAct(data)
      } else {
        return updateAct(data)
      }
    },
    verify() {
      // 校验
      if (this.active === 0) {
        return this.$refs.view1.verify()
      } else if (this.active === 1) {
        return true
      } else if (this.active === 3) {
        return true
      }
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
