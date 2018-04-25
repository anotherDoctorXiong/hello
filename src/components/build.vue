<template>
  <div id="selecte">
    <el-row></el-row>
    <el-row>
    <template v-if="$store.state.user.author<3">
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
    <el-select v-model="distid" @change="dist_change()" placeholder="请选择县区">
      <el-option
        v-for="item in distlist"
        :key="item.id"
        :label="item.area"
        :value="item.areaid">
      </el-option>
    </el-select>
    <el-select v-model="comunity_id" @change="comunity_change()" placeholder="请选择小区">
      <el-option
        v-for="item in comunitylist"
        :key="item.id"
        :label="item.cName"
        :value="item.cId">
      </el-option>
    </el-select>
    <el-button type="text" @click="query_open()">查询</el-button>
    </template>
    <el-button type="text" @click="add_open()">添加</el-button>
      <el-button icon="el-icon-download" round><a href="/static/table/table_comunity.xlsx" download >下载模板</a></el-button>
      <el-button @click="upload=true" icon="el-icon-upload" round>批量上传</el-button>
    </el-row>
    <el-row></el-row>


    <el-table
      :data="buildlist"
      :height="600"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%">
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
        prop="bName"
        label="楼栋名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit_open(scope)" type="text" icon="el-icon-edit"></el-button>
          <el-button @click.native.prevent="build_delete(scope, buildlist)" type="text" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="back()" type="text" size="medium">上一页</el-button>
    <el-button @click="next()" type="text" size="medium">下一页</el-button>
    <el-dialog
      title="添加楼栋"
      :visible.sync="add"
      width="25%">
      <el-row>
        <el-col :span="20">
          <template v-if="$store.state.user.author<3">
          <el-row>
            <el-select v-model="provinceid" @change="province_change()" placeholder="请选择省市">
              <el-option
                v-for="item in provincelist"
                :key="item.id"
                :label="item.province"
                :value="item.provinceid">
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <el-select v-model="cityid" @change="city_change()" placeholder="请选择城市或辖区">
              <el-option
                v-for="item in citylist"
                :key="item.id"
                :label="item.city"
                :value="item.cityid">
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <el-select v-model="distid" @change="dist_change()" placeholder="请选择县区">
              <el-option
                v-for="item in distlist"
                :key="item.id"
                :label="item.area"
                :value="item.areaid">
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <el-select v-model="comunity_id" @change="comunity_change()" placeholder="请选择小区">
              <el-option
                v-for="item in comunitylist"
                :key="item.id"
                :label="item.cName"
                :value="item.cId">
              </el-option>
            </el-select>
          </el-row>
          </template>
          <el-row>
            <el-input  v-model="build"  style="width: 215px">
              <template slot="prepend">楼栋名</template></el-input>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="add = false">取 消</el-button>
    <el-button type="primary" @click="build_add()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑楼栋"
      :visible.sync="edit"
      width="25%">
      <el-row>
        <el-col :span="20">
            <el-row>
              <el-select v-model="province" @change="province_change()" :disabled="true" >
              </el-select>
            </el-row>
            <el-row>
              <el-select v-model="city" @change="city_change()"  :disabled="true">
              </el-select>
            </el-row>
            <el-row>
              <el-select v-model="dist" @change="dist_change()" :disabled="true">
              </el-select>
            </el-row>
            <el-row>
              <el-select v-model="comunity_name" @change="comunity_change()" :disabled="true">
              </el-select>
            </el-row>
            <el-row>
            <el-input  v-model="build" :disabled="true" style="width: 215px">
            <template slot="prepend">旧楼栋名</template></el-input>
            </el-row>
          <el-row>
            <el-input  v-model="newbuild"  style="width: 215px">
              <template slot="prepend">新楼栋名</template></el-input>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="edit = false">取 消</el-button>
    <el-button type="primary" @click="build_updata()">确 定</el-button>
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
        buildlist:[],
        provinceid:'',
        cityid:'',
        distid:'',
        province:'',
        city:'',
        dist:'',
        comunity:'',
        comunity_id:'',
        comunity_name:'',
        build:'',
        newbuild:'',
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
          _this.comunity_id=''
          _this.comunitylist=[]
          _this.build=''
          _this.buildlist=[]
          _this.unit=''
          _this.unitlist=[]
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
          _this.distid = ''
          _this.comunity_id=''
          _this.comunitylist=[]
          _this.build=''
          _this.buildlist=[]
          _this.unit=''
          _this.unitlist=[]
        }).catch(function (err) {
          console.log(err);
        })
      },
      dist_change() {
        this.dist = this.distlist.find(item => item.areaid === this.distid)['area']
        var _this = this;
        axios.get('/comunities', {
          params: {
            province: _this.province,
            city: _this.city,
            dist: _this.dist,
          }
        }).then(function (res) {
          _this.comunitylist = res.data;
          _this.comunity_id=''
          _this.build=''
          _this.buildlist=[]
          _this.unit=''
          _this.unitlist=[]
        }).catch(function (err) {
          console.log(err);
        })
      },
      comunity_change(){
        this.comunity_name=this.comunitylist.find(item => item.cId === this.comunity_id)['cName']
      },
      add_open(){
        if(this.auth.auth_add){
          this.build = ''
          this.add=true
        }else{
          this.$message({
            type: 'info',
            message: '没有添加权限'
          });
        }
      },
      query_open(){
        this.index=1
        this.build_query()
      },
      edit_open(scope) {
        if(this.auth.auth_edit){
          this.build = scope.row.bName
          this.comunity = scope.row.cId
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
      build_query() {
        var _this = this;
        axios.get('/buildlist', {
          params: {
            index:_this.index,
            province: _this.province,
            city: _this.city,
            dist: _this.dist,
            cId:_this.comunity_id
          }
        }).then(function (res) {
          _this.buildlist = res.data;
          if(res.status===200){
            _this.end=false
          }else
            _this.end=true
        }).catch(function (err) {
          console.log(err);
        })
      },
      build_add() {
        this.$confirm('添加一个小区信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if ( this.comunity_id == ''||this.build=='' ) {
            this.$message({
              type: 'info',
              message: '小区信息不完整，请完善小区信息'
            });
          } else {
            var _this = this;
            axios.post('/build', {
              cName: _this.comunity_name,
              cId: _this.comunity_id,
              bName:_this.build,
            }).then(function (res) {
              if (res.status === 200) {
                _this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                _this.build=''
                _this.build_query()
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
      build_updata() {
        this.$confirm('更新一个楼栋信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if (this.province == '' || this.city == '' || this.dist == '' || this.comunity_name == '' ) {
            this.$message({
              type: 'info',
              message: '信息不完整，请完善信息'
            });
          } else {
            var _this = this;
            axios.put('/build', {
              cId: _this.comunity,
              bName: _this.build,
              build:_this.newbuild
            }).then(function (res) {
              if (res.status === 200) {
                _this.$message({
                  type: 'success',
                  message: '已更新!'
                });
                _this.build_query()
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
      build_delete(scope, rows) {
        if(this.auth.auth_delete){
          this.$confirm('删除该小区信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var _this = this;
            axios.delete('/build', {
              params: {
                cId: scope.row.cId,
                bName:scope.row.bName
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
          this.build_query()
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
          this.build_query()
        }
      }
    },
    mounted(){

      this.auth.auth_add=store.state.auth.add
      this.auth.auth_edit=store.state.auth.edit
      this.auth.auth_delete=store.state.auth.delete
      if(store.state.user.author==3){
        this.comunity_id=store.state.auth.comunityid
        this.comunity_name=store.state.auth.comunity
        this.query_open()
      }
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
