<template>
  <div>
    <div class="container">
      <div class="back" @click="back"><i class="el-icon-arrow-left"></i></div>
      <img :src="doctorList.imgPath" alt="" />
      <div class="doctor-info">
        <div>{{ doctorList.userName }}</div>
        <div>{{ doctorList.departmentName }}</div>
        <div>{{ doctorList.jobName }}</div>
        <div>{{ doctorList.userDescribe }}</div>
      </div>
    </div>
    <el-button type="primary" @click="add">立即预约</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctorList: [],
      fromPath: "",
    };
  },
  methods: {
    getDetail() {
      this.doctorList = this.$route.query;
    },
    async add() {
      if (!sessionStorage.getItem("token")) {
        // token存在条件
        this.$confirm("请先登录")
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      } else {
        const { data: res } = await this.$http.post("/api1/addRegistration", {
          departmentName: this.doctorList.departmentName,
          doctorName: this.doctorList.userName,
          jobName: this.doctorList.jobName,
          userCode: JSON.parse(sessionStorage.getItem("userInfo")).userCode,
          userName: JSON.parse(sessionStorage.getItem("userInfo")).username,
          departmentDescribe: JSON.parse(
            sessionStorage.getItem("departmentDescribe")
          ),
        });
        if (res.code === 0) {
          this.$message.success("预约成功!");
          this.$router.push(this.fromPath);
        }
      }
    },
    back() {
      this.$router.push(this.fromPath);
    },
  },
  created() {
    this.getDetail();
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
.container {
  text-align: center;
  img {
    width: 200px;
    height: 200px;
    padding: 20px;
  }
  .doctor-info {
    :first-child {
      font-size: 25px;
      padding: 5px;
    }
    :nth-child(2) {
      font-size: 18px;
      padding: 5px;
    }
    :nth-child(3) {
      font-size: 18px;
      padding: 5px;
    }
    :last-child {
      font-size: 16px;
      padding: 5px 35px
    }
  }
}
.el-button {
  width: 90%;
  margin: 50px 20px;
}
.back {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 10;
  i {
    font-size: 20px;
  }
}
</style>