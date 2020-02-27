<template>
  <el-card class="top-container">
    <div slot="header">
      <span>公司信息</span>
    </div>
    <div class="titleRow">

    </div>
    <div class="tableBody">

    </div>
    <div />
  </el-card>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      actData: ''

    }
  },

  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
  .el-card__header {
    background: #0a76a4;
  }
  .el-dialog-footer{
    float: right;
  }
  .el-dialog-picker{
    width: 60%;
  }
  .titleRow {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .tableBody {
    width: 100%;
  }

  .top-container {
    margin: 30px;
    width: 85vw;
    height: 85vh;
  }
</style>
