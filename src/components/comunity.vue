<template>
  <div id="selecteare">
    <el-row></el-row>
    <el-row>
      <el-select v-model="provinceid" @change="province_change()" placeholder="请选择省市">
        <el-option
          v-for="item in provincelist"
          :key="item.id"
          :label="item.province"
          :value="item.provinceid">
        </el-option>
      </el-select>
      <el-select v-model="cityid" @change="city_change()" placeholder="请选择城市或辖区">
        <el-option
          v-for="item in citylist"
          :key="item.id"
          :label="item.city"
          :value="item.cityid">
        </el-option>
      </el-select>
      <el-select v-model="distid"  placeholder="请选择县区">
        <el-option
          v-for="item in distlist"
          :key="item.id"
          :label="item.area"
          :value="item.areaid">
        </el-option>
      </el-select>
      <el-button type="text" @click="query_open()">查询小区</el-button>
      <el-button type="text" @click="add_open()">添加小区</el-button>
      <el-button icon="el-icon-download" round><a href="/static/table/table_local.xlsx" download >下载模板</a></el-button>
      <el-button @click="upload=true" icon="el-icon-upload" round>批量上传</el-button>
    </el-row>
    <el-row></el-row>

    <el-table
      :data="comunitylist"
      :height="600"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="cId"
        label="小区编号"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="province"
        label="省"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="市">
      </el-table-column>
      <el-table-column
        align="center"
        prop="dist"
        label="县或辖区">
      </el-table-column>
      <el-table-column
        align="center"
        prop="cName"
        label="小区名字">
      </el-table-column>
      <el-table-column
        align="center"
        prop="cLocal"
        label="小区地址">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit_open(scope)" icon="el-icon-edit" type="text"></el-button>
          <el-button @click.native.prevent="comunity_delete(scope, comunitylist)" icon="el-icon-delete" type="text"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="back()" type="text" size="medium">上一页</el-button>
    <el-button @click="next()" type="text" size="medium">下一页</el-button>
    <el-dialog
      title="添加小区"
      :visible.sync="add"
      width="50%">
      <el-row>
        <el-col :span="10">
          <span style="font: 16px Medium;float: left; margin-left:90px;">区域选择</span><br><br>
      <el-select v-model="provinceid" @change="province_change()" placeholder="请选择省市">
        <el-option
          v-for="item in provincelist"
          :key="item.id"
          :label="item.province"
          :value="item.provinceid">
        </el-option>
      </el-select><br><br>
      <el-select v-model="cityid" @change="city_change()" placeholder="请选择城市或辖区">
        <el-option
          v-for="item in citylist"
          :key="item.id"
          :label="item.city"
          :value="item.cityid">
        </el-option>
      </el-select><br><br>
      <el-select v-model="distid"  placeholder="请选择县区">
        <el-option
          v-for="item in distlist"
          :key="item.id"
          :label="item.area"
          :value="item.areaid">
        </el-option>
      </el-select><br><br>
        </el-col>
        <el-col :span="14">
          <span style="font: 16px Medium;float: left; margin-left:90px;">小区信息</span><br><br>
          <el-input placeholder="请输入小区名称" v-model="comunity_name" style="width: 350px">
            <template slot="prepend">小区名称</template>
          </el-input><br><br>
          <el-input placeholder="请输入详细地址" v-model="comunity_local" style="width: 350px">
            <template slot="prepend">小区地址</template>
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="add = false">取 消</el-button>
    <el-button type="primary" @click="comunity_add()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑小区"
      :visible.sync="edit"
      width="50%">
      <el-row>
        <el-col :span="10">
          <span style="font: 16px Medium;float: left; margin-left:90px;">固定内容</span><br><br>
          <span class="l">省：&nbsp;&nbsp;{{province}}</span><br><br>
          <span class="l">市：&nbsp;&nbsp;{{city}}</span><br><br>
          <span class="l">区：&nbsp;&nbsp;{{dist}}</span>
        </el-col>
        <el-col :span="14">
          <span style="font: 16px Medium;float: left; margin-left:90px;">可更改内容</span><br><br>
          <el-input placeholder="请输入小区名称" v-model="comunity_name" style="width: 350px">
            <template slot="prepend">小区名称</template>
          </el-input><br><br>
          <el-input placeholder="请输入小区地址" v-model="comunity_local" style="width: 350px">
          <template slot="prepend">小区地址</template>
        </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="edit = false">取 消</el-button>
    <el-button type="primary" @click="comunity_updata()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="上传文件"
      :visible.sync="upload"
      width="50%">
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8080/api/v1/upload"
        :on-success="success"
        :on-error="error"
        :before-upload="beforeUpload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过1m</div>
      </el-upload>
    </el-dialog>
  </div>

</template>

<script>
  import store from "../vuex/store";
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8080/api/v1'
  export default {
    data() {
      return {
        provincelist:[],
        citylist:[],
        distlist:[],
        comunitylist:[],
        provinceid:'',
        cityid:'',
        distid:'',
        province:'',
        city:'',
        dist:'',
        comunity_id:'',
        comunity_name:'',
        comunity_local:'',
        index:'',
        end:false,
        add:false,
        edit:false,
        upload:false,
        auth:{
          auth_add:true,
          auth_edit:true,
          auth_delete:true,
        },
      }
    },
    methods: {
      province_change() {
        this.province = this.provincelist.find(item => item.provinceid === this.provinceid)['province']
        var _this = this;
        axios.get('/cities', {
          params: {
            provinceid: _this.provinceid
          }
        }).then(function (res) {
          _this.citylist = res.data;
          _this.cityid=''
          _this.distid = ''
          _this.distlist=[]
        }).catch(function (err) {
          console.log(err);
        })
        //console.log(this.option1.find(item => item.provinceid === this.value)['province'])
      },
      city_change() {
        this.city = this.citylist.find(item => item.cityid === this.cityid)['city']
        var _this = this;
        axios.get('/dists', {
          params: {
            cityid: _this.cityid
          }
        }).then(function (res) {
          _this.distlist = res.data;
          _this.distid=''
        }).catch(function (err) {
          console.log(err);
        })
      },

      query_open(){
        this.index=1
        this.comunity_query()
      },
      edit_open(scope) {
        if(this.auth.auth_edit){
          this.comunity_id = scope.row.cId
          this.comunity_local = scope.row.cLocal
          this.comunity_name = scope.row.cName
          this.province = scope.row.province
          this.city = scope.row.city
          this.dist = scope.row.dist
          this.edit = true
        }else{
          this.$message({
            type: 'info',
            message: '没有变更权限'
          });
        }

      },
      add_open(){
        if(this.auth.auth_add){
          this.comunity_name=''
          this.comunity_local=''
          this.add=true
        }else{
          this.$message({
            type: 'info',
            message: '没有添加权限'
          });
        }
      },
      comunity_query() {
        var _this = this;
        axios.get('/comunitylist', {
          params: {
            index:_this.index,
            province: _this.province,
            city: _this.city,
            dist: _this.dist,
          }
        }).then(function (res) {
          _this.comunitylist = res.data;
          if(res.status===200){
            _this.end=false
          }else
            _this.end=true
        }).catch(function (err) {
          console.log(err);
        })
      },
      comunity_add() {
        this.$confirm('添加一个小区信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if (this.province == '' || this.city == '' || this.dist == '' || this.comunity_name == '' || this.comunity_local == '') {
            this.$message({
              type: 'info',
              message: '小区信息不完整，请完善小区信息'
            });
          } else {
            var _this = this;
            axios.post('/comunity', {
              province: _this.province,
              city: _this.city,
              dist: _this.dist,
              cName: _this.comunity_name,
              cLocal: _this.comunity_local,
            }).then(function (res) {
              if (res.status === 200) {
                _this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                _this.comunity_local=''
                _this.comunity_name=''
                _this.add = false
              } else {
                _this.$message({
                  type: 'info',
                  message: '该小区已经存在!'
                });
              }
            }).catch(function (err) {
              _this.$message({
                type: 'warnings',
                message: '添加失败!'
              });
              _this.add = false
            })
          }

        }).catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '已取消添加'
          });
        });
      },
      comunity_updata() {
        this.$confirm('更新一个小区信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if ( this.comunity_name == '' || this.comunity_local == '') {
            this.$message({
              type: 'info',
              message: '信息不完整，请完善信息'
            });
          } else {
            var _this = this;
            axios.put('/comunity', {
              cId: _this.comunity_id,
              cLocal: _this.comunity_local,
              cName: _this.comunity_name,
              province: _this.province,
              city: _this.city,
              dist: _this.dist,
            }).then(function (res) {
              if (res.status === 200) {
                _this.$message({
                  type: 'success',
                  message: '已更新!'
                });
                _this.comunity_local=''
                _this.comunity_name=''
                _this.comunity_query()
                _this.edit = false
              } else {
                _this.$message({
                  type: 'info',
                  message: '请勿重复提交!'
                });
              }
            }).catch(function (err) {
              _this.$message({
                type: 'warnings',
                message: '更新失败!'
              });
              _this.edit = false
            })
          }

        }).catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      comunity_delete(scope, rows) {
        if(this.auth.auth_delete){
          this.$confirm('删除该小区信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var _this = this;
            axios.delete('/comunity', {
              params: {
                cId: scope.row.cId
              }
            }).then(function (res) {
              if (res.status === 200) {
                rows.splice(scope.$index,1)
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else{
                _this.$message({
                  type: 'info',
                  message: '删除失败!'
                });
              }
            }).catch(function (err) {
              console.log(err);
            })
          }).catch(() => {
          });
        }else{
          this.$message({
            type: 'info',
            message: '没有删除权限'
          });
        }

      },
      success(res, file) {
          this.$message({
            type: 'success',
            message: '上传成功'
          });
        this.upload=false
      },
      error(res, file){
        this.$message({
          type: 'info',
          message: '核对格式'
        });
        this.upload=false
      },
      beforeUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!');
        }
        return isLt1M;
      },

      back(){
        console.log(this.index)
        if(this.index>1){
          this.index-=1
          this.comunity_query()
        }else{
          this.$message({
            message: '这是第一页',
            type: 'info'
          });
        }
      },
      next(){
        console.log(this.index)
        if(this.end=true){
          this.$message({
            message: '已经是最后一页',
            type: 'info'
          });
        }else{
          this.index+=1
          this.comunity_query()
        }
      }
      },
      mounted(){
        this.auth.auth_add=store.state.auth.add
        this.auth.auth_edit=store.state.auth.edit
        this.auth.auth_delete=store.state.auth.delete
        var _this = this;
        axios.get('/provinces', {}).then(function (res) {
          _this.provincelist = res.data;
          _this.index=1
        }).catch(function (err) {
          console.log(err);
        })
      }

  }
</script>

<style>
  .l{
    font: 16px Medium;
    float: left;
    margin-left:90px;
  }
  a {
    text-decoration:none ;
    out-line: none;
    blink:none;
    color:#333
  }
</style>
