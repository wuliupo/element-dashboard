<template lang="html">
  <el-menu theme="light" :default-active="activeMenu" class="db-menu-bar" :mode="mode" router @select="handleSelect">
    <template v-for="(route, index) in $router.options.routes[$router.options.routes.length - 2].children">
      <template v-if="route.children && route.name">
        <el-submenu :index="route.name">
          <template slot="title">
            <i :class="route.iconClass" v-if="mode != 'horizontal'"></i>
            {{route.name}}
          </template>
          <el-menu-item :index="cRoute.name" v-for="(cRoute, cIndex) in route.children" :route="cRoute">{{cRoute.name}}</el-menu-item>
        </el-submenu>
      </template>

      <template v-if="!route.children && route.name">
        <el-menu-item :index="route.name" :route="route">
          <i :class="route.iconClass" v-if="mode != 'horizontal'"></i>
          {{route.name}}
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
  export default {
    name: 'db-navbar',
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      setActiveMenu(test) {
        console.log(test, this.$route.name);
        this.activeMenu = this.$parent.activeMenu = this.$route.name;
      }
    },
    created() {
      this.setActiveMenu('created');
    },
    watch: {
      '$route'(to, from) {
        this.setActiveMenu('watch');
      }
    },
    props: ['mode']
  }
</script>

<style lang="scss">
.db-header {
  .el-menu {
    display: inline-block;
    vertical-align: top;
    background-color: transparent;
    margin-left: 20px;
  }
  .el-menu--horizontal {
    .el-submenu {
      .el-menu {
        top: 34px;
        margin-left: 0;
        border: none;
        .el-menu-item {
          font-size: 12px;
        }
      }
      .el-submenu__title {
        height: 34px;
        line-height: 34px;
        padding: 0 10px;
        border-bottom: none;
        background-color: transparent;
        color: #EEE;
      }
    }
    .el-menu-item {
      padding: 0 10px;
      height: 36px;
      line-height: 36px;
    }
    >.el-menu-item, 
    >.el-submenu {
      margin-left: 10px;
      color: #EEE;
      border-bottom: 2px solid transparent;
      &.is-active, &:hover {
        background-color: rgba(200, 200, 200, 0.2);
        border-bottom-color: #EEE;
      }
    }
    .el-submenu__icon-arrow {
      color: #EEE;
    }
  }
}
</style>
