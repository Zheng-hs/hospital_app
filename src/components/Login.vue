<template>
  <div class="container">
    <div class="head"><img src="../assets/logo.jpg" alt="" /></div>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginFormRule"
      label-width="0px"
      class="user_form"
    >
      <!-- 用户名 -->
      <el-form-item prop="userCode">
        <el-input
          v-model="loginForm.userCode"
          prefix-icon="iconfont icon-user"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          prefix-icon="iconfont icon-3702mima"
          type="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <div @click="register">立即注册>></div>
        <el-button type="primary" @click="login">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userCode: "",
        password: "",
      },
      loginFormRule: {
        userCode: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "login/auth",
          this.loginForm
        );
        if (res.code !== 0) return this.$message.error(res.msg);
        this.$message.success("登录成功");
        // 1.将登录成功之后的token，保存到客户端的sessionStorage 中
        //   1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem("token", res.data);
        const { data: ret } = await this.$http.post("/login/current");
        sessionStorage.setItem("userInfo", JSON.stringify(ret.data));
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push("/home");
      });
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  width: 100%;
  text-align: center;
  img {
    width: 160px;
    height: 150px;
    border-radius: 50%;
    padding: 20px;
  }
}
.el-form {
  padding: 20px;
  .btns {
    margin-top: 10px;
    div {
      text-align: right;
      color: rgb(150, 150, 150);
      cursor: pointer;
    }
  }
  .el-button {
    width: 100%;
  }
}
</style>