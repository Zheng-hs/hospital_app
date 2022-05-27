<template>
  <div>
    <div class="head">
      <span class="icon" @click="back"><i class="el-icon-arrow-left"></i></span>
      <span>个人信息</span>
    </div>
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="70px"
    >
      <el-upload
        class="avatar-uploader"
        :action="uploadURL"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img
          v-show="isShow"
          :src="editForm.imgPath"
          class="avatars"
          @click="changeIsShow"
        />
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item label="用户名" prop="userCode">
        <el-input v-model="editForm.userCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="editForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="userPhone">
        <el-input v-model="editForm.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="editForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="editForm.sex" placeholder="请选择">
          <el-option
            v-for="item in sexList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <div slot="footer" class="footer">
      <el-button type="primary" @click="editUserInfo">确 定</el-button>
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
      uploadURL: "http://localhost:8082/api1/upload",
      imageUrl: "",
      isShow: true,
      editForm: {},
      editFormRules: {
        userCode: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [{ required: true, message: "请输入身份证", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      sexList: [
        { label: "女", value: "1" },
        { label: "男", value: "2" },
      ],
    };
  },
  methods: {
    changeIsShow() {
      this.isShow = !this.isShow;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl)
      // console.log(res)
      this.userPicture = res.path;
    },
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起修改用户的网络请求
        const { data: res } = await this.$http.post("/api1/updateUser", {
          imgPath: this.userPicture,
          userCode: this.editForm.userCode,
          userName: this.editForm.userName,
          userPassword: this.editForm.userPassword,
          jobName: this.editForm.jobName,
          userDescribe: this.editForm.userDescribe,
          idCard: this.editForm.idCard,
          userPhone: this.editForm.userPhone,
          sex: this.editForm.sex,
          role: this.editForm.role,
          userId: this.editForm.userId,
          departmentName: this.editForm.departmentName,
        });

        if (res.code !== 0) {
          this.$message.error("修改用户信息失败!");
        }
        this.$message.success("修改用户信息成功");
      });
    },
    async getUserInfo() {
      const { data: res } = await this.$http.post("/api1/listUser", {
        userId: JSON.parse(sessionStorage.getItem("userInfo")).userId,
      });
      this.editForm = res.data.data[0];
      this.userPicture = this.editForm.imgPath;
    },
    back() {
      this.$router.push("/mine");
    },
  },
  created() {
    this.getUserInfo();
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 219px;
  height: 219px;
  line-height: 219px;
  text-align: center;
}
.avatar {
  width: 219px;
  height: 219px;
  display: block;
}
.avatars {
  width: 219px;
  height: 219px;
  display: block;
  position: absolute;
}
.el-form {
  padding: 20px;
  .el-select {
    width: 100%;
  }
}
.footer {
  width: 100%;
  text-align: center;
  .el-button {
    width: 80%;
  }
}
</style>