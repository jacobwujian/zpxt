<template>
  <div>
    <el-form v-model="diaData2">
      <el-form-item v-for="item in diaData2" :key="item.name">
        <span style="margin-left: 30px">条件名：</span>
        <label style="width: 250px;color: #3d111f;">{{ item.name }}</label>
        <span style="margin-left: 30px">比较符：</span><el-input v-model="item.screenCoin"  style="width: 250px" />
        <span style="margin-left: 30px">条件值：</span><el-input v-model="item.screenValue1"  style="width:250px" />
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
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
  data() {
    return {
      selected: [{ filedName: '学历', screenCoin: ['in'], screenValue1: [] }],
      reasons: [{ name: '学历', key: 'education' }, { name: '年龄', key: 'age' }, { name: '意向城市', key: 'city' }, { name: '所求职位', key: 'job' }],
      coin: ['>', '>=', '=', '<', '<=', 'between']
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
