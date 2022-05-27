<template>
  <div>
    <div class="back" @click="back"><i class="el-icon-arrow-left"></i></div>
    <div class="doctor-box">
      <div class="title">{{ departmentName }}</div>
      <ul>
        <li
          v-for="(item, index) in doctorList"
          :key="index"
          @click="getDetail(item)"
        >
          <img :src="item.imgPath" alt="" />
          <div class="doctor-info">
            <div>{{ item.userName }}</div>
            <div>{{ item.jobName }}</div>
            <div>{{ item.userDescribe }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctorList: [],
      departmentName: "",
    };
  },
  methods: {
    async getDoctor() {
      const { data: res } = await this.$http.post("/api1/listUser", {
        departmentName: JSON.parse(sessionStorage.getItem("departmentName")),
      });
      if (res.code !== 0) {
        return this.$message.error(res.msg);
      }
      this.doctorList = res.data.data;
      this.departmentName = JSON.parse(
        sessionStorage.getItem("departmentName")
      );
    },
    getDetail(item) {
      this.$router.push({ path: "/doctor", query: item });
    },
    back() {
      this.$router.push("/home");
    },
  },
  created() {
    this.getDoctor();
  },
};
</script>

<style lang="less" scoped>
.doctor-box {
  margin-bottom: 60px;
  .title {
    width: 100%;
    text-align: center;
    padding-top: 20px;
    font-size: 22px;
    font-weight: bold;
    color: rgb(120, 120, 120);
  }
  ul {
    width: 90%;
    padding: 20px;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: rgb(245, 245, 245);
      margin: 5px 0;
      img {
        width: 120px;
        height: 120px;
        padding-right: 40px;
      }
      .doctor-info {
        :first-child {
          font-size: 16px;
          padding: 5px;
        }
        :nth-child(3) {
          font-size: 14px;
          padding: 5px;
        }
        :nth-child(2) {
          color: rgb(150, 150, 150);
          font-size: 12px;
          padding: 5px;
        }
      }
    }
  }
}
.back {
  position: absolute;
  top: 15px;
  left: 15px;
  i {
    font-size: 20px;
  }
}
</style>