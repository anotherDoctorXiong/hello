<template>
  <div id="author">
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
       <el-select v-model="distid" @change="dist_change()" placeholder="请选择县区">
         <el-option
           v-for="item in distlist"
           :key="item.id"
           :label="item.area"
           :value="item.areaid">
         </el-option>
       </el-select>
       <el-select v-model="user.comunity_id" @change="comunity_change()" placeholder="请选择小区">
      <el-option
        v-for="item in comunitylist"
        :key="item.id"
        :label="item.cName"
        :value="item.cId">
      </el-option>
    </el-select>
       <el-button type="text" @click="query_open()">查询管理者</el-button>

       <el-button type="text" @click="add=true">添加管理者</el-button>

    </el-row>
    <el-row></el-row>
       <el-table
         :data="userlist"
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
             <el-button @click="edit_open(scope)" icon="el-icon-edit" type="text"></el-button>
             <el-button @click.native.prevent="user_delete(scope, userlist)" icon="el-icon-delete" type="text"></el-button>
           </template>
         </el-table-column>
       </el-table>
       <el-button @click="back()" type="text" size="medium">上一页</el-button>
       <el-button @click="next()" type="text" size="medium">下一页</el-button>
       <el-dialog
         title="添加管理员"
         :visible.sync="add"
         width="50%">
         <el-row>
         <el-col :span="10">
           <el-span style="font: 16px Medium;float: left; margin-left:90px;">选择管理区域</el-span><br><br>
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
         <el-select v-model="user.comunity_id" @change="comunity_change()" placeholder="小区管理">
           <el-option
             label="所有小区"
             value="">
           </el-option>
           <el-option
             v-for="item in comunitylist"
             :key="item.id"
             :label="item.cName"
             :value="item.cId">
           </el-option>
         </el-select>
         </el-row>
         <el-row>
         <el-select v-model="user.build" @change="build_change()" placeholder="楼栋管理">
           <el-option
             label="所有楼栋"
             value="">
           </el-option>
           <el-option
             v-for="item in buildlist"
             :key="item"
             :value="item">
           </el-option>
         </el-select>
         </el-row>
         <el-row>
         <el-select v-model="user.unit" @change="unit_change()" placeholder="单元管理">
           <el-option
             label="所有单元"
             value="">
           </el-option>
           <el-option
             v-for="item in unitlist"
             :key="item"
             :value="item">
           </el-option>
         </el-select>
         </el-row>
         </el-col>
          <el-col :span="14">
            <el-span style="font: 16px Medium;float: left; margin-left:100px;">确认相关权限</el-span><br><br>
         <el-row>
         <el-checkbox v-model="user.auth_add" border>添加权限</el-checkbox>
         <el-checkbox v-model="user.auth_edit" border>更改权限</el-checkbox>
         <el-checkbox v-model="user.auth_delete" border>删除权限</el-checkbox>
         </el-row>
            <br><br>
            <el-span style="font: 16px Medium;float: left; margin-left:100px;">账号及密码</el-span><br><br>
         <el-row>
           <el-input placeholder="请输入内容" v-model="user.name" style="width: 350px">
             <template slot="prepend">账号</template>
           </el-input>
         </el-row>
            <el-input placeholder="请输入内容" v-model="user.pwd" style="width: 350px">
              <template slot="prepend">密码</template>
            </el-input>
          </el-col>
         </el-row>

         <span slot="footer" class="dialog-footer">
       <el-button @click="add = false">取 消</el-button>
       <el-button type="primary" @click="user_add()">确 定</el-button>
        </span>

       </el-dialog>
       <el-dialog
        title="编辑用户"
        :visible.sync="edit"
        width="50%">
         <el-row>
           <el-col :span="10">
             <span style="font: 16px Medium;float: left; margin-left:90px;">选择管理区域</span><br><br>
             <el-row>
               <el-select v-model="user.comunity_id" @change="comunity_change()" placeholder="小区管理">
                 <el-option
                   label="所有小区"
                   value="">
                 </el-option>
                 <el-option
                   v-for="item in comunitylist"
                   :key="item.id"
                   :label="item.cName"
                   :value="item.cId">
                 </el-option>
               </el-select>
             </el-row>
             <el-row>
               <el-select v-model="user.build" @change="build_change()" placeholder="楼栋管理">
                 <el-option
                   label="所有楼栋"
                   value="">
                 </el-option>
                 <el-option
                   v-for="item in buildlist"
                   :key="item"
                   :value="item">
                 </el-option>
               </el-select>
             </el-row>
             <el-row>
               <el-select v-model="user.unit" @change="unit_change()" placeholder="单元管理">
                 <el-option
                   label="所有单元"
                   value="">
                 </el-option>
                 <el-option
                   v-for="item in unitlist"
                   :key="item"
                   :value="item">
                 </el-option>
               </el-select>
             </el-row>
           </el-col>
           <el-col :span="14">
             <span style="font: 16px Medium;float: left; margin-left:100px;">确认相关权限</span><br><br>
             <el-row>
               <el-checkbox v-model="user.auth_add" border>添加权限</el-checkbox>
               <el-checkbox v-model="user.auth_edit" border>更改权限</el-checkbox>
               <el-checkbox v-model="user.auth_delete" border>删除权限</el-checkbox>
             </el-row>
             <br><br>
             <span style="font: 16px Medium;float: left; margin-left:100px;">账号及密码</span><br><br>
             <el-row>
               <el-input placeholder="请输入内容" v-model="user.name" style="width: 350px" :disabled="true">
                 <template slot="prepend">账号</template>
               </el-input>
             </el-row>
             <el-input placeholder="请输入内容" v-model="user.pwd" style="width: 350px">
               <template slot="prepend">密码</template>
             </el-input>
           </el-col>
         </el-row>

         <span slot="footer" class="dialog-footer">
       <el-button @click="edit = false">取 消</el-button>
       <el-button type="primary" @click="user_updata()">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>
<script>
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8080/api/v1'
  export default {
    data() {
      return {
        user:{
          name:'',
          pwd:'',
          comunity_id:'',
          comunity_name:'',
          build:'',
          unit:'',
          host:'',
          auth_add:false,
          auth_edit:false,
          auth_delete:false,
        },
        provincelist:[],
        citylist:[],
        distlist:[],
        comunitylist:[],
        buildlist:[],
        unitlist:[],
        hostlist:[],
        userlist:[],
        provinceid:'',
        cityid:'',
        distid:'',
        province:'',
        city:'',
        dist:'',
        index:'',
        end:false,
        add:false,
        edit:false,
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
          _this.city='';
          _this.distid='';
          _this.distlist = [];
          _this.user.comunity_id='';
          _this.comunitylist=[];
          _this.user.build='';
          _this.buildlist=[];
          _this.user.unit='';
          _this.unitlist=[];
          _this.user.host='';
          _this.hostlist=[];
        }).catch(function (err) {
          console.log(err);
        })
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
          _this.user.comunity_id='';
          _this.comunitylist=[];
          _this.user.build='';
          _this.buildlist=[];
          _this.user.unit='';
          _this.unitlist=[];
          _this.user.host='';
          _this.hostlist=[];
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
          _this.user.comunity_id='';
          _this.user.build='';
          _this.buildlist=[];
          _this.user.unit='';
          _this.unitlist=[];
          _this.user.host='';
          _this.hostlist=[];
        }).catch(function (err) {
          console.log(err);
        })
      },
      comunity_change(){
        if(this.user.comunity_id!=''){
          this.user.comunity_name = this.comunitylist.find(item => item.cId === this.user.comunity_id)['cName']
        }
        var _this = this;
        axios.get('/builds', {
          params: {
            comunity_id:_this.user.comunity_id
          }
        }).then(function (res) {
          _this.buildlist = res.data;
          _this.user.build='';
          _this.user.unit='';
          _this.unitlist=[];
          _this.user.host='';
          _this.hostlist=[];
        }).catch(function (err) {
          console.log(err);
        })
      },
      build_change(){
        var _this = this;
        axios.get('/units', {
          params: {
            comunity_id:_this.user.comunity_id,
            build_name:_this.user.build,
          }
        }).then(function (res) {
          _this.unitlist = res.data;
          _this.user.unit='';
          _this.user.host='';
          _this.hostlist=[];
        }).catch(function (err) {
          console.log(err);
        })
      },
      unit_change(){
        var _this = this;
        axios.get('/host', {
          params: {
            comunity_id:_this.user.comunity_id,
            build_name: _this.user.build,
            unit_name: _this.user.unit,
          }
        }).then(function (res) {
          _this.hostlist = res.data;
        }).catch(function (err) {
          console.log(err);
        })
      },
      query_open(){
        this.index=1
        this.user_query()
      },
      edit_open(scope) {
        var _this = this;
        axios.get('/comunity/all', {
          params: {
          }
        }).then(function (res) {
          _this.comunitylist = res.data;
        }).catch(function (err) {
          console.log(err);
        })
        if(scope.row.cId!=''){
            this.user.comunity_id = scope.row.cId
            this.user.comunity_name = scope.row.cName

        }
        if(scope.row.bName!=''){
          this.user.build=scope.row.bName
        }
        if(scope.row.uName!=''){
            this.user.unit=scope.row.uName
        }
        this.user.auth_add = scope.row.authAdd
        this.user.auth_edit = scope.row.authEdit
        this.user.auth_delete=scope.row.authDelete
        this.user.name=scope.row.name
        this.user.pwd=scope.row.pwd
        this.edit=true
      },

      user_query() {
        var _this = this;
        axios.get('/userlist', {
          params: {
            index:_this.index,
            province:_this.province,
            city:_this.city,
            dist:_this.dist,
            cId:_this.user.comunity_id
          }
        }).then(function (res) {
          _this.userlist = res.data;
          if(res.status===200){
            _this.end=false
          }else
            _this.end=true
        }).catch(function (err) {
          console.log(err);
        })
      },
      user_add() {
        console.log(this.user.comunity_id)
        this.$confirm('添加一个管理者, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if (this.province == '' || this.city == '' || this.dist == '' ||this.user.name==''||this.user.pwd=='') {
            this.$message({
              type: 'info',
              message: '信息不能为空'
            });
          } else {
            var _this = this;
            axios.post('/user', {
              name:_this.user.name,
              pwd:_this.user.pwd,
              cId:_this.user.comunity_id,
              cName:_this.user.comunity_name,
              bName:_this.user.build,
              uName:_this.user.unit,
              authAdd:_this.user.auth_add,
              authEdit:_this.user.auth_edit,
              authDelete:_this.user.auth_delete
            }).then(function (res) {
              if (res.status === 200) {
                _this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                _this.user_query()
                _this.user.comunity_id=''
                _this.comunitylist = []
                _this.user.build=''
                _this.buildlist=[]
                _this.user.unit=''
                _this.unitlist=[]
                _this.user.name=''
                _this.user.pwd=''
                _this.add = false
              } else {
                _this.$message({
                  type: 'info',
                  message: '该用户已经存在!'
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
      user_updata() {
        var _this = this;
        this.$confirm('更新一个用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if (this.user.name== '' || this.user.pwd == '') {
            this.$message({
              type: 'info',
              message: '账户密码不能为空'
            });
          } else {
            if(_this.user.comunity_id==''){
              _this.user.comunity_name=''
            }else{
              _this.user.comunity_name=_this.comunitylist.find(item => item.cId === _this.user.comunity_id)['cName']
            }
            axios.put('/user', {
              name:_this.user.name,
              pwd:_this.user.pwd,
              cId:_this.user.comunity_id,
              cName:_this.user.comunity_name,
              bName:_this.user.build,
              uName:_this.user.unit,
              authAdd:_this.user.auth_add,
              authEdit:_this.user.auth_edit,
              authDelete:_this.user.auth_delete,
            }).then(function (res) {
              if (res.status===200) {
                _this.$message({
                  type: 'success',
                  message: '变更成功!'
                });
                _this.user_query()
                _this.edit = false
              } else {
                _this.$message({
                  type: 'info',
                  message: '请勿重复提交!'
                });
              }
              _this.user.comunity_id=''
              _this.comunitylist = []
              _this.user.build=''
              _this.buildlist=[]
              _this.user.unit=''
              _this.unitlist=[]
              _this.user.name=''
              _this.user.pwd=''
            }).catch(function (err) {
              console.log("失败")
            })
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
      user_delete(scope, rows) {
        this.$confirm('删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          axios.delete('/user', {
            params: {
              name: scope.row.name
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
      }
    },
    mounted(){

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
