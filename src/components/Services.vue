<template>
  <el-container>
    <el-main>
      <div class="cell">
        <span class="chevron">&nbsp;›&nbsp;</span> 我的容器
      </div>
      <div>
        <span style="float: right">MySQL默认用户名root,密码123456</span>
      </div>
      <el-table
        :data="DList"
        border
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column prop="Image" label="镜像"></el-table-column>
        <el-table-column prop="Replicas" label="Replicas"></el-table-column>
        <el-table-column prop="IP" label="IP"></el-table-column>
        <el-table-column prop="PublishedPort" label="端口"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Services',
  data () {
    return {
      DList: [],
      struct: {
        Image: '',
        Replicas: '',
        PublishedPort: '',
        IP: '10.251.253.81'
      }
    }
  },
  mounted () {
    this.axios({
      method: 'post',
      url: 'http://10.251.253.81:8000/service/allMyServices',
      data: {
        userId: localStorage.getItem('userid')
      }
    })
      .then(res => {
        const { data } = res
        console.log(data)
        if (data.message === 'success') {
          for (var i = 0; i < data.data.length; i++) {
            this.struct.Image = data.data[i].Spec.TaskTemplate.ContainerSpec.Image
            this.struct.Replicas = data.data[i].Spec.Mode.Replicated.Replicas
            this.struct.PublishedPort = data.data[i].Spec.EndpointSpec.Ports[0].PublishedPort
            this.DList.push(this.struct)
            this.struct = {
              Image: '',
              Replicas: '',
              PublishedPort: '',
              IP: '10.251.253.81'
            }
          }
        } else {
          this.$message.error('失败！')
        }
      })
      .catch(() => {})
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
