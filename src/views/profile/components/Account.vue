<template>
  <div style="height: 700px">
    <div class="touxang">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
        placeholder="账号类型"
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
      <el-input v-model.trim="resume.email" :disabled="edit" class="elforminput" size="mini" style="width: 250px" />
    </span>
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
      />
    </span>
    <span>
      <label>意向职位:</label>
      <el-input v-model.trim="resume.job" :disabled="edit" class="elforminput" size="mini" style="width: 200px" />
    </span>
    <br>
    <br>
    <span>
      <label>教育经历:</label>
    </span>
    <br>
    <br>
    <el-table :data="eduData" border highlight-current-row style="width: 1051px">
      <el-table-column type="index" align="center" label="序号" width="100" />
      <el-table-column prop="name" align="center" label="学校名" width="250" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input v-if="!edit" v-model="scope.row.name" />
          <div v-else style="height: 36px">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" align="center" label="学校性质" width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input v-if="!edit" v-model="scope.row.type" />
          <div v-else>{{ scope.row.type }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" align="center" label="入学时间" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input v-if="!edit" v-model="scope.row.startTime" />
          <div v-else>{{ scope.row.startTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" align="center" label="毕业时间" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input v-if="!edit" v-model="scope.row.endTime" />
          <div v-else>{{ scope.row.endTime }}</div>
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

import axios from 'axios'
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
      sex: [{ name: '男', key: 'man' }, { name: '女', key: 'woman' }],
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
      eduData: [{ name: '', type: '', startTime: '', endTime: '' }, { name: '', type: '', startTime: '', endTime: '' }, { name: '', type: '', startTime: '', endTime: '' }],
      phone: '',
      introduction: '',
      imageUrl: '',
      pictureData: '',
      resume: {}
    }
  },
  mounted() {
    getChildren({ parent: 43 }).then(response => {
      this.options = response.data
    })
    getResume({ pk_user: this.user.pk_user }).then(response => {
      this.resume = response.data
      const city = response.data.city.substring(2, response.data.city.length - 2)
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

      var formdata1 = new FormData()// 创建form对象
      formdata1.append('img', file, file.name)// 通过append向form对象添加数据,可以通过append继续添加数据
      // 或formdata1.append('img',file);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      } // 添加请求头
      axios.post('/xapi/upimage', formdata1, config).then(response => {
        console.log(response.data)
      })
    },
    beforeAvatarUpload(file) {
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
      console.log(this.resume.city)
      updateResume(this.resume).then(response => {
        console.log(response)
      })
    },
    cannel() {
      this.edit = true
      getResume({ pk_user: this.user.pk_user }).then(response => {
        this.resume = response.data
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
