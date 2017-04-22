<template lang="html">
  <div class="user-info" v-if="user.id">
    <span v-text="user.username"></span>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img :src="user.avatar">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '',
        username: '',
        avatar: ''
      },
      activeMenu: ''
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  watch: {
    '$route'(to, from) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  },
  methods: {
    logout() {
      this.$confirm('确定要注销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        localStorage.removeItem('user');
        this.$router.push({ path: '/login' });
      }).catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.db {
  .db-header {
    .user-info {
      float: right;
      img {
        width: 25px;
        height: 25px;
        vertical-align: -7px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
