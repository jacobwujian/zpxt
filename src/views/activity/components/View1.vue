<template>
  <div>

    <el-form ref="form" class="el-form" :rules="rules" :label-position="labelPosition" :model="diaData1">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!--            <el-tooltip class="item" effect="light" :content="infoForm.activityname" placement="top">-->
            <el-form-item label="招聘活动名:" prop="activityName">
              <el-input v-model="diaData1.activityName" class="el-input-name" maxlength="50" />
            </el-form-item>
            <!--            </el-tooltip>-->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!--            <el-tooltip class="item" effect="light" :content="infoForm.site" placement="top">-->
            <el-form-item label="活动创建人:" prop="userName">
              <el-input v-model="diaData1.userName" class="el-input-ddr" maxlength="50" />
            </el-form-item>
            <!--            </el-tooltip>-->
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!--            <el-tooltip class="item" effect="light" :content="infoForm.activityname" placement="top">-->
            <el-form-item label="活动提供岗位:" prop="job">
              <el-input v-model="diaData1.job" class="el-input-name" maxlength="50" />
            </el-form-item>
            <!--            </el-tooltip>-->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!--            <el-tooltip class="item" effect="light" :content="infoForm.site" placement="top">-->
            <el-form-item label="岗位人数:" prop="jobNumber">
              <el-input-number v-model="diaData1.jobNumber" :precision="0" :min="1" class="el-input-ddr" maxlength="50" />
            </el-form-item>
            <!--            </el-tooltip>-->
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!--            <el-tooltip class="item" effect="light" :content="infoForm.activityname" placement="top">-->
            <el-form-item label="活动所属公司:" prop="company">
              <el-input v-model="diaData1.company" class="el-input-name" maxlength="50" />
            </el-form-item>
            <!--            </el-tooltip>-->
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
export default {
  name: 'View1',
  props: {
    diaData1: {
      type: Object,
      default: () => {
        return {
          activityName: '',
          userName: '',
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
      labelPosition: 'right',
      rules: {
        activityName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        userName: [
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
  methods: {
    verify() {
      // 校验
      const form = this.$refs.form
      let can
      form.validate((is, data) => {
        can = is
      })
      return can
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
