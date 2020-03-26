<template>
  <div class="user-activity">
    <el-dialog
      title="增加技能"
      :visible.sync="addWorkShow"
      width="30%"
      @close="clear"
    >
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="公司名称">
          <el-input v-model="formLabelAlign.companyName" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="formLabelAlign.job" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="formLabelAlign.startTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="formLabelAlign.endTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item label="工作介绍">
          <el-input v-model="formLabelAlign.workIntroduction" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWorkShow = false">取 消</el-button>
        <el-button type="primary" @click="addWork">确 定</el-button>
      </span>
    </el-dialog>

    <div v-if="works.length !== 0">
      <div v-for="item in works" class="post">
        <div class="user-block">
          <span class="username text-muted">公司：{{ item.companyName }}&nbsp;&nbsp;&nbsp;&nbsp; <el-button type="text" @click="updateOpen(item)">修改</el-button><el-button type="text" @click="deleteWork(item)">删除</el-button></span>
          <span class="description">职位：{{ item.job }}</span>
          <span class="description">时间：{{ timeFormat(item.startTime) }}至{{ timeFormat(item.endTime) }}</span>
        </div>
        <p>
          {{ item.workIntroduction }}
        </p>
      </div>
    </div>
    <div v-else>
      <div class="post">
        <p style="font-size: 30px;margin-left: 40%">
          暂无工作经历.
        </p>
      </div>
    </div>
    <el-button class="add" type="text" @click="addWorkShow = true">+</el-button>
  </div>
</template>

<script>
import { getWorks, updateWork, deleteWork, insertWork } from '../../../api/resume'

export default {
  data() {
    return {
      works: [],
      edit: true,
      addWorkShow: false,
      formLabelAlign: {
        companyName: '',
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
        job: '',
        workIntroduction: ''
      }
    }
  },
  mounted() {
    this.getWorks({ pk_user: null })
  },
  methods: {
    getWorks() {
      getWorks({ pk_user: null }).then(response => {
        this.works = response.works
      })
    },
    clear() {
      this.formLabelAlign = {
        companyName: '',
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
        job: '',
        workIntroduction: ''
      }
    },
    updateOpen(item) {
      this.formLabelAlign = item
      this.addWorkShow = true
    },
    insertWork() {
      insertWork(this.formLabelAlign).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.getWorks()
        this.addWorkShow = false
      }).catch(err => {
        this.$message({
          type: 'danger',
          message: '添加失败!'
        })
      })
      this.clear()
    },
    updateWork() {
      updateWork(this.formLabelAlign).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getWorks()
        this.addWorkShow = false
      }).catch(err => {
        this.$message({
          type: 'danger',
          message: '修改失败!'
        })
      })
      this.clear()
    },
    deleteWork(item) {
      deleteWork(item).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getWorks()
        this.addWorkShow = false
      }).catch(err => {
        this.$message({
          type: 'danger',
          message: '删除失败!'
        })
      })
    },
    addWork() {
      if (this.formLabelAlign.pk_work !== undefined) {
        this.updateWork()
      } else {
        this.insertWork()
      }
    },
    timeFormat(time) {
      const date = new Date(time)
      return date.getFullYear() + '年' + date.getMonth() + 1 + '月' + date.getDate() + '日'
    }
  }
}
</script>

<style lang="scss" scoped>
  .add{
    padding: 0;
    margin-top: 0;
    margin-left: 49%;
    font-size: 30px;
  }
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 0;
    padding-bottom: 0;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
