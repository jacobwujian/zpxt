<template>
  <div>
    <label>开始时间:</label>
    <br>
    <br>
    <div class="block">
      <el-date-picker
        v-model="actData.startTime"
        type="datetime"
        placeholder="选择开始时间"
        default-time="00:00:00"
        value-format="timestamp">
      </el-date-picker>
    </div>
    <br>
    <br>
    <label>结束时间:</label>
    <br>
    <br>
    <div class="block">
      <el-date-picker
        v-model="actData.endTime"
        type="datetime"
        placeholder="选择开始时间结束"
        default-time="23:59:59"
        value-format="timestamp"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'View3',
  props: {
    actData: {
      type: Object,
      default: () => {
        return {
          startTime: null,
          endTime: null
        }
      }
    },
    disabled: {
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>
