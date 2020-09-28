<template>
  <el-container>
    <el-main>
      <div class="cell" v-if="identity">
        <span class="chevron">&nbsp;›&nbsp;</span> 我的容器
      </div>
      <div class="cell" v-if="!identity">
        <span class="chevron">&nbsp;›&nbsp;</span> 所有用户所有容器
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
        <el-table-column prop="username" label="用户名" v-if="!identity"></el-table-column>
        <el-table-column prop="Name" label="服务名"></el-table-column>
        <el-table-column prop="Image" label="镜像"></el-table-column>
        <el-table-column prop="Replicas" label="Replicas"></el-table-column>
        <el-table-column prop="IP" label="IP"></el-table-column>
        <el-table-column prop="PublishedPort" label="端口"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="scale(scope.row)" type="text" size="small"
            >伸缩
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      title="选择新的Replicas"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input-number size="mini" v-model="num" :min="1" :max="6"></el-input-number>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Services',
  data () {
    return {
      DList: [],
      struct: {
        username: '',
        Name: '',
        Image: '',
        Replicas: '',
        PublishedPort: '',
        IP: '10.251.253.81',
        serviceId: ''
      },
      identity: true,
      dialogVisible: false,
      num: 0,
      service: ''
    }
  },
  mounted () {
    this.identity = localStorage.getItem('identity') !== '1'
    this.axios({
      method: 'post',
      url: this.identity === true ? 'http://10.251.253.81:8000/service/allMyServices' : 'http://10.251.253.81:8000/service/allServices',
      data: {
        userId: localStorage.getItem('userid')
      }
    })
      .then(res => {
        const { data } = res
        console.log(data)
        if (data.message === 'success') {
          for (var i = 0; i < data.data.length; i++) {
            if (this.identity === false) {
              this.struct.username = data.data[i].username
              this.struct.Name = data.data[i].service.Spec.Name.slice(data.data[i].service.Spec.Name.indexOf('-') + 1)
              this.struct.Image = data.data[i].service.Spec.TaskTemplate.ContainerSpec.Image
              this.struct.Replicas = data.data[i].service.Spec.Mode.Replicated.Replicas
              this.struct.PublishedPort = data.data[i].service.Spec.EndpointSpec.Ports[0].PublishedPort
              this.struct.serviceId = data.data[i].service.ID
            } else {
              this.struct.Name = data.data[i].Spec.Name.slice(data.data[i].Spec.Name.indexOf('-') + 1)
              this.struct.Image = data.data[i].Spec.TaskTemplate.ContainerSpec.Image
              this.struct.Replicas = data.data[i].Spec.Mode.Replicated.Replicas
              this.struct.PublishedPort = data.data[i].Spec.EndpointSpec.Ports[0].PublishedPort
              this.struct.serviceId = data.data[i].ID
            }
            this.DList.push(this.struct)
            this.struct = {
              username: '',
              Name: '',
              Image: '',
              Replicas: '',
              PublishedPort: '',
              IP: '10.251.253.81',
              serviceId: ''
            }
          }
        } else {
          this.$message.error('失败！')
        }
      })
      .catch(() => {})
  },
  methods: {
    scale (attr) {
      console.log(attr.serviceId)
      this.dialogVisible = true
      this.num = attr.Replicas
      this.service = attr.serviceId
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    confirm () {
      this.dialogVisible = false
      this.axios({
        method: 'post',
        url: 'http://10.251.253.81:8000/service/scale',
        data: {
          serviceId: this.service,
          replicas: this.num
        }
      })
        .then(res => {
          const { data } = res
          if (data.message === 'success') {
            this.$message.success('伸缩中，请等待片刻刷新')
          } else {
            this.$message.error('失败！')
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
