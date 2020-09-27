<template>
  <section :key="ifReload">
    <el-container>
      <el-main>
        <div class="cell">
          <span class="chevron">&nbsp;›&nbsp;</span> 申请列表
        </div>
        <b-table
          :data="applicationList"
          :columns="columns"
          :checked-rows.sync="checkedRows"
          checkable
          checkbox-position="right"
        >
          <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedRows.length }}
          </template>
        </b-table>
        <b-field
          grouped
          group-multiline
          style="float: right;"
        >
          <button class="button field is-success" @click="apply(1)">
            <b-icon icon="check"></b-icon>
            <span>通过选中的申请</span>
          </button>
          <button class="button field is-danger" @click="apply(0)">
            <b-icon icon="close"></b-icon>
            <span>拒绝选中的申请</span>
          </button>
        </b-field>
      </el-main>
    </el-container>
  </section>
</template>

<script>
export default {
  name: 'ApplicationList',
  data () {
    return {
      applicationList: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'userId',
          label: '用户名'
        },
        {
          field: 'serviceName',
          label: '服务名'
        },
        {
          field: 'image',
          label: 'Image',
          numeric: true
        },
        {
          field: 'replicas',
          label: 'replicas',
          numeric: true
        }
      ],
      checkedRows: [],
      tmpData: [],
      ifReload: 0
    }
  },
  mounted () {
    this.axios({
      method: 'post',
      url: 'http://10.251.253.81:8000/service/allApplications',
      data: {
      }
    })
      .then(res => {
        const { data } = res
        console.log(data)
        if (data.message === 'success') {
          this.applicationList = data.data
          this.tmpData = data.data
          for (var i = 0; i < this.applicationList.length; i++) this.applicationList[i].id = i + 1
        } else {
          this.$message.error('连接失败！')
        }
      })
      .catch(() => {})
  },
  methods: {
    apply (flag) {
      if (this.checkedRows.length === 0) {
        alert('没有选中的申请')
        return
      }
      var i = 0
      var tmpId = 0
      if (flag === 1) {
        for (i = 0; i < this.checkedRows.length; i++) {
          tmpId = this.checkedRows[i]._id
          this.tmpData = this.tmpData.filter(function (item) {
            return item._id !== tmpId
          })
          this.axios({
            method: 'post',
            url: 'http://10.251.253.81:8000/service/agree',
            data: {
              userId: this.checkedRows[i].userId,
              image: this.checkedRows[i].image,
              replicas: this.checkedRows[i].replicas,
              serviceName: this.checkedRows[i].serviceName
            }
          })
            .then(res => {
              const { data } = res
              if (data.message === 'success') {
              } else {
                this.$message.error('失败！')
              }
            })
            .catch(() => {})
        }
      } else if (flag === 0) {
        for (i = 0; i < this.checkedRows.length; i++) {
          tmpId = this.checkedRows[i]._id
          this.tmpData = this.tmpData.filter(function (item) {
            return item._id !== tmpId
          })
          this.axios({
            method: 'post',
            url: 'http://10.251.253.81:8000/service/refuse',
            data: {
              userId: this.checkedRows[i].userId,
              image: this.checkedRows[i].image,
              replicas: this.checkedRows[i].replicas,
              serviceName: this.checkedRows[i].serviceName
            }
          })
            .then(res => {
              const { data } = res
              if (data.message === 'success') {
              } else {
                this.$message.error('失败！')
              }
            })
            .catch(() => {})
        }
      }
      this.checkedRows = []
      alert('处理成功')

      this.applicationList = this.tmpData
      for (i = 0; i < this.applicationList.length; i++) this.applicationList[i].id = i + 1

      this.ifReload += 1
    }
  },
  watch: {
    ifReload () {
      console.log('change to' + this.ifReload)
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
