<template>
  <div style="height: 700px;overflow-x: auto">
    <div class="touxang">
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-image v-if="resume.picture" :src="'data:image/jepg;base64,' + resume.picture" class="avatar" lazy />
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </div>
    <span>
      <label>姓名:</label>
      <el-input v-model.trim="resume.name" :disabled="edit" class="elforminput" size="mini" />
    </span>
    <span>
      <label>性别:</label>
      <el-select
        v-model="resume.sex"
        :disabled="edit"
        size="mini"
        placeholder="性别"
        class="elforminput"
      >
        <el-option v-for="item in sex" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
    </span>
    <span>
      <label>年龄:</label>

      <el-input-number
        id="inputNumber"
        v-model="resume.age"
        :disabled="edit"
        :controls="false"
        :precision="0"
        :step="1"
        :min="1"
        size="mini"
        class="elforminput"
        @change="numberChange"
        @blur="numberBlur"
      />
    </span>
    <span>
      <label>邮箱:</label>
      <el-input v-model.trim="resume.email" :disabled="edit" class="elforminput" size="mini" style="width: 200px" />
    </span>
    <span>
      <label>学历:</label>
      <el-select
        v-model="resume.education"
        :disabled="edit"
        size="mini"
        placeholder="学历"
        style="width: 150px"
      >
        <el-option v-for="item in education" :key="item.name" :label="item.name" :value="item.name" />
      </el-select>    </span>
    <br>
    <br>
    <span>
      <label>电话:</label>
      <el-input v-model.trim="resume.phone" :disabled="edit" class="elforminput" size="mini" style="width: 150px" />
    </span>
    <span>
      <label>意向城市:</label>
      <el-cascader
        v-model="resume.city"
        :disabled="edit"
        :options="options"
        :props="props"
        :show-all-levels="false"
        style=" width: 180px;margin-right: 20px;"
      />
    </span>
    <span>
      <label>意向职位:</label>
      <el-select
        v-model="resume.job"
        :disabled="edit"
        size="mini"
        placeholder="职位"
        style="width: 150px"
      >
        <el-option v-for="item in jobs" :key="item.name" :label="item.name" :value="item.name" />
      </el-select>        </span>
    <br>
    <br>
    <span>
      <label>教育经历:</label>
    </span>
    <br>
    <br>
    <el-table :data="eduData" border highlight-current-row style="width: 1071px">
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
    <el-button v-if="edit" type="warning" class="footer" @click="editResume">编辑</el-button>
    <el-button v-if="!edit" type="success" class="footer" @click="submit">确定</el-button>
    <el-button v-if="!edit" class="footer" @click="cannel">取消</el-button>
  </div>
</template>

<script>
import { getChildren, getRef } from '../../../api/ref'
import { updateResume, getResume } from '../../../api/resume'

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
    }
  },
  data() {
    return {
      action: 'http://localhost:9530/behind/api/resume/setPicture?pk_resume=',
      sex: [{ name: '男', key: 'man' }, { name: '女', key: 'woman' }],
      education: [],
      jobs: [],
      ageOld: '',
      currentValue: '',
      city: '',
      options: [],
      props: {
        multiple: true,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.data !== undefined) {
            getChildren({ parent: node.data.id }).then(response => {
              resolve(response.data)
            })
          }
          if (node.children !== undefined && node.children.length === 0) {
            getRef({ type: node.data.id }).then(response => {
              const arr = []
              for (let i = 0; i < response.data.length; i++) {
                arr.push({ label: response.data[i].name, value: response.data[i].name, leaf: true })
              }
              resolve(arr)
            })
          }
        }
      },
      edit: true,
      eduData: [],
      phone: '',
      introduction: '',
      imageUrl: '',
      pictureData: '',
      resume: {}
    }
  },
  mounted() {
    getRef({ type: 77 }).then(response => {
      this.education = response.data
    })
    getRef({ type: 78 }).then(response => {
      this.jobs = response.data
    })
    getChildren({ parent: 43 }).then(response => {
      this.options = response.data
      for (const item in this.options) {
        getRef({ type: this.options[item].id }).then(res => {
          const arr = []
          for (let j = 0; j < res.data.length; j++) {
            arr.push({ label: res.data[j].name, value: res.data[j].name, leaf: true })
          }
          this.$set(this.options[item], 'children', arr)
        })
      }
    })
    getResume({ pk_user: this.user.pk_user }).then(response => {
      this.resume = response.data
      this.action = this.action + this.resume.pk_resume
      this.eduData = []
      this.eduData.push({ name: this.resume.school1, type: this.resume.schoolType1, startTime: this.resume.start1, endTime: this.resume.end1 })
      this.eduData.push({ name: this.resume.school2, type: this.resume.schoolType2, startTime: this.resume.start2, endTime: this.resume.end2 })
      this.eduData.push({ name: this.resume.school3, type: this.resume.schoolType3, startTime: this.resume.start3, endTime: this.resume.end3 })
      const city = this.resume.city.substring(2, this.resume.city.length - 2)
      this.resume.city = city.split('], [')
      for (let i = 0; i < this.resume.city.length; i++) {
        const sr = this.resume.city[i]
        this.resume.city[i] = sr.split(', ')
      }
    })
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    editResume() {
      this.edit = false
    },
    submit() {
      this.edit = true
      this.resetEduData()
      updateResume(this.resume).then(response => {
      })
    },
    resetEduData() {
      this.resume.school1 = this.eduData[0].name
      this.resume.school2 = this.eduData[1].name
      this.resume.school3 = this.eduData[2].name
      this.resume.schoolType1 = this.eduData[0].type
      this.resume.schoolType2 = this.eduData[1].type
      this.resume.schoolType3 = this.eduData[2].type
      this.resume.start1 = this.eduData[0].startTime
      this.resume.start2 = this.eduData[1].startTime
      this.resume.start3 = this.eduData[2].startTime
      this.resume.end1 = this.eduData[0].endTime
      this.resume.end2 = this.eduData[1].endTime
      this.resume.end3 = this.eduData[2].endTime
    },
    cannel() {
      this.edit = true
      getResume({ pk_user: this.user.pk_user }).then(response => {
        this.eduData = []
        this.eduData.push({ name: response.data.school1, type: response.data.schoolType1, startTime: response.data.start1, endTime: response.data.end1 })
        this.eduData.push({ name: response.data.school2, type: response.data.schoolType2, startTime: response.data.start2, endTime: response.data.end2 })
        this.eduData.push({ name: response.data.school3, type: response.data.schoolType3, startTime: response.data.start3, endTime: response.data.end3 })
        this.resume = response.data
        const city = response.data.city.substring(2, response.data.city.length - 2)
        this.resume.city = city.split('], [')
        for (let i = 0; i < this.resume.city.length; i++) {
          const sr = this.resume.city[i]
          this.resume.city[i] = sr.split(', ')
        }
      })
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .touxang{
    float: right;
    width: 120px;
    height: 120px;
    background-size: contain;
    margin-right: 10px;

  }
.footer{
  margin: 30px;
  position: relative;
  left: 40%;
}
  .elforminput{
    width: 80px;
    margin-right: 20px;
  }
</style>
