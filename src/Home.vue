<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      v-model="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" v-if="identity">我的容器</el-menu-item>
      <el-menu-item index="1" v-if="!identity">所有容器</el-menu-item>
      <el-menu-item index="2">申请容器</el-menu-item>
      <el-menu-item index="3" :disabled="!identity">消息中心<el-badge is-dot v-if="ifNew"></el-badge></el-menu-item>
      <el-menu-item index="4" :disabled="identity">申请列表</el-menu-item>
      <el-menu-item style="float: right" @click="logout">登出</el-menu-item>
      <el-menu-item style="float: right" @click="nope">{{username}}</el-menu-item>
    </el-menu>
    <el-main>
      <services v-if="activeIndex==='1'"></services>
      <apply v-if="activeIndex==='2'"></apply>
      <news v-if="activeIndex==='3'" @childFn="parentFn"></news>
      <application-list v-if="activeIndex==='4'"></application-list>
    </el-main>
  </div>

</template>

<script>
import Apply from './components/Apply'
import Services from './components/Services'
import ApplicationList from './components/ApplicationList'
import News from './components/News'
export default {
  name: 'Home',
  components: {News, ApplicationList, Services, Apply},
  data () {
    return {
      activeIndex: '1',
      identity: false,
      username: '',
      ifNew: false
    }
  },
  mounted () {
    this.identity = localStorage.getItem('identity') !== '1'
    this.username = localStorage.getItem('username')
    this.axios({
      method: 'post',
      url: 'http://10.251.253.81:8000/service/allMyMessages',
      data: {
        userId: localStorage.getItem('userid')
      }
    })
      .then(res => {
        const { data } = res
        if (data.message === 'success') {
          if (data.data.length > 0) {
            this.ifNew = true
          }
        } else {
          this.$message.success('错误！')
        }
      })
      .catch(() => {})
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = key
    },
    logout () {
      localStorage.removeItem('userid')
      localStorage.removeItem('username')
      localStorage.removeItem('identity')
      localStorage.removeItem('name')
      localStorage.clear()
      this.$message.success('登出成功！')
      this.$router.push('/')
    },
    nope () {
      alert('DO NOT TOUCH')
      this.activeIndex = '1'
    },
    parentFn (payload) {
      this.ifNew = payload
    }
  }
}
</script>

<style scoped>

</style>
