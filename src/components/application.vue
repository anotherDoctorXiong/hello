<template>
  <div>

    <el-table
      :data="applicationlist"
      :height="600"
      :highlight-current-row="true"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="cName"
        label="管理小区">
        <template slot-scope="scope">
          <span v-if="scope.row.cName==''">所有小区</span>
          <span v-else>{{scope.row.cName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="bName"
        label="管理楼栋">
        <template slot-scope="scope">
          <span v-if="scope.row.bName==''">所有楼栋</span>
          <span v-else>{{scope.row.bName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="uName"
        label="管理单元">
        <template slot-scope="scope">
          <span v-if="scope.row.uName==''">所有单元</span>
          <span v-else>{{scope.row.uName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="authAdd"
        label="添加权限">
        <template slot-scope="scope">
          <span v-if=scope.row.authAdd>有</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="authEdit"
        label="更改权限">
        <template slot-scope="scope">
          <span v-if=scope.row.authEdit>有</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="authDelete"
        label="删除权限">
        <template slot-scope="scope">
          <span v-if=scope.row.authDelete>有</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="update(scope)" icon="el-icon-circle-check-outline" type="text"></el-button>
          <el-button @click.native.prevent="reject(scope, applicationlist)" icon="el-icon-circle-close-outline" type="text"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="back()" type="text" size="medium">上一页</el-button>
    <el-button @click="next()" type="text" size="medium">下一页</el-button>
  </div>
</template>
<script>
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8080/api/v1'
  export default {
    data() {
      return {
        applicationlist:[],
        index:'',
        end:false
      }
    },
    methods:{
      update(scope) {
        var _this = this;
        this.$confirm('接受该用户的申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          axios.put('/user', {
            name:scope.row.name,
            cId:scope.row.cId,
            cName:scope.row.cName,
            bName:scope.row.bName,
            uName:scope.row.uName,
            authAdd:scope.row.authAdd,
            authEdit:scope.row.authEdit,
            authDelete:scope.row.authDelete,
          }).then(function (res) {
            if (res.status===200) {
              _this.$message({
                type: 'success',
                message: '变更成功!'
              });
              _this.user_query()
              _this.edit = false
            }
          }).catch(function (err) {
            console.log("失败")
          })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
      reject(scope, rows){
        this.$confirm('拒绝该用户的申请', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          axios.delete('/user/application', {
            params: {
              name: scope.row.name
            }
          }).then(function (res) {
            if (res.status === 200) {
              rows.splice(scope.$index,1)
            }
          }).catch(function (err) {
            console.log(err);
          })
        }).catch(() => {
        });
      },
      application(){
        var _this = this;
        axios.get('/user/application', {
          params: {
            index:_this.index,
          }
        }).then(function (res) {
          _this.applicationlist = res.data;
          if(res.status===200){
            _this.end=false
          }else
            _this.end=true
        }).catch(function (err) {
          console.log(err);
        })
      },
      back(){
        console.log(this.index)
        if(this.index>1){
          this.index-=1
          this.user_query()
        }else{
          this.$message({
            message: '这是第一页',
            type: 'info'
          });
        }
      },
      next(){

        if(this.end===true){
          this.$message({
            message: '已经是最后一页',
            type: 'info'
          });
        }else{
          this.index+=1
          this.user_query()
        }
      },
    },
    mounted(){
      var _this = this;
      axios.get('/user/application', {
        params: {
          index:1,
        }
      }).then(function (res) {
        _this.applicationlist = res.data;
        if(res.status===200){
          _this.end=false
        }else
          _this.end=true
      }).catch(function (err) {
        console.log(err);
      })
    }

  }
</script>
