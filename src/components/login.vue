<template>
  <div id="app">

    <el-row>

      <el-col :offset="15" :span="6">
        <el-row>
          <el-col :span="8"><label>用户名</label></el-col>
          <el-col :span="16"><el-input v-model="user.name"></el-input></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><label>密码</label></el-col>
          <el-col :span="16"><el-input v-model="user.pwd"></el-input></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><el-checkbox v-model="checked">记住密码</el-checkbox></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><el-button @click="isLogin">登录</el-button></el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import store from "../vuex/store";
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8080/api/v1'
  export default {
    data() {
      return{
        user:{
          name:'',
          pwd:'',
          author:'',
        },
        auth:{
          comunity:'',
          comunityid:'',
          build:'',
          unit:'',
          add:false,
          edit:false,
          delete:false
        },
          checked:false
      }
    },
    methods:{
      setCookie:function(name,pwd,author,exdays) {
        var exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //字符串拼接cookie
        document.cookie="Name"+ "=" +name+";path=/;expires="+exdate.toGMTString();
        document.cookie="Pwd"+"="+pwd+";path=/;expires="+exdate.toGMTString();
        document.cookie="Author"+"="+author+";path=/;expires="+exdate.toGMTString();
     /*   document.cookie="Comunity"+"="+comunity+";path=/;expires="+exdate.toGMTString();
        document.cookie="Build"+"="+build+";path=/;expires="+exdate.toGMTString();
        document.cookie="Unit"+"="+unit+";path=/;expires="+exdate.toGMTString();
        document.cookie="Host"+"="+host+";path=/;expires="+exdate.toGMTString();*/
      },
      //读取cookie
      getCookie:function () {
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='Name') {
              store.state.user.name=arr2[1]
            }else if(arr2[0]=='Pwd'){
              store.state.user.pwd=arr2[1]
            }else if(arr2[0]=='Author'){
              store.state.user.author=arr2[1]
            }
          }
          this.setAuth()
        }

      },
      //清除cookie
      clearCookie:function () {
        this.setCookie("","","",-1);//修改2值都为空，天数为负1天就好了
      },
      isLogin:function() {
        var _this=this
        axios.post('/user/login',{
          name:_this.user.name,
          pwd:_this.user.pwd,
        }).then(function(res){
          if(res.status===200){
            _this.user.name=res.data.name
            _this.user.pwd=res.data.pwd
            _this.user.author=res.data.author
            _this.$store.commit('isLogin',_this.user);
            _this.setAuth()
            _this.$router.push({ path: '/2' })
            if(_this.checked=true){
              //传入账号名，密码，和保存天数3个参数
              _this.setCookie(_this.user.name,_this.user.pwd,_this.user.author,1);
            }
          }else {
            console.log("账号或密码不正确");
          }
        }).catch(function(err){
          console.log(err);
        });
      },
      setAuth(){
        if(store.state.user.name!=''){
          var _this=this
          axios.get('/user',{
            params:{
              name:store.state.user.name
            }
          }).then(function(res){
            if(res.status===200){
              _this.auth.comunity=res.data.cName
              _this.auth.comunityid=res.data.cId
              _this.auth.build=res.data.bName
              _this.auth.unit=res.data.uName
              _this.auth.add=res.data.authAdd
              _this.auth.edit=res.data.authEdit
              _this.auth.delete=res.data.authDelete
              _this.$store.commit('setAuth',_this.auth);
            }else {
              console.log("账号或密码不正确");
            }
          }).catch(function(err){
            console.log(err);
          });
        }
      },
    },

    mounted(){
      this.getCookie()
    }
  }

</script>
<style>
  .el-row {
    margin-bottom: 20px;
  }
  .mydiv{
    height: 50px;
  }
</style>
