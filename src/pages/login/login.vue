<template lang="html">
  <div class="login-page" id="particles">
    <el-form class="login-form" @keyup.enter="login" @submit="login">
      <div class="input-group">
        <div class="title">Element Dashboard</div>
        <el-input
          :autofocus="true"
          placeholder="请输入用户名"
          icon="time"
          v-model="username">
        </el-input>
      </div>
      <div class="input-group">
        <el-input
          placeholder="请输入密码"
          type="password"
          icon="time"
          v-model="password">
        </el-input>
      </div>
      <div class="input-group">
        <label>记住我？</label>
        <el-switch
          v-model="rememberMe"
          on-text=""
          off-text="">
        </el-switch>
      </div>
      <div class="input-group">
        <el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { requestLogin } from 'src/api/api';
import {} from 'particles.js';
import particlesData from '../../assets/particles';
export default {
  data() {
    return {
      username: 'vvliebe',
      password: '123456',
      rememberMe: false,
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  mounted() {
    window.particlesJS('particles', particlesData || {});
  },
  methods: {
    login() {
      if (!this.username) {
        this.$message.error('请填写用户名！！！');
        return;
      }
      if (!this.password) {
        this.$message.error('请填写密码');
        return;
      }
      let loginParams = {username: this.username, password: this.password};
      this.isBtnLoading = true;
      requestLogin(loginParams).then(data => {
        this.isBtnLoading = false;
        let { msg, code, user } = data;
        if (code !== 200) {
          this.$message.error(msg);
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          if (this.$route.query.redirect) {
            this.$router.push({path: this.$route.query.redirect});
          } else {
            this.$router.push({path: '/list'});
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
  .login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(100, 100, 100, 0.1);;

    > canvas {
      position: absolute;
      z-index: -1;
    }

    .login-form {
      min-width: 320px;
      padding-bottom: 20px;
      border-radius: 10px;
      background-color: #FFF;
      border: 1px #eaeaea solid;
      box-shadow: 0 0 25px #cac6c6;
      z-index: 1;

      .title {
        margin-bottom: 20px;
        color: #20a0ff;
        font-weight: bold;
        font-size: 26px;
        text-align: center;
      }

      .input-group {
        margin: 30px auto 0;
        width: 80%;
        button {
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 444px) {
    .login-page {
      height: inhert;
      background-color: #FFF;
      .login-form {
        border: 0;
        box-shadow: none;
      }
    }
  }
</style>
