<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人基本信息" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="工作经历" name="activity">
                <activity />
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
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Account },
  data() {
    return {
      user: {},
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
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'wujian@yonyou.com',
        avatar: this.avatar,
        introduction: this.introduction,
        pk_user: this.pk_user,
        sale: 'man',
        age: 22
      }
    }
  }
}
</script>
