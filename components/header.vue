<template>
  <div class="header">
    <el-row class="main" type="flex" justify="space-around">
      <el-row class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt>
        </nuxt-link>
      </el-row>
      <el-row class="navs" type="flex">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/airticket">国内机票</nuxt-link>
      </el-row>
      <el-row class="user" type="flex">
        <el-dropdown class="userInfo" v-if="$store.state.user.userInfo.token" @command="handleCommand">
          <el-row type="flex" justify="center" class="el-dropdown-link" align='middle'>
              <img :src='$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar'>
              <span>{{$store.state.user.userInfo.user.nickname}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="person">
              个人中心
            </el-dropdown-item>
            <el-dropdown-item command="loginout">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link to="/user/login" v-else class="loginReg">登录/注册</nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //点击用户下拉菜单触发的事件函数
    handleCommand(command){
      //退出登录
      if(command==='loginout'){
         this.$store.commit('user/clearUserInfo')
      this.$message.success('退出成功')
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 1px 1px 1px #eee;
  .main {
    width: 1000px;
    margin: 0 auto;
    .logo {
      padding-top: 9px;
      margin-right: 15px;
      img {
        display: block;
        width: 156px;
        height: 42px;
      }
    }
    .navs {
      flex: 1;
      a {
        display: block;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        &:hover {
          color: #409eff;
          border-bottom: 5px solid #409eff;
        }
      }
      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff !important;
      }
    }
    .user {
      .userInfo {
        .el-dropdown-link {
          img {
            display: block;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            vertical-align: middle;
            &:hover {
              border: 3px solid #409eff;
            }
          }
        }
      }
      .loginReg {
        font-size: 14px;
        color: #666;
        &:hover {
          color: #409eff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
