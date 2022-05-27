<template>
  <div class="body-box">
    <div class="block">
      <el-carousel height="200px">
        <el-carousel-item v-for="(item, index) in Imglist" :key="index">
          <img :src="item.imgPath" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <div class="box">
        <div class="yuyue" @click="quick">
          <img src="../assets/aa.jpg" alt="" />
          <div>快速预约</div>
        </div>
        <div class="phone">
          <div><i class="el-icon-phone"></i>电话咨询</div>
          <div>0755-82316199</div>
        </div>
      </div>
      <div class="doctor">
        <div class="text">
          <div>▍</div>
          <div>预约挂号</div>
          <div>[请选择科室]</div>
        </div>

        <div class="yuyue-box">
          <div class="text-box" @click="getList">
            <img src="../assets/1.png" alt="" />
            <div>美容科</div>
          </div>
          <div class="text-box" @click="getList">
            <img src="../assets/2.png" alt="" />
            <div>口腔科</div>
          </div>
          <div class="text-box" @click="getList">
            <img src="../assets/3.png" alt="" />
            <div>眼科</div>
          </div>
          <div class="text-box" @click="getList">
            <img src="../assets/4.png" alt="" />
            <div>内科</div>
          </div>
          <div class="text-box" @click="getList">
            <img src="../assets/5.png" alt="" />
            <div>外科</div>
          </div>
          <div class="text-box" @click="getList">
            <img src="../assets/6.png" alt="" />
            <div>皮肤科</div>
          </div>
        </div>
      </div>
      <div class="doctor-box">
        <div
          class="doctor-list"
          v-for="(item, index) in DoctorList"
          :key="index"
          @click="getDetail(item)"
        >
          <img :src="item.imgPath" alt="" />
          <div class="msg-list">
            <div>{{ item.userName }}</div>
            <div>{{ item.departmentName }}</div>
            <div>{{ item.jobName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Imglist: [],
      DoctorList: [],
    };
  },
  methods: {
    async getImg() {
      const { data: res } = await this.$http.post("/api1/listImg");
      if (res.code === 0) {
        this.Imglist = res.data.data;
      }
    },
    async getDoctor() {
      const {
        data: res,
      } = await this.$http.post(`/api1/listUser?pageNo=${1}&pageSize=${6}`, {
        role: 1,
      });
      this.DoctorList = res.data.data;
      // console.log(this.DoctorList);
    },
    getDetail(item) {
      this.$router.push({ path: "/doctor", query: item });
    },
    getList(e) {
      sessionStorage.setItem(
        "departmentName",
        JSON.stringify(e.target.innerText)
      );
      this.$router.push("/list");
    },
    quick() {
      this.$router.push("/classify");
    },
  },
  created() {
    this.getImg();
    this.getDoctor();
  },
};
</script>

<style lang="less" scoped>
.block {
  img {
    width: 414px;
    height: 200px;
  }
}
.container {
  background-color: #eee;
  overflow: hidden;
  .box {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    .yuyue {
      width: 49%;
      height: 100px;
      text-align: center;
      background-color: #fff;
      color: rgb(150, 150, 150);
      border-radius: 10px;
      img {
        margin-top: 10px;
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
    }
    .phone {
      width: 49%;
      height: 100px;
      text-align: center;
      background-color: #fff;
      color: rgb(150, 150, 150);
      border-radius: 10px;
      :first-child {
        margin-top: 15px;
      }
    }
  }
  .doctor {
    background-color: #fff;
    padding: 5px;
    border-radius: 10px;
    .text {
      display: flex;
      padding: 5px;
      :first-child {
        color: #0697ea;
      }
      :nth-child(2) {
        font-weight: bold;
      }
      :last-child {
        color: rgb(150, 150, 150);
        font-size: 12px;
        padding-top: 5px;
        padding-left: 5px;
      }
    }
    .yuyue-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .text-box {
        width: 120px;
        height: 120px;
        text-align: center;
        img {
          padding-top: 5px;
        }
      }
    }
  }
  .doctor-box {
    padding: 10px;
    margin: 5px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 55px;
    .doctor-list {
      display: flex;
      width: 180px;
      height: 100px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        padding-right: 10px;
      }
      .msg-list {
        :nth-child(2) {
          font-size: 12px;
          color: rgb(150, 150, 150);
        }
      }
    }
  }
}
</style>