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
          <el-button type="primary" :loading="isStart" @click="updateDate">确定</el-button>
        </div>
      </div>
      <br>
    </el-dialog>
    <div class="titleRow">
      <el-input
        v-model="searchName"
        placeholder="活动名"
        clearable
        style="width: 200px;"
        class="filter-item"
      />
      <el-select
        v-model="chooseState"
        placeholder="状态"
        style="width: 180px"
        class="filter-item"
      >
        <el-option v-for="item in searchState" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">
        添加
      </el-button>
    </div>
    <div class="tableBody">
      <ActView :act-data="actData" :dialog-visible="dialogVisible" :disabled="false" @close="close()" @opea="opea" />
      <el-table :data="actsData.slice((currentPage-1)*currentPageSize, currentPageSize*currentPage)" :max-height="490" border highlight-current-row>
        <el-table-column type="index" align="center" label="序号" width="60" />
        <el-table-column prop="act_name" align="center" label="招聘活动名" show-overflow-tooltip />
        <el-table-column prop="startTime" align="center" label="开始时间" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.state === 2 || scope.row.state === 3 ">{{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            <span v-if="scope.row.state !== 2&& scope.row.state !==3">{{ '0-0-0' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="结束时间" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.state === 2 || scope.row.state === 3 ">{{ scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            <span v-if="scope.row.state !== 2 && scope.row.state !== 3">{{ '0-0-0' }}</span>
          </template>
        </el-table-column>
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
            <el-button v-if="scope.row.state === 2" type="info" size="small" @click="endAct(scope.row)">结束</el-button>
            <el-button v-if="scope.row.state === 1 ||scope.row.state === 0" type="danger" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button v-if="scope.row.state !== 2" type="danger" size="small" @click="deleteAct(scope.row, scope.$index)">删除</el-button>
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
        :total="actsData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div />
  </el-card>
</template>

<script>
import { getAllActs, updateAct, deleteAct } from '@/api/act'
import { mapGetters } from 'vuex'
import ActView from '../../components/ActView/actView'

export default {
  name: 'Index',
  components: { ActView },
  data() {
    return {
      actsData: [],
      searchState: [{ key: 0, display_name: '起草中' }, { key: 1, display_name: '未开始' }, { key: 2, display_name: '进行中' }, {
        key: 3,
        display_name: '已结束'
      }, {
        key: 4,
        display_name: '全部'
      }],
      searchName: null,
      chooseState: 4,
      chooseAct: '',
      dialogVisible: false,
      pk_user: '',
      actData: {
        act_name: '',
        creator: this.name,
        job: null,
        jobNumber: '',
        introduction: '',
        company: '',
        state: 0,
        address: '',
        salary: '',
        startTime: null,
        endTime: null
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
      isSelectDate: false, // 是否显示时间选择窗口
      currentPage: 1,
      currentPageSize: 10
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'name'
    ])
  },
  mounted() {
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
        state: this.chooseState === '' || this.chooseState === 4 ? null : this.chooseState
      }
      getAllActs(obj).then(response => {
        this.actsData = response.acts
      })
      this.actData = {
        act_name: '',
        creator: this.name,
        job: null,
        jobNumber: '',
        introduction: '',
        company: '',
        state: 0,
        address: '',
        salary: '',
        startTime: null,
        endTime: null
      }
    },
    close() {
      this.dialogVisible = false
      this.refurbish()
    },
    opea(obj) {
      this.dialogVisible = false
      this.actsData.push(obj)
    },
    updateDate() {
      this.actData.state = 2
      this.actData.startTime = new Date(this.dateValue[0]).getTime()
      this.actData.endTime = new Date(this.dateValue[1]).getTime()
      updateAct(this.actData).then(response => {
        this.$notify({
          type: 'success',
          message: '启动成功!'
        })
      })
      this.isSelectDate = false
    },
    search() {
      this.currentPage = 1
      this.refurbish()
    },
    endAct(row) {
      row.state = 3
      updateAct(row).then(response => {
        this.$notify({
          type: 'success',
          message: '结束活动完成!'
        })
      })
    },
    back(row) {
      row.state = 1
      updateAct(row).then(response => {
        this.$notify({
          type: 'success',
          message: '回退成功!'
        })
      })
    },
    start(row) {
      this.dateValue = [new Date(), new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)]
      this.isSelectDate = true
      this.actData = row
    },
    add() {
      this.actData = {
        act_name: '',
        creator: this.name,
        job: '',
        jobNumber: '',
        introduction: '',
        company: '',
        state: 0,
        address: '',
        salary: '',
        startTime: null,
        endTime: null
      }
      this.dialogVisible = true
    },
    edit(row) {
      this.actData = row
      this.dialogVisible = true
    },
    deleteAct(row, index) {
      this.$confirm('你確定要刪除活动' + row.act_name + '嗎?', '刪除', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAct(row).then(response => {
          this.actsData.splice(index, 1)
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
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
