<template lang="html">
  <el-menu theme="light" :default-active="activeMenu" class="db-menu-bar" :mode="mode" router @select="handleSelect">
    <template v-for="(route, index) in $router.options.routes[$router.options.routes.length - 2].children">
      <template v-if="route.children && route.name">
        <el-submenu :index="route.name">
          <template slot="title"><i :class="route.iconClass"></i>{{route.name}}</template>
          <el-menu-item :index="cRoute.name" v-for="(cRoute, cIndex) in route.children" :route="cRoute">{{cRoute.name}}</el-menu-item>
        </el-submenu>
      </template>

      <template v-if="!route.children && route.name">
        <el-menu-item :index="route.name" :route="route"><i :class="route.iconClass"></i>{{route.name}}</el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
  export default {
    name: 'db-navbar',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {
      this.activeMenu = this.$route.name;
    },
    watch: {
      '$route'(to, from) {
        this.activeMenu = this.$route.name;
      }
    },
    props: ['mode']
  }
</script>
