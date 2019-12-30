<template>
  <div style="height: 700px">
    <div class="touxang">
      <img>
    </div>
    <span>
      <label>姓名</label>
      <el-input v-model.trim="user.name" class="elforminput" size="mini" />
    </span>
    <span>
      <label>性别</label>
      <el-select
        v-model="user.sale"
        size="mini"
        placeholder="账号类型"
        class="elforminput"
      >
        <el-option v-for="item in sex" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
    </span>
    <span>
      <label>年龄</label>

      <el-input-number
        id="inputNumber"
        v-model="user.age"
        :controls="false"
        :precision="0"
        :step="1"
        :min="1"
        size="mini"
        class="elforminput"
        @change="numberChange"
        @blur="numberBlur"
      />
    </span>
    <span>
      <label>邮箱</label>
      <el-input v-model.trim="user.email" class="elforminput" size="mini" style="width: 200px" />
    </span>
    <br>
    <br>
    <span>
      <label>电话</label>
      <el-input v-model.trim="user.name" class="elforminput" size="mini" />
    </span>
    <span>
      <label>意向城市</label>
      <el-cascader
        v-model="city"
        :options="option"
        :props="{ expandTrigger: 'hover' }"
      />
    </span>
    <span>
      <label>意向职位</label>
      <el-input v-model.trim="user.email" class="elforminput" size="mini" style="width: 200px" />
    </span>
    <br>
    <el-button type="warning" class="footer" @click="submit">编辑</el-button>
    <el-button type="success" class="footer" @click="submit">确定</el-button>
    <el-button class="footer" @click="submit">取消</el-button>
  </div>
</template>

<script>
import { updateUser } from '../../../api/user'
import Option from '../../../../public/city'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          pk_user: '',
          sale: '',
          age: ''
        }
      }
    }
  },
  data() {
    return {
      sex: [{ name: '男', key: 'man' }, { name: '女', key: 'woman' }],
      ageOld: '',
      currentValue: '',
      city: '',
      option: Option.city
    }
  },
  mounted() {
    console.log(Option)
    console.log(Option.city)
  },
  methods: {
    submit() {
      const obj = {
        name: this.user.name,
        pk_user: this.user.pk_user,
        sale: this.sale
      }
      updateUser(obj).then(response => {
        console.log(response)
        this.$message({
          message: 'User information has been updated successfully',
          type: 'success',
          duration: 5 * 1000
        })
      })
    },
    numberChange(currentValue, oldValue) {
      if (currentValue === undefined) {
        this.ageOld = oldValue
        this.currentValue = undefined
      } else {
        this.ageOld = currentValue
        this.currentValue = currentValue
      }
    },
    numberBlur() {
      if (this.currentValue === undefined) {
        let inp = document.getElementById('inputNumber')
        inp = inp.getElementsByTagName('input')[0]
        inp.value = this.ageOld
      }
    }
  }
}
</script>
<style>
  .touxang{
    float: right;
    width: 120px;
    height: 120px;
    background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577268408961&di=6f52397122a06a71892e56510065a0cf&imgtype=0&src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F77547531.jpeg");
    background-size: contain;
  }
.footer{
  margin: 30px;
  position: relative;
  left: 40%;
}
  .elforminput{
    width: 80px;
    margin-right: 20px;
  }
</style>
