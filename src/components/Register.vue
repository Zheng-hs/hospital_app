<template>
  <div class="container">
    <div class="head">
      <span class="icon" @click="back"><i class="el-icon-arrow-left"></i></span>
      <span>注册</span>
    </div>
    <div class="form">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item prop="userCode">
          <el-input
            v-model="addForm.userCode"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input
            v-model="addForm.userName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            v-model="addForm.userPassword"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPhone">
          <el-input
            v-model="addForm.userPhone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="idCard">
          <el-input
            v-model="addForm.idCard"
            placeholder="请输入身份证"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-select v-model="addForm.sex" placeholder="请选择性别">
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="addUser">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证手机号规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        // 合法的手机号
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };
    return {
      addForm: {},
      fromPath: "",
      uploadURL: "http://localhost:8082/api1/upload",
      imageUrl: "",
      sexList: [
        { label: "女", value: "1" },
        { label: "男", value: "2" },
      ],
      addFormRules: {
        userCode: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post("/api1/addUser", {
          imgPath: this.userPicture,
          role: "2",
          userCode: this.addForm.userCode,
          userName: this.addForm.userName,
          userPassword: this.addForm.userPassword,
          userPhone: this.addForm.userPhone,
          idCard: this.addForm.idCard,
          sex: this.addForm.sex,
        });

        if (res.code !== 0) {
          this.$message.error("注册失败!");
        }

        this.$message.success("注册成功");
        this.$router.push("/login");
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.userPicture = res.path;
    },
    back() {
      this.$router.push(this.fromPath);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例,将值传入fromPath
      vm.fromPath = from.path;
    });
  },
  mounted() {
    this.$nextTick(() => {
      // 验证是否获取到了上页的url
      console.log(this.fromPath);
    });
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.el-form {
  width: 80%;
  .el-select {
    width: 100%;
  }
}
.container {
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

    .active {
      color: #c39862;
    }
  }
  .form {
    display: flex;
    justify-content: center;
    .el-form {
      margin-top: 30px;
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>