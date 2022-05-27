<template>
  <div class="body-box">
    <el-container>
      <el-header height="50px">
        <div class="search-info">医院挂号APP</div>
      </el-header>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

      <el-footer>
        <div @click="$router.push({ path: '/home' })">
          <img src="../assets/home2.png" alt="" />
          <div>首页</div>
        </div>

        <div @click="$router.push({ path: '/classify' })">
          <img src="../assets/guahao.png" alt="" />
          <div>预约挂号</div>
        </div>

        <div @click="$router.push({ path: '/mine' })">
          <img src="../assets/mine2.png" alt="" />
          <div>我的</div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainStyle: {},
    };
  },
  computed: {
    titleList() {
      return this.$route.meta.title;
    },
    goBackBtn() {
      return this.$route.meta.goBack;
    },
    meta() {
      return this.$route.meta;
    },
    currentPath() {
      return this.$route.path;
    },
  },
  methods: {
    back() {
      this.$router.push({ path: this.goBackBtn });
    },
    toPage(data) {
      if (data.toPath !== this.$route.path) {
        this.$router.push({ path: data.toPath });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-container::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(242, 242, 242);
  position: fixed;
  z-index: 10;
  width: 100%;

  .router-link-active {
    font-size: 25px;
    color: #409eff;
    text-decoration: none;
  }

  .search-info {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 20px;
    color: rgb(100, 100, 100);
    font-weight: bold;
    width: 100%;
    // .el-form {
    //   display: flex;
    //   align-items: center;
    //   .el-form-item {
    //     margin-bottom: 0;
    //   }
    // }

    // .iconzuojiantou {
    //   position: absolute;
    //   top: 50%;
    //   left: 10px;
    //   transform: translate(0, -50%);
    // }

    // span {
    //   margin: 0 10px;
    // }

    // .active {
    //   color: #c39862;
    // }
  }
}

.el-main {
  padding: 0;
  width: 100%;
  margin-top: 50px;
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
}
.el-main::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #ddd;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333333;

    img {
      width: 30px;
      height: 30px;
    }

    div {
      position: relative;
      top: 3px;
    }
  }
}
</style>
