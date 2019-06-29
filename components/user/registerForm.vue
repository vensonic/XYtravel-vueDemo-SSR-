<template>
  <div class="registerForm">
    <el-form :model="registerForm" :rules="rules" ref="registerForm">
      <el-form-item prop="username">
        <el-input placeholder="用户手机名" v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="验证码" v-model="registerForm.captcha">
          <template slot="append">
            <span @click="subcaptcha" style="curse:point">发送验证码</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input placeholder="你的昵称" v-model="registerForm.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请设置密码" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkpass">
        <el-input placeholder="确认密码" v-model="registerForm.checkpass"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%">
        <div @click="registerSubmit">注册</div>
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkpass !== "") {
          this.$refs.registerForm.validateField("checkpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkpass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    //发送验证码:
    subcaptcha() {
      if (this.registerForm.username) {
        this.$axios
          .post("/captchas", { tel: this.registerForm.username })
          .then(res => {
            this.$alert(res.data.code, "验证码", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.registerForm.captcha = res.data.code;
              }
            });
          });
      } else {
        this.$alert("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
      }
    },
    //提交注册
    registerSubmit() {
      this.$refs.registerForm.validate(val => {
        if (val) {
          // let { username, captcha, nickname, password } = this.registerForm;
          // let obj = { username, captcha, nickname, password };
          const {checkpass,...props} = this.registerForm
          this.$axios.post("/accounts/register", props).then(res => {
            // console.log(res);
            //注册成功后自动登录,并跳转首页
            this.$store.commit('user/setUserInfo',res.data)
            this.$message.success('注册成功!')
            setTimeout(() => {
              this.$router.push('/')
            }, 1000);
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.registerForm {
  padding: 15px;
}
</style>
