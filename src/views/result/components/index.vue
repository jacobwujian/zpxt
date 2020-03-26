<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" :resume="resume" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="简历" name="account">
                <account :user="user" :resume="resume" />
              </el-tab-pane>
              <el-tab-pane label="工作经历" name="activity">
                <activity :resume="resume"/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './UserCard'
import Activity from './Activity'
import Account from './Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Account },
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
          pk_resume: null,
          pk_user: null,
          name: null,
          introduction: null,
          avatar: null
        }
      }
    }
  },
  data() {
    return {
      activeTab: 'account',
      sex: [{ name: '男', key: 'man' }, { name: '女', key: 'woman' }]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'introduction',
      'pk_user'
    ])
  },
  methods: {
  }
}
</script>
