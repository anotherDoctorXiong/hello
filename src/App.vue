<template>
  <div id="app" style="height: 100%">
      <el-container style="height: 100%">
        <el-header>
          <el-row></el-row>
          <el-row>
            <el-col :offset="21" :span="3">
              <el-dropdown @command="Command">
                <span class="el-dropdown-link" style="font: 20px Medium; ">
                {{$store.state.user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人信息</el-dropdown-item>
                <el-dropdown-item command="b">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown></el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside style="width: 12%">
            <el-menu style="height: 100%" router :default-active="$route.path" class="el-menu-vertical-demo"  text-color="#303133" :unique-opened="true">
              <el-menu-item index="/login">
                <i class="el-icon-star-off"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-service"></i>超级管理员</template>
                <el-menu-item index="/0">成员推送</el-menu-item>
                <el-menu-item @click="author()" index="/1"  >权限管理</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title"><i class="el-icon-menu"></i>小区信息管理</template>
                  <el-menu-item @click="comunity()" index="/2"  >小区管理</el-menu-item>
                  <el-menu-item @click="build()" index="/3"  >楼栋管理</el-menu-item>
                  <el-menu-item @click="unit()" index="/4"  >单元管理</el-menu-item>
                  <el-menu-item  index="/5">房屋管理</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-container>
            <el-container>
              <el-main><router-view></router-view></el-main>
              <el-footer>Footer</el-footer>
            </el-container>
          </el-container>
        </el-container>
      </el-container>
    <el-dialog title="个人信息" :visible.sync="userinfo" width="50%" >
      <el-row>
        <el-col :span="12">
          <el-row>
            <span class="intro" v-if="$store.state.user.author==1">角色：超级管理员</span>
            <span class="intro" v-else>角色：区域管理员</span>
          </el-row>
          <el-row><span class="intro">用户名：{{$store.state.user.name}}</span></el-row>
          <el-row></el-row>
          <el-row><span class="intro">管理区域</span></el-row>
          <el-row>
            <span class="intro" v-if="$store.state.auth.comunity==''">管理小区：所有小区</span>
            <span class="intro" v-else>管理小区:{{$store.state.auth.comunity}}</span>
          </el-row>
          <el-row>
            <span class="intro" v-if="$store.state.auth.build==''">管理楼栋：所有楼栋</span>
            <span class="intro" v-else>管理楼栋:{{$store.state.auth.build}}</span>
          </el-row>
          <el-row>
            <span class="intro" v-if="$store.state.auth.unit==''">管理单元：所有单元</span>
            <span class="intro" v-else>管理单元:{{$store.state.auth.unit}}</span>
          </el-row>
        </el-col>
        <el-col :span="12">

          <el-row>
            <span class="intro">相关权限</span>
          </el-row>
          <el-row></el-row>
          <el-row>
            <span class="intro" v-if="$store.state.auth.add">添加权限：有</span>
            <span class="intro" v-else>添加权限：无</span>
          </el-row>
          <el-row>
            <span class="intro" v-if="$store.state.auth.edit">变更权限：有</span>
            <span class="intro" v-else>变更权限：无</span>
          </el-row>
          <el-row>
            <span class="intro" v-if="$store.state.auth.delete">删除权限：有</span>
            <span class="intro" v-else>删除权限：无</span>
          </el-row>
          <el-row><span class="intro">感觉权限不够用：<el-button type="text" @click="push_open()">权限申请</el-button></span></el-row>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="权限申请"
      :visible.sync="authpush"
      width="40%"
      >
      <el-row>
        <el-col :span="10">
          <span style="font: 16px Medium;float: left; margin-left:10px;">选择区域</span><br><br>
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
          <span style="font: 16px Medium;float: left; margin-left:10px;">选择权限</span><br><br>
          <el-row>
            <el-checkbox v-model="user.auth_add" border>添加权限</el-checkbox>
            <el-checkbox v-model="user.auth_edit" border>更改权限</el-checkbox>
            <el-checkbox v-model="user.auth_delete" border>删除权限</el-checkbox>
          </el-row>
          <span style="font: 16px Medium;float: left; margin-left:10px;">申请理由</span><br><br>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="请输入内容"
            v-model="user.reason">
          </el-input>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
       <el-button @click="authpush = false">取 消</el-button>
       <el-button type="primary" @click="auth_push()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import login from './components/login.vue'
  import store from "./vuex/store";
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8080/api/v1'
  export default {
    data(){
      return{
        userinfo:false,
        authpush:false,
        user:{
          name:'',
          comunity_id:'',
          comunity_name:'',
          build:'',
          unit:'',
          host:'',
          auth_add:false,
          auth_edit:false,
          auth_delete:false,
          reason:''
        },
        comunitylist:[],
        buildlist:[],
        unitlist:[],

      }
    },
    methods: {
      Logout: function () {
        this.$store.commit('Logout');
        login.methods.clearCookie()
        this.$router.push({path: '/login'})
      },
      author() {
        if (this.$store.state.user.name=='') {
          this.$message({
            type: 'info',
            message: '请登录'
          });
        } else if (this.$store.state.user.author != 1) {
          this.$message({
            type: 'info',
            message: '只有管理员才能这样做，请把手拿开'
          });
        }
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
      comunity() {
        if (this.$store.state.user.name == '') {
          this.$message({
            type: 'info',
            message: '请登录'
          });
        } else {
          if (this.$store.state.user.author >2) {
            this.$message({
              type: 'info',
              message: '权限不足，请与管理员联系'
            });
          }
        }
      },

      build() {
        if (this.$store.state.user.name == '') {
          this.$message({
            type: 'info',
            message: '请登录'
          });
        } else {
          if (this.$store.state.user.author > 3) {
            this.$message({
              type: 'info',
              message: '权限不足，请与管理员联系'
            });
          }
        }
      },
      unit() {
        if (this.$store.state.user.name == '') {
          this.$message({
            type: 'info',
            message: '请登录'
          });
        } else {
          if (this.$store.state.user.author > 4) {
            this.$message({
              type: 'info',
              message: '权限不足，请与管理员联系'
            });
          }
        }
      },
      push_open(){
        this.user.name=store.state.user.name
        this.user.auth_add=store.state.auth.add
        this.user.auth_edit=store.state.auth.edit
        this.user.auth_delete=store.state.auth.delete
        this.authpush=true
      },
      auth_push(){
        if(this.user.name==''||this.user.reason==''){
          this.$message({
            type: 'info',
            message: '请完善数据'
          });
        }else{
          var _this=this
          axios.post('/user/application', {
            name:_this.user.name,
            cId:_this.user.comunity_id,
            cName:_this.user.comunity_name,
            bName:_this.user.build,
            uName:_this.user.unit,
            authAdd:_this.user.auth_add,
            authEdit:_this.user.auth_edit,
            authDelete:_this.user.auth_delete,
          }).then(function (res) {
            if(res.status===200){
              _this.$message({
                type: 'success',
                message: '成功申请，请耐心等待'
              });
              _this.authpush=false
            }else{
              _this.$message({
                type: 'info',
                message: '请稍后尝试'
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
        }

      },
      Command(command) {
        if(command=='a'){
          this.userinfo=true
        }else{
          this.Logout()
        }
      },
      mounted(){
        axios.get('/comunity/all', {
          params: {
          }
        }).then(function (res) {
          _this.comunitylist = res.data;
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center
  }
  .intro {
    font:16px large
  }
</style>
