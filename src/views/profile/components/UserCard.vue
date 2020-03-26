<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人介绍</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>你好</div>
          {{ user.name }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="star" /><span>个性签名</span>
          <span>
            <el-button v-if="!isEdit" type="text" icon="el-icon-edit" @click="isEdit = true" />
            <el-button v-if="isEdit" type="text" icon="el-icon-close" @click="isEdit = false" />
            <el-button v-if="isEdit" type="text" icon="el-icon-check" @click="update" />
          </span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <el-input v-model="user.introduction" type="textarea" :disabled="!isEdit" autosize />
          </div>
        </div>
      </div>
      <el-dialog
        title="增加技能"
        :visible.sync="skillShow"
        width="30%"
        :before-close="handleClose"
      >
        <el-select
          v-model="chooseSkill"
          placeholder="技能"
        >
          <el-option v-for="item in skillsRef" :key="item.pk_ref" :label="item.name" :value="item.name" :disabled="skills.indexOf(item.name) !== -1" />
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="skillShow = false;chooseSkill = ''">取 消</el-button>
          <el-button :disabled="chooseSkill === ''" type="primary" @click="addSkill">确 定</el-button>
        </span>
      </el-dialog>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>技能</span>
          <span>
            <el-button v-if="!isEditSkill" type="text" icon="el-icon-plus" @click="skillShow = true" />
          </span></div>
        <div class="user-skills user-bio-section-body">
          <el-tag
            v-for="tag in skills"
            :key="tag"
            closable
            color="rgba(148, 102, 255, 0.17)"
            :hit="true"
            :disable-transitions="false"
            @close="handleDelete(tag)"
          >
            {{ tag }}
          </el-tag></div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { updateUser } from '../../../api/user'
import { getSkills, updateSkills } from '../../../api/resume'
import { getRef } from '../../../api/ref'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: '',
          pk_user: '',
          introduction: ''
        }
      }
    }
  },
  data() {
    return {
      isEdit: false,
      isEditSkill: false,
      value1: 10,
      skills: [],
      dialogVisible: false,
      skillShow: false,
      skillsRef: [],
      chooseSkill: ''
    }
  },
  mounted() {
    this.getSkill()
    getRef({ type: 3 }).then(response => {
      this.skillsRef = response.data
    })
  },
  methods: {
    addSkill() {
      this.skills.push(this.chooseSkill)
      this.chooseSkill = ''
      this.skillShow = false
      updateSkills({ skills: this.skills.toLocaleString() }).then(response => {
        this.$message({
          type: 'success',
          message: '增加成功!'
        })
      }).catch(err => {
        this.getSkill()
        this.$message({
          type: 'danger',
          message: '增加失败!'
        })
      })
    },
    handleDelete(done, tag) {
      this.$confirm('是否删除该标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.skills.splice(this.skills.indexOf(tag), 1)
        updateSkills({ skills: this.skills.toLocaleString() }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(err => {
          this.getSkill()
          this.$message({
            type: 'danger',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.chooseSkill = ''
        })
        .catch(_ => {})
    },
    getSkill() {
      getSkills().then(response => {
        if (response.data === '') {
          this.skills = []
        } else {
          this.skills = response.data.split(',')
        }
      })
    },
    update() {
      this.isEdit = false
      const obj = {
        introduction: this.user.introduction,
        pk_user: this.user.pk_user
      }
      updateUser(obj).then(response => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-skills{
    height: 260px;
    overflow: auto;
  }

  .el-tag + .el-tag {
    margin-top: 10px;
    display: block;
  }
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: rgba(148, 102, 255, 0.17);
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
