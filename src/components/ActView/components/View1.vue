<template>
  <div>

    <el-form ref="form" class="el-form" :rules="rules" :label-position="labelPosition" :model="actData">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="招聘活动名:" prop="act_name">
              <el-input v-model="actData.act_name" class="el-input-name" maxlength="50" :disabled="disabled" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="活动创建人:" prop="creator">
              <el-input v-model="actData.creator" disabled class="el-input-ddr" maxlength="50" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="活动提供岗位:" prop="job">
              <el-select
                v-model="actData.job"
                placeholder="职位"
              >
                <el-option
                  v-for="item in jobs"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                  :disabled="disabled"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="岗位人数:" prop="jobNumber">
              <el-input-number
                v-model="actData.jobNumber"
                :precision="0"
                :min="1"
                class="el-input-ddr"
                maxlength="50"
                :disabled="disabled"
              />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="活动所属公司:" prop="company">
              <el-input v-model="actData.company" class="el-input-name" maxlength="50" :disabled="disabled" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="actData.address" class="el-input-name" maxlength="50" :disabled="disabled" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="薪资:" prop="salary">
          <el-input
            v-model="actData.salary"
            class="el-input-name"
            maxlength="50"
            placeholder="例如：10k~15k"
            :disabled="disabled"
          />
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
    actData: {
      type: Object,
      default: () => {
        return {
          act_name: '',
          creator: '',
          job: '',
          jobNumber: 1,
          address: '',
          salary: '',
          company: ''
        }
      }
    },
    disabled: {
      type: Boolean
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
        address: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        salary: [
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
  .el-form {
    padding-left: 5%;
    padding-right: 5%;
    height: 40vh;
  }

  .el-input-name {
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .el-input-ddr {
    width: 80%;
  }
</style>
