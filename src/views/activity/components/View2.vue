<template>
  <div>
    <div v-for="item in diaData2" :key="item.key">
      <label>{{item.key}}:</label>
      <el-input v-model="item.value" style="width: 380px" />
      <br>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'View2',
  props: {
    diaData2: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log(this.diaData2)
  }
}
</script>

<style scoped>

</style>
