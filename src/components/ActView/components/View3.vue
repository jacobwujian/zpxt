<template>
  <div>
    <el-form :model="company">
      <el-form-item label="公司名称">
        <el-input v-model="company.name" :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="公司所在地">
        <el-input v-model="company.address" :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="公司介绍">
        <el-input v-model="company.introduction" :disabled="isEdit" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCompany } from '@/api/company'
export default {
  name: 'View3',
  props: {
    actData: {
      type: Object,
      default: () => {
        return {
          pk_user: null
        }
      }
    }
  },
  data() {
    return {
      company: {
        name: '',
        address: '',
        introduction: ''
      },
      isEdit: true
    }
  },
  mounted() {
    getCompany(this.actData).then(response => {
      this.company = response.company
    })
  }
}
</script>

<style scoped>

</style>
