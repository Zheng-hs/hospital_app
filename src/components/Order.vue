<template>
  <div class="container">
    <div class="head">
      <span class="icon" @click="back"><i class="el-icon-arrow-left"></i></span>
      <span>我的预约</span>
    </div>
    <div class="main">
      <div class="order-item" v-for="(item, index) in list" :key="index">
        <div class="item-top">
          <span>{{ item.registrationId }}</span>
          <span>
            {{
              item.status === "0"
                ? "已预约"
                : item.status === "1"
                ? "已完成"
                : "已取消"
            }}
          </span>
        </div>
        <div class="item-center">
          <div class="text">
            <div class="text-con">{{ item.departmentName }}</div>
            <div class="props-con">{{ item.doctorName }}</div>
            <div class="job">{{ item.jobName }}</div>
          </div>
          <div>
            预约人:{{ item.userName }}
            <div
              class="getnum"
              @click="getDetail(item)"
              v-show="item.status === '0'"
            >
              查看挂号进度
            </div>
          </div>
        </div>
        <div class="item-more">
          <div
            class="btn"
            @click.stop="changeOrderStatus(item)"
            v-show="item.status === '0'"
          >
            <span>取消预约</span>
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
      list: [],
    };
  },
  methods: {
    back() {
      this.$router.push("/mine");
    },
    async getOrder() {
      const { data: res } = await this.$http.post("/api1/listRegistration",{userCode: JSON.parse(sessionStorage.getItem("userInfo")).userCode});
      this.list = res.data.data;
    },
    changeOrderStatus(item) {
      this.$confirm("确定要取消预约吗？")
        .then(async () => {
          const {
            data: res,
          } = await this.$http.post(`/api1/updateStatus?status=${2}`, [
            item.registrationId,
          ]);
          if (res.code === 0) {
            this.$message.success("取消预约成功！");
            this.getOrder();
          }
        })
        .catch(() => {});
    },
    async getDetail(item) {
      const { data: res } = await this.$http.post(`/api1/countDoctorName?doctorName=${item.doctorName}&sort=${item.sort}`);
      if (res.code === 0) {
        this.$message.info(res.msg);
      }
    },
  },
  created() {
    this.getOrder();
  },
};
</script>

<style lang="less" scoped>
.container {
  .head {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 20px;
    top: 0;
    width: 100%;
    background-color: #eee;
    z-index: 10;

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
  .main {
    margin-top: 60px;
    margin-bottom: 10px;
  }
  .order-item {
    width: 95%;
    margin: 0 auto;
    background-color: rgb(248, 248, 248);
    border-radius: 8px;
    padding: 10px 15px;
    box-sizing: border-box;
    margin: 10px;
    .item-top {
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      span:first-child {
        font-size: 14px;
        flex: 1;
        line-height: 38px;
        position: relative;
        left: 8px;
        color: rgb(150, 150, 150);
      }
      span:nth-child(2) {
        position: absolute;
        right: 0;
        font-size: 13px;
        color: #0697ea;
        padding-right: 10px;
      }
    }
    .item-center {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding-top: 5px;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      margin: 10px 0;
      .img-con {
        flex: 1;
        margin: 10px;
        img {
          width: 150px;
        }
      }
      .text {
        flex: 2.2;
        .text-con {
          line-height: 22px;
          padding-left: 10px;
        }
        .props-con {
          font-size: 16px;
          line-height: 26px;
          padding-left: 10px;
        }
        .job {
          font-size: 13.5px;
          line-height: 26px;
          color: rgb(168, 168, 168);
          padding-left: 10px;
        }
      }
      .getnum {
        color: #0697ea;
        font-size: 14px;
        font-weight: bold;
        padding-top: 20px;
      }
    }
    .item-bottom {
      width: 100%;
      line-height: 40px;
      text-align: right;
      padding-top: 5px;
      span:nth-child(1) {
        font-size: 15px;
      }
      span:nth-child(2) {
        font-size: 20px;
      }
    }
    .item-more {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .btn {
        width: 92px;
        height: 28px;
        border-radius: 20px;
        position: relative;
        border: 1.5px solid #0697ea;
        margin-left: 5px;
        margin-top: 10px;
        margin-bottom: 6px;
        cursor: pointer;
        span {
          font-size: 15px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          //   margin-top: -10.4px;
          //   margin-left: -16px;
          width: 100%;
          text-align: center;
          color: #0697ea;
        }
      }
    }
  }
}
</style>