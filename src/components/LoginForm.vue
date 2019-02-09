<template>
  <form class="form-wrapper">
    <div class="info">GO! Driver!</div>
    <div class="form-input">
      <label>用户名</label>
      <input type="text" v-model="name">
    </div>
    <div class="form-input">
      <label>密码</label>
      <input type="password" v-model="password">
    </div>
    <div class="btns">
      <button type="button" @click="submit()">登录</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      console.log(this.name);
      console.log(this.password);
      try {
        const { data } = await this.$http({
          url: "https://dev.gogox.co.nz/v1/core/user/login",
          method: "post",
          data: {
            account: this.name,
            password: this.password
          }
        });
        console.log("---");
        console.log(data.data.accessToken);
        window.localStorage.setItem("token", data.data.Token);
        window.localStorage.setItem("userID", data.data.userID);
        window.localStorage.setItem("refreshToken", data.data.refreshToken);
        window.localStorage.setItem("expiresAt", data.data.expiresAt);
        window.localStorage.setItem("accessToken", data.data.accessToken);
        this.$router.push({ name: "list" });
        this.$router.push({ name: "list" });
      } catch (error) {
        alert("登录失败，请检查用户名与密码");
      }
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  margin: auto;
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  vertical-align: middle;
  display: table-cell;
}
.info {
  padding: 30px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  font-family: Georgia, serif;
  font-size: 20px;
}
</style>
