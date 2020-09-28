<template>
  <section>
    <el-container>
      <el-main>
        <div class="cell">
          <span class="chevron">&nbsp;›&nbsp;</span> 我的消息
          <el-button style="float: right" size="mini" @click="clearAll">清空消息</el-button>
        </div>
        <el-row v-for="(item, key) in messageList" :key="key">
          <pre style="background-color: white;float: left;">{{item.message}}</pre>
          <br>
          <pre style="background-color: white;float: right;font-size: x-small">{{item.time}}</pre>
          <el-divider></el-divider>
        </el-row>
      </el-main>
    </el-container>
  </section>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      messageList: []
    }
  },
  created () {
    this.axios({
      method: 'post',
      url: 'http://10.251.253.81:8000/service/allMyMessages',
      data: {
        userId: localStorage.getItem('userid')
      }
    })
      .then(res => {
        const { data } = res
        this.messageList = data.data
        for (var i = 0; i < this.messageList.length; i++) {
          this.messageList[i].time = this.messageList[i].time.slice(0, 10) + ' ' + this.messageList[i].time.slice(11, 19)
        }
        console.log(data)
        if (data.message === 'success') {
        } else {
          this.$message.success('错误！')
        }
      })
      .catch(() => {})
  },
  methods: {
    clearAll () {
      this.axios({
        method: 'post',
        url: 'http://10.251.253.81:8000/service/deleteAllMyMessage',
        data: {
          userId: localStorage.getItem('userid')
        }
      })
        .then(res => {
          const { data } = res
          if (data.message === 'success') {
            this.$message.success('成功！')
            this.messageList = []
            this.$emit('childFn', false)
          } else {
            this.$message.error('错误！')
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
  .cell {
    padding: 10px;
    font-size: 14px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
  }
</style>
