<template>
  <div>
    <div class="head">
      <span class="icon" @click="back"><i class="el-icon-arrow-left"></i></span>
      <span>修改密码</span>
    </div>

    <el-form
      :model="pswForm"
      :rules="pswRules"
      ref="pswForm"
      label-width="100px"
      status-icon
    >
      <el-form-item label="原密码" prop="rawPassword">
        <el-input v-model="pswForm.rawPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="pswForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="pswForm.checkPass"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button class="el-icon-refresh-right" @click="resetPassword">
        重 置</el-button
      >
      <el-button type="primary" class="el-icon-check" @click="editPassword">
        保 存</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pswForm.checkPass !== "") {
          this.$refs.pswForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pswForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      pswRules: {
        rawPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        newPassword: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入新密码" },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, message: "请确认密码" },
        ],
      },
      pswForm: {
        checkPass: "",
        rawPassword: "",
        newPassword: "",
      },
    };
  },
  methods: {
    back() {
      this.$router.push("/mine");
    },
    resetPassword() {
      this.$refs.pswForm.resetFields();
    },
    async editPassword() {
      this.$refs.pswForm.validate(async (valid) => {
        if (!valid) return;
        // 可以发起修改用户的网络请求
        const { data: res } = await this.$http.post(
          `/api1/updatePassword?newPassword=${
            this.pswForm.newPassword
          }&rawPassword=${this.pswForm.rawPassword}&userId=${
            JSON.parse(sessionStorage.getItem("userInfo")).userId
          }`
        );
        if (res.code === 0) {
          this.$message.success(res.msg);
          this.$router.push("/mine");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 20px;
  width: 100%;
  background-color: #eee;

  .icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
  }

  span {
    margin: 0 10px;
  }
}
.el-form {
  padding: 20px;
}
.btn {
  text-align: center;
}
</style>