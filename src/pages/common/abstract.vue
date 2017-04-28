<template lang="html">
  <div class="abstract">
    <el-row v-if="children">
      <el-col :xs="10" :sm="8" :md="6" :lg="4" v-for="(route, index) in children" :key="index" :offset="index > 0 ? 2 : 0">
        <el-card v-if="!route.hideInNav">
          <div class="card-wrapper">
            <div class="img">
              <img :src="route.imgUrl" type="image/webp">
            </div>
            <div class="text">
              <p>{{route.name}}</p>
              <router-link :to="{name: route.name}">查看</router-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      children: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.children = vm.$route.meta.children;
    });
  },
  watch: {
    '$route'(to, from) {
      console.log(to, from);
      this.children = this.$route.meta.children;
    }
  }
};
</script>

<style lang="scss">
  .abstract {
    .card-wrapper {
      display: flex;
      flex-direction: column;
      .img {
        height: 150px;
      }
      .text {
        display: flex;
        justify-content: space-around;
        align-items: center;
        a {
          color: #20a0ff;
        }
      }
      img {
        width: 100%;
        height: 150px;
      }
    }
    .el-card {
      margin-bottom: 40px;
    }
    .el-card__body {
      padding: 0;
    }
  }
</style>
