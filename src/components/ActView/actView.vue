<template>
  <el-dialog
    ref="dialog"
    :destroy-on-close="true"
    title="活动信息"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="close"
    @open="open"
  >
    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="活动条件" />
      <el-step title="活动介绍" />
      <el-step title="公司信息" />
    </el-steps>
    <div style="height: 400px;margin: 30px">
      <view1 v-if="active === 0" ref="view1" :act-data="actData" :disabled="disabled" />
      <view2 v-if="active === 1" ref="view2" :act-data="actData" :disabled="disabled" />
      <view3 v-if="active === 3" ref="view3" :act-data="actData" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="disabled" type="danger" :disabled="commited" @click="updateActResult"><label v-if="!commited">投简历</label><label v-else>已投简</label></el-button>
      <el-button v-if="active===3&&!disabled" type="primary" @click="updateOrInsert">确 定</el-button>
      <el-button v-if="active!==3&&!disabled" type="primary" @click="updateOrInsert">暂 存</el-button>
      <el-button v-if="active!==0" style="margin-top: 12px;" @click="font">上一步</el-button>
      <el-button v-if="active!==3" style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { insertAct, updateAct } from '@/api/act'
import { getResult, updateResult } from '../../api/result'

import View1 from './components/View1'
import View2 from './components/View2'
import View3 from './components/View3'
export default {
  name: 'ActView',
  components: { View1, View2, View3 },
  props: {
    actData: {
      type: Object,
      default: () => {
        return {
          pk_act: null,
          act_name: '',
          creator: this.name,
          job: '',
          jobNumber: '',
          introduction: '',
          company: '',
          state: 0,
          address: '',
          salary: '',
          startTime: null,
          endTime: null
        }
      }
    },
    dialogVisible: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      active: 0,
      result: '',
      resultCount: [],
      commited: false }
  },
  watch: {
    'actData': {
      handler: function(val, oldval) {
        if (this.actData.state === 2) {
          getResult(this.actData).then(response => {
            this.result = response['res']
            if (response['res']['resultCount'] !== undefined) {
              this.resultCount = response['res']['resultCount'].split(',')
              if (this.resultCount.indexOf(String(this.actData.pk_resume)) === -1) {
                this.commited = false
              } else {
                this.commited = true
              }
            }
          })
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    open() {
      this.active = 0
    },
    opea(obj) {
      this.$emit('opea', obj)
    },
    next() {
      const canNext = this.verify()
      if (!canNext) {
        return
      }
      if (this.active < 4) {
        this.active++
        if (this.active === 2) {
          this.active++
        }
      }
    },
    font() {
      if (this.active > 0) {
        this.active--
        if (this.active === 2) {
          this.active--
        }
      }
    },
    updateOrInsert() {
      if (this.active === 3) {
        this.actData.state = 1
      }
      this.updateInsert(this.actData).then(response => {
        if (response['act'] !== undefined) {
          this.opea(response['act'])
        } else {
          this.close()
        }
      })
    },
    updateInsert(data) {
      if (this.actData.pk_act === undefined || this.actData.pk_act === '') {
        return insertAct(data)
      } else {
        return updateAct(data)
      }
    },
    updateActResult() {
      this.resultCount.push(this.actData.pk_resume)
      const obj = {
        pk_act: this.actData.pk_act,
        resultCount: this.resultCount.toLocaleString()
      }
      updateResult(obj)
    },
    verify() {
      // 校验
      if (this.active === 0) {
        return this.$refs.view1.verify()
      } else if (this.active === 1) {
        return true
      } else if (this.active === 3) {
        return true
      }
    }
  }
}
</script>

<style scoped>

</style>
