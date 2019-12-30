<template>
  <div>
    <label>招聘活动名&nbsp;&nbsp;&nbsp;&nbsp;:</label>
    <el-input v-model="diaData1.activityName" style="width: 380px" />
    <label style="margin-left: 250px">活动创建人:</label>
    <el-input v-model="diaData1.userName" style="width: 380px" />
    <br>
    <br>
    <label>活动提供岗位:</label>
    <el-input v-model="diaData1.job" style="width: 380px" />

    <label style="margin-left: 250px">岗位人数&nbsp;&nbsp;&nbsp;&nbsp;:</label>
    <el-input v-model="diaData1.jobNumber" style="width: 380px" />
    <br>
    <br>
    <label>活动所属公司:</label>
    <el-input v-model="diaData1.company" style="width: 380px" />
    <br>
    <br>
    <label>活动介绍:</label>
    <br>
    <br>
    <el-input v-model="diaData1.introduction" :autosize="{ minRows: 8}" type="textarea" />
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
          jobNumber: '',
          introduction: '',
          company: ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
