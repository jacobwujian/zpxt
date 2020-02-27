<template>
  <div>

    <el-form ref="form" class="el-form" :rules="rules" :label-position="labelPosition" :model="diaData1">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="招聘活动名:" prop="act_name">
              <el-input v-model="diaData1.act_name" class="el-input-name" maxlength="50" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="活动创建人:" prop="creator">
              <el-input disabled v-model="diaData1.creator" class="el-input-ddr" maxlength="50" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="活动提供岗位:" prop="job">
              <el-select
                v-model="diaData1.job"
                placeholder="职位"
              >
                <el-option v-for="item in jobs" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>             </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="岗位人数:" prop="jobNumber">
              <el-input-number v-model="diaData1.jobNumber" :precision="0" :min="1" class="el-input-ddr" maxlength="50" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="活动所属公司:" prop="company">
              <el-input v-model="diaData1.company" class="el-input-name" maxlength="50" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="活动介绍:" prop="introduction">
          <el-input v-model="diaData1.introduction" :autosize="{ minRows: 8}" type="textarea" />
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getChildren, getRef } from '../../../api/ref'
export default {
  name: 'View1',
  props: {
    diaData1: {
      type: Object,
      default: () => {
        return {
          act_name: '',
          creator: '',
          job: '',
          jobNumber: 1,
          introduction: '',
          company: ''
        }
      }
    }
  },
  data() {
    return {
      jobs: [],
      labelPosition: 'right',
      rules: {
        act_name: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        creator: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        job: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        jobNumber: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        company: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    getRef({ type: 78 }).then(response => {
      this.jobs = response.data
    })
  },
  methods: {
    verify() {
      // 校验
      const form = this.$refs.form
      let can
      form.validate((is, data) => {
        can = is
      })
      return can
    },
    clear() {
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style scoped>
  .el-form{
    padding-left: 5%;
    padding-right: 5%;
    height: 40vh;
  }
  .el-input-name{
    width: 80%;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .el-input-ddr{
    width: 80%;
  }
</style>
