<template>
  <div>
    <label>开始时间:</label>
    <br>
    <br>
    <div class="block">
      <el-date-picker
        v-model="diaData3.startTime"
        type="datetime"
        placeholder="选择开始时间"
        default-time="12:00:00">
      </el-date-picker>
    </div>
    <br>
    <br>
    <label>结束时间:</label>
    <br>
    <br>
    <div class="block">
      <el-date-picker
        v-model="diaData3.endTime"
        type="datetime"
        placeholder="选择开始时间结束"
        default-time="12:00:00">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'View3',
  props: {
    diaData3: {
      type: Object,
      default: () => {
        return {
          startTime: '',
          endTime: ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
