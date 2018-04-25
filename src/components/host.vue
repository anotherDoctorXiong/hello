<template>
  <div id="selecteare">

    <el-row></el-row>
    <el-row>
    <template v-if="$store.state.user.author<5">
      <template v-if="$store.state.user.author<4">
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
        </template>
        <el-select v-model="build"   @change="build_change()" placeholder="请选择楼栋">
          <el-option
            v-for="item in buildlist"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </template>
      <el-select v-model="unit"  placeholder="请选择单元">
        <el-option
          v-for="item in unitlist"
          :key="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="text" @click="query_open()">查询</el-button>
    </template>
    <el-button type="text" @click="add_open()">添加</el-button>
    </el-row>
    <el-row></el-row>


    <el-table
      :data="hostlist"
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
        prop="uName"
        label="单元名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="hId"
        label="房屋编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="hName"
        label="房屋名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit_open(scope)" type="text" icon="el-icon-edit"></el-button>
          <el-button @click.native.prevent="host_delete(scope, hostlist)" type="text" icon="el-icon-delete"></el-button>
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
      <template v-if="$store.state.user.author<5">
        <template v-if="$store.state.user.author<4">
          <template v-if="$store.state.user.author<3">
            <el-row><el-select v-model="provinceid" @change="province_change()" placeholder="请选择省市">
        <el-option
          v-for="item in provincelist"
          :key="item.id"
          :label="item.province"
          :value="item.provinceid">
        </el-option>
            </el-select></el-row>
              <el-row><el-select v-model="cityid" @change="city_change()" placeholder="请选择城市或辖区">
        <el-option
          v-for="item in citylist"
          :key="item.id"
          :label="item.city"
          :value="item.cityid">
        </el-option>
              </el-select></el-row>
                <el-row><el-select v-model="distid" @change="dist_change()" placeholder="请选择县区">
        <el-option
          v-for="item in distlist"
          :key="item.id"
          :label="item.area"
          :value="item.areaid">
        </el-option>
                </el-select></el-row>
                  <el-row><el-select v-model="comunity_id" @change="comunity_change()" placeholder="请选择小区">
        <el-option
          v-for="item in comunitylist"
          :key="item.id"
          :label="item.cName"
          :value="item.cId">
        </el-option>
                  </el-select></el-row>
          </template>
          <el-row><el-select v-model="build"  @change="build_change()" placeholder="请选择楼栋">
        <el-option
          v-for="item in buildlist"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
          </el-select></el-row>
        </template>
        <el-row><el-select v-model="unit" placeholder="请选择单元">
        <el-option
          v-for="item in unitlist"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
        </el-select></el-row>
      </template>
          <el-row>
            <el-input placeholder="请输入房屋编号" v-model="host_id" style="width: 215px">
              <template slot="prepend">房屋编号</template>
            </el-input></el-row>
          <el-row>
            <el-input placeholder="请输入房屋名称" v-model="host_name" style="width: 215px">
              <template slot="prepend">房屋名称</template>
            </el-input>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="add = false">取 消</el-button>
    <el-button type="primary" @click="host_add()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑单元"
      :visible.sync="edit"
      width="50%">
      <el-row>
        <el-col :span="10">
          <el-row>
            <el-select v-model="province"  :disabled="true" >
            </el-select>
          </el-row>
          <el-row>
            <el-select v-model="city"   :disabled="true">
            </el-select>
          </el-row>
          <el-row>
            <el-select v-model="dist"  :disabled="true">
            </el-select>
          </el-row>
          <el-row>
            <el-select v-model="comunity_name"  :disabled="true">
            </el-select>
          </el-row>
          <el-row>
            <el-select v-model="build1"  :disabled="true">
            </el-select>
          </el-row>
          <el-row>
            <el-select v-model="unit1"  :disabled="true">
            </el-select>
          </el-row>
        </el-col>
        <el-col :span="14">
          <el-row>
            <el-input  v-model="host_id" :disabled="true" style="width: 350px">
              <template slot="prepend">旧房屋编号</template></el-input>
          </el-row>
          <el-row>
            <el-input  v-model="host_name" :disabled="true" style="width: 350px">
              <template slot="prepend">旧房屋名称</template></el-input>
          </el-row>
          <el-row>
            <el-input  v-model="newhost_id" style="width: 350px">
              <template slot="prepend">新房屋编号</template></el-input>
          </el-row>
          <el-row>
            <el-input  v-model="newhost_name"  style="width: 350px">
              <template slot="prepend">新房屋名称</template></el-input>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="edit = false">取 消</el-button>
    <el-button type="primary" @click="host_updata()">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios'
  import store from "../vuex/store";
  axios.defaults.baseURL = 'http://localhost:8080/api/v1'
  export default {
    data() {
      return {
        provincelist:[],
        citylist:[],
        distlist:[],
        comunitylist:[],
        buildlist:[],
        unitlist:[],
        hostlist:[],
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
        build1:'',
        unit:'',
        unit1:'',
        host_id:'',
        host_name:'',
        newhost_id:'',
        newhost_name:'',
        index:'',
        end:false,
        add:false,
        edit:false,
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
          _this.city=''
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
        if(store.state.user.author<3){
          this.comunity_name=this.comunitylist.find(item => item.cId === this.comunity_id)['cName']
        }
        var _this = this;
        axios.get('/builds', {
          params: {
            comunity_id:_this.comunity_id
          }
        }).then(function (res) {
          _this.buildlist = res.data;
          _this.build=''
          _this.unit=''
          _this.unitlist=[]
        }).catch(function (err) {
          console.log(err);
        })
      },
      build_change(){
        var _this = this;
        axios.get('/units', {
          params: {
            comunity_id:_this.comunity_id,
            build_name:_this.build,
          }
        }).then(function (res) {
          _this.unitlist = res.data;
          _this.unit=''
        }).catch(function (err) {
          console.log(err);
        })
      },
      add_open(){
        if(this.auth.auth_add){
          this.host_id = ''
          this.host_name = ''
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
        this.host_query()
      },
      edit_open(scope) {
        if(this.auth.auth_edit){
          this.host_name=scope.row.hName
          this.host_id=scope.row.hId
          this.unit1=scope.row.uName
          this.build1 = scope.row.bName
          this.comunity_name=scope.row.cName
          this.comunity = scope.row.cId
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
      host_query() {
        var _this = this;
        axios.get('/hostlist', {
          params: {
            index:_this.index,
            province: _this.province,
            city: _this.city,
            dist: _this.dist,
            cId:_this.comunity_id,
            bName:_this.build,
            uName:_this.unit,
          }
        }).then(function (res) {
          _this.hostlist = res.data;
          if(res.status===200){
            _this.end=false
          }else
            _this.end=true
        }).catch(function (err) {
          console.log(err);
        })
      },
      host_add() {
        this.$confirm('添加一个房屋信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if (this.comunity_id == ''||this.build==''
            ||this.unit=='' ||this.host_id==''||this.host_name=='') {
            this.$message({
              type: 'info',
              message: '房屋信息不完整，请完善房屋信息'
            });
          } else {
            var _this = this;
            axios.post('/host', {
              cName: _this.comunity_name,
              cId: _this.comunity_id,
              bName:_this.build,
              uName:_this.unit,
              hId:_this.host_id,
              hName:_this.host_name,
            }).then(function (res) {
              if (res.status === 200) {
                _this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                _this.host_query()
                _this.add = false
              } else {
                _this.$message({
                  type: 'info',
                  message: '该房屋已经存在!'
                });
              }
            }).catch(function (err) {
              _this.$message({
                type: 'warnings',
                message: '添加失败!'
              });
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
      host_updata() {
        if(this.auth.auth_delete) {
          this.$confirm('更新一个房屋信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            if (this.province == '' || this.city == '' || this.dist == '' || this.comunity_name == '' || this.build1 == '' || this.unit1 == ''
              || this.newhost_id == '' || this.newhost_name == '') {
              this.$message({
                type: 'info',
                message: '信息不完整，请完善信息'
              });
            } else {
              var _this = this;
              axios.put('/host', {
                cId: _this.comunity,
                bName: _this.build1,
                uName: _this.unit1,
                hId: _this.host_id,
                hName: _this.host_name,
                hostId: _this.newhost_id,
                hostName: _this.newhost_name,
              }).then(function (res) {
                if (res.status === 200) {
                  _this.$message({
                    type: 'success',
                    message: '已更新!'
                  });
                  _this.host_query()
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
        }else{
          _this.$message({
            type: 'info',
            message: '没有删除权限'
          });
        }
      },
      host_delete(scope, rows) {
        this.$confirm('删除该房屋信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          axios.delete('/host', {
            params: {
              cId: scope.row.cId,
              bName:scope.row.bName,
              uName:scope.row.uName,
              hId:scope.row.hId,
              hName:scope.row.hName,
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
      },

      back(){
        console.log(this.index)
        if(this.index>1){
          this.index-=1
          this.host_query()
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
          this.host_query()
        }
      }
    },
    mounted(){
      console.log(store.state)
      this.auth.auth_add=store.state.auth.add
      this.auth.auth_edit=store.state.auth.edit
      this.auth.auth_delete=store.state.auth.delete
      if(store.state.user.author==3){
        this.comunity_id=store.state.auth.comunityid
        this.comunity_name=store.state.auth.comunity
        this.comunity_change()
      }else if(store.state.user.author==4){
        this.comunity_id=store.state.auth.comunityid
        this.comunity_name=store.state.auth.comunity
        this.build=store.state.auth.build
        this.build_change()
      }else if(store.state.user.author==5){
        this.comunity_id=store.state.auth.comunityid
        this.comunity_name=store.state.auth.comunity
        this.build=store.state.auth.build
        this.unit=store.state.auth.unit
        this.host_query()
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
