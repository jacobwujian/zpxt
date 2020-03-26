<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人介绍</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <el-image v-if="resume.picture" :src="'data:image/jepg;base64,' + resume.picture" class="avatar" lazy />
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ resume.name }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="star" /><span>个性签名</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <el-input v-model="user.introduction" type="textarea" :disabled="!isEdit" autosize />
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>技能</span>
        </div>
        <div class="user-skills user-bio-section-body">
          <el-tag
            v-for="tag in resume.skills"
            :key="tag"
            color="rgba(148, 102, 255, 0.17)"
            :hit="true"
            :disable-transitions="false"
          >
            {{ tag }}
          </el-tag></div>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
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
    },
    resume: {
      type: Object,
      default: () => {
        return {
          name: '',
          pk_user: ''
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .user-skills{
    height: 300px;
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
