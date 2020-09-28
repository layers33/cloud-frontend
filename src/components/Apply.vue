<template>
  <el-container>
    <el-main>
      <div class="cell">
        <span class="chevron">&nbsp;›&nbsp;</span> 申请容器
      </div>
      <el-row>
        <i class="el-icon-circle-plus" style="float: left;margin-left: 50px;margin-top: 12px"></i>
        <span style="float: left;margin-top: 8px">请选择一个您需要的镜像</span>
        <el-select v-model="value" placeholder="请选择" style="float: left">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <i class="el-icon-circle-plus" style="float: left;margin-left: 50px;margin-top: 12px"></i>
        <span style="float: left;margin-top: 8px">请选择您需要的副本数Replicas</span>
        <el-input-number size="mini" v-model="num" @change="handleChange" :min="1" :max="6" style="float: left;margin-top: 7px"></el-input-number>
      </el-row>
      <el-row style="margin-top: 5px">
        <i class="el-icon-circle-plus" style="float: left;margin-left: 50px;margin-top: 12px"></i>
        <span style="float: left;margin-top: 8px">请填写名称</span>
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable
          size="mini"
          maxlength="20"
          show-word-limit
          style="width: 200px;float: left;margin-top: 6px">
        </el-input>
      </el-row>
      <el-row style="margin-top: 5px">
        <el-button round size="mini" style="float: left;margin-left: 200px" @click="handleClick">提交</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Apply',
  data () {
    return {
      options: [{
        value: 'mysql',
        label: 'MySql'
      }, {
        value: 'mongo',
        label: 'MongoDB'
      }, {
        value: 'nginx',
        label: 'Nginx'
      }, {
        value: 'redis',
        label: 'Redis'
      }, {
        value: 'centos',
        label: 'CentOS'
      }],
      value: '',
      num: 1,
      input: ''
    }
  },
  methods: {
    handleChange () {
      console.log(this.num)
    },
    handleClick () {
      if (!this.value) {
        this.$message.error('请选择所用镜像！')
      } else if (!this.input) {
        this.$message.error('请填写名称！')
      } else {
        this.axios({
          method: 'post',
          url: 'http://10.251.253.81:8000/service/apply',
          data: {
            userId: localStorage.getItem('userid'),
            image: this.value,
            replicas: this.num,
            serviceName: this.input
          }
        })
          .then(res => {
            const { data } = res
            console.log(data)
            if (data.message === 'success') {
              this.$message.success('申请成功！')
              this.$router.push('/home')
            } else {
              this.$message.error('申请失败！')
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style scoped>
  .box {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e2e2e2;
  }
  .cell {
    padding: 10px;
    font-size: 14px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
  }
</style>
