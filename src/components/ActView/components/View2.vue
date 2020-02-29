<template>
  <div>
    <el-form v-model="actData" :rules="rules">

      <el-form-item label="活动介绍:" prop="introduction">
        <el-input v-model="actData.introduction" :autosize="{ minRows: 8}" type="textarea" :disabled="disabled"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'View2',
  props: {
    actData: {
      type: Object,
      default: () => {
        return {
          introduction: ''
        }
      }
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      rules: {
        introduction: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      }
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
