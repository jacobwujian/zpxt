<template>
  <div>
    <div v-for="item in diaData2" :key="item.key">
      <label>{{ item.filedName }}</label>
      <el-select v-model="item.screenCoin" style="width: 380px" />
      <el-input v-model="item.screenValue" style="width: 380px" />
      <br>
      <br>
    </div>
    <el-button type="primary" @click="add">增加</el-button>
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
  },
  methods: {
    add() {
      this.diaData2.push({ filedName: '', screenCoin: '', screenValue: '' })
    }
  }
}
</script>

<style scoped>

</style>
