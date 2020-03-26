<template>
  <div style="height: 700px;overflow-x: auto">
    <span>
      <label class="elforminput" style="color: #2d2f33">姓名:</label>
      <label class="elforminput">{{ resume.name }}</label>
    </span>
    <span>
      <label class="elforminput" style="color: #2d2f33">性别:</label>
      <label v-if="resume.sex === 'man'" class="elforminput">男</label>
      <label v-else class="elforminput">女</label>
    </span>
    <span>
      <label class="elforminput" style="color: #2d2f33">年龄:</label>
      <label class="elforminput">{{ resume.age }}</label>
    </span>
    <span>
      <label class="elforminput" style="color: #2d2f33">邮箱:</label>
      <label class="elforminput">{{ resume.email }}</label>
    </span>
    <span>
      <label class="elforminput" style="color: #2d2f33">学历:</label>
      <label class="elforminput">{{ resume.education }}</label>
    </span>
    <br>
    <br>
    <span>
      <label class="elforminput" style="color: #2d2f33">电话:</label>
      <label class="elforminput">{{ resume.phone }}</label>
    </span>
    <span>
      <label class="elforminput" style="color: #2d2f33">意向城市:</label>
      <label class="elforminput">{{ resume.city }}</label>
    </span>
    <span>
      <label class="elforminput" style="color: #2d2f33">意向职位:</label>
      <label class="elforminput">{{ resume.job }}</label>
    </span>
    <br>
    <br>
    <span>
      <label class="elforminput" style="color: #2d2f33">教育经历:</label>
    </span>
    <br>
    <br>
    <el-table :data="resume.eduData" border highlight-current-row style="width: 1071px">
      <el-table-column type="index" align="center" label="序号" width="100" />
      <el-table-column prop="name" align="center" label="学校名" width="250" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input v-if="!edit" v-model="scope.row.name" />
          <div v-else style="height: 36px">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" align="center" label="学校性质" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input v-if="!edit" v-model="scope.row.type" />
          <div v-else>{{ scope.row.type }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" align="center" label="入学时间" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-date-picker
            v-if="!edit"
            v-model="scope.row.startTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          />
          <div v-else>{{ timeFormat(scope.row.startTime) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" align="center" label="毕业时间" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-date-picker
            v-if="!edit"
            v-model="scope.row.endTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          />
          <div v-else>{{ timeFormat(scope.row.endTime) }}</div>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <br>
    <label>个人介绍:</label>
    <br>
    <br>
    <el-input v-model="resume.introduction" :disabled="edit" :autosize="{ minRows: 8}" type="textarea" />
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          pk_user: '',
          sale: '',
          age: ''
        }
      }
    },
    resume: {
      type: Object,
      default: () => {
        return {
          name: '',
          pk_user: ''
        }
      }
    }
  },
  data() {
    return {
      action: 'http://localhost:9530/behind/api/resume/setPicture?pk_resume=',
      sex: [{ name: '男', key: 'man' }, { name: '女', key: 'woman' }],
      jobs: [],
      ageOld: '',
      currentValue: '',
      options: [],
      edit: true,
      eduData: [],
      phone: '',
      introduction: '',
      imageUrl: '',
      pictureData: ''
    }
  },
  methods: {
    editResume() {
      this.edit = false
    },
    numberChange(currentValue, oldValue) {
      if (currentValue === undefined) {
        this.ageOld = oldValue
        this.currentValue = undefined
      } else {
        this.ageOld = currentValue
        this.currentValue = currentValue
      }
    },
    numberBlur() {
      if (this.currentValue === undefined) {
        let inp = document.getElementById('inputNumber')
        inp = inp.getElementsByTagName('input')[0]
        inp.value = this.ageOld
      }
    },
    timeFormat(time) {
      const date = new Date(time)
      return date.getFullYear() + '年' + date.getMonth() + 1 + '月' + date.getDate() + '日'
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .elforminput{
    width: 80px;
    margin-right: 20px;
    font-size: 24px;
    color: #0a76a4;
  }
</style>
