<template>
  <div class="container">
    <div class="left-box">
      <div class="classify-text">
        <p>科室导航</p>
      </div>
      <div class="classify">
        <div
          :class="{ department: true, active: index === showIdx }"
          v-for="(item, index) in departmentList"
          :key="index"
          @click="getDoctor(item, index)"
        >
          <p>{{ item.departmentName }}</p>
          <div class="icon"><i class="el-icon-arrow-right"></i></div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="title">{{ departmentDescribe }}</div>
      <ul>
        <li
          v-for="(item, index) in doctorList"
          :key="index"
          @click="getDetail(item)"
        >
          <img :src="item.imgPath" alt="" />
          <div class="doctor-info">
            <div>{{ item.userName }}</div>
            <div>{{ item.departmentName }}</div>
            <div>{{ item.jobName }}</div>
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
      departmentList: [],
      doctorList: [],
      showIdx: -1,
      departmentDescribe: "",
    };
  },
  methods: {
    async getDepartment() {
      const { data: res } = await this.$http.post("/api1/listDepartment", {});
      this.departmentList = res.data.data;
      // console.log(this.departmentList);
    },
    async getDoctor(item, index) {
      if (index == this.showIdx) {
        this.showIdx = -1;
      } else {
        this.showIdx = index;
      }
      this.departmentDescribe = item.departmentDescribe;
      sessionStorage.setItem(
        "departmentDescribe",
        JSON.stringify(item.departmentDescribe)
      );
      const { data: res } = await this.$http.post("/api1/listUser", {
        departmentName: item.departmentName,
      });
      if (res.code !== 0) {
        return this.$message.error(res.msg);
      }
      this.doctorList = res.data.data;
    },
    getDetail(item) {
      this.$router.push({ path: "/doctor", query: item });
    },
  },
  created() {
    this.getDepartment();
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  position: fixed;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .left-box {
    width: 40%;
    height: 100%;
    margin-bottom: 150px;
    margin-top: 50px;
    float: left;
    overflow: auto;
    .classify {
      margin-bottom: 120px;
    }
    .classify-text {
      border-bottom: 4px solid rgb(6, 151, 234);
      height: 50px;
      width: 150px;
      font-size: 25px;
      font-weight: bold;
      color: rgb(120, 120, 120);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .department {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 130px;
      height: 50px;
      background-color: rgb(245, 245, 245);
      padding: 0 10px;
      font-weight: bold;
      color: rgb(120, 120, 120);
      cursor: pointer;
      .icon {
        text-align: center;
        // margin-top: 18px;
        i {
          color: rgb(120, 120, 120);
        }
      }
    }
    .active {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 130px;
      height: 50px;
      background-color: #fff;
      padding: 0 10px;
      font-weight: bold;
      color: rgb(120, 120, 120);
      cursor: pointer;
    }
  }
  .left-box::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .right-box {
    margin-bottom: 60px;
    float: left;
    overflow: auto;
    width: 55%;
    height: 100%;
    margin-top: 50px;
    .title {
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
      color: rgb(120, 120, 120);
    }
    ul {
      // width: 100%;
      margin-bottom: 120px;
      padding-left: 0;
      li {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        background-color: rgb(245, 245, 245);
        margin: 5px 0;
        img {
          width: 80px;
          height: 80px;
        }
        .doctor-info {
          :first-child {
            font-size: 16px;
            padding: 5px;
          }
          :nth-child(2) {
            font-size: 14px;
            padding: 5px;
          }
          :nth-child(3) {
            color: rgb(150, 150, 150);
            font-size: 12px;
            padding: 5px;
          }
        }
      }
    }
  }
  .right-box::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
}
</style>