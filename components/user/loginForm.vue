<template>
  <div class="lognForm">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名/电话"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%">
        <div @click="loginSubmit">登录</div>
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginSubmit() {
      this.$refs.loginForm.validate(validate => {
        if (validate) {
          // //发送登录请求
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "post",
          //   data: this.loginForm
          // }).then(res => {
          //   console.log(res);
          //   if (res.status=== 200) {
          //        //保存到store中,
          //     this.$store.commit("user/setUserInfo", res.data);
          //     //提示登录成功,并跳转到首页
          //     this.$message.success("登录成功");
          //     setTimeout(() => {
          //       this.$router.push("/");
          //     }, 2000);
          //   }
          // })
          this.$store.dispatch('user/login',this.loginForm).then(res=>{
               this.$message.success("登录成功");
               console.log(res);
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
          })
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.lognForm {
  padding: 15px;
}
</style>
