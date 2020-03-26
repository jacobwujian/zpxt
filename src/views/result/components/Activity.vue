<template>
  <div class="user-activity">
    <div v-if="resume!==undefined&&resume.works!==undefined&&resume.works.length !== 0">
      <div v-for="item in resume.works" class="post">
        <div class="user-block">
          <span class="username text-muted">公司：{{ item.companyName }}
            <span class="description">职位：{{ item.job }}</span>
            <span class="description">时间：{{ timeFormat(item.startTime) }}至{{ timeFormat(item.endTime) }}</span>
          </span></div>
        <p>
          {{ item.workIntroduction }}
        </p>
      </div>
    </div>
    <div v-else>
      <div class="post">
        <p style="font-size: 30px;margin-left: 40%">
          暂无工作经历.
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    resume: {
      type: Object,
      default: () => {
        return {
          pk_resume: null,
          pk_user: null,
          name: null,
          introduction: null,
          avatar: null,
          works: []
        }
      }
    }
  },
  data() {
    return {
      edit: true,
      addWorkShow: false,
      formLabelAlign: {
        companyName: '',
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
        job: '',
        workIntroduction: ''
      }
    }
  },
  methods: {
    clear() {
      this.formLabelAlign = {
        companyName: '',
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
        job: '',
        workIntroduction: ''
      }
    },
    timeFormat(time) {
      const date = new Date(time)
      return date.getFullYear() + '年' + date.getMonth() + 1 + '月' + date.getDate() + '日'
    }
  }
}
</script>

<style lang="scss" scoped>
  .add{
    padding: 0;
    margin-top: 0;
    margin-left: 49%;
    font-size: 30px;
  }
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 0;
    padding-bottom: 0;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
