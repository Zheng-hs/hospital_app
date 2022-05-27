<template>
  <div>
    <div class="head" v-show="isShow">
      <img src="../assets/1.jpg" alt="" />
      <div @click="login">登录/</div>
      <div @click="register">注册</div>
    </div>
    <div class="active" v-show="check">
      <img :src="img" alt="" />
      <div>{{ userName }}</div>
    </div>
    <div class="user-info">
      <div class="first-box" @click="order">
        <div><i class="el-icon-s-order"></i> 我的预约</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div class="user-info">
      <div class="first-box" @click="user">
        <div><i class="el-icon-user-solid"></i> 个人信息</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div class="user-info">
      <div class="first-box" @click="change">
        <div><i class="el-icon-lock"></i> 修改密码</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div class="user-info">
      <div class="first-box" @click="logout">
        <div><i class="el-icon-switch-button"></i> 退出登录</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "",
      userName: "",
      isShow: true,
      check: false,
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    getUser() {
      if (!sessionStorage.getItem("token")) {
        // token存在条件
      } else {
        this.img = JSON.parse(sessionStorage.getItem("userInfo")).imgPath;
        this.userName = JSON.parse(sessionStorage.getItem("userInfo")).userCode;
        this.check = !this.check;
        this.isShow = !this.isShow;
      }
    },
    logout() {
      if (!sessionStorage.getItem("token")) {
        // token存在条件
        this.$confirm("请先登录")
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      } else {
        this.$confirm("确定要退出登录吗？")
          .then(() => {
            window.sessionStorage.clear();
            this.$router.go(0);
          })
          .catch(() => {});
      }
    },
    order() {
      if (!sessionStorage.getItem("token")) {
        // token存在条件
        this.$confirm("请先登录")
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      } else {
        this.$router.push("/order");
      }
    },
    change() {
      if (!sessionStorage.getItem("token")) {
        // token存在条件
        this.$confirm("请先登录")
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      } else {
        this.$router.push("/changepassword");
      }
    },
    user() {
      if (!sessionStorage.getItem("token")) {
        // token存在条件
        this.$confirm("请先登录")
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      } else {
        this.$router.push("/user");
      }
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="less" scoped>
.head {
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  background-color: rgb(250, 250, 250);
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    padding: 0 50px;
  }
  :nth-child(2) {
    font-size: 20px;
  }
  :nth-child(3) {
    font-size: 20px;
  }
}
.active {
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  background-color: rgb(250, 250, 250);
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    padding: 0 50px;
  }
  :nth-child(2) {
    font-size: 20px;
  }
}
.user-info {
  .first-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    margin: 10px;
    background-color: rgb(250, 250, 250);
  }
}
</style>