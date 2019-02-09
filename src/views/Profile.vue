<template>
  <div>
    <br>
    <br>
    <div class="avatar">
      <img
        src="https://s3-ap-southeast-2.amazonaws.com/gogox-public/system/default_avatar.png"
        alt="User Logo"
        class="profile__avatar"
      >
    </div>
    <div class="driver">
      <br>
      <p>Greta</p>
      <p>0210342868</p>
    </div>
    <br>
    <br>
    <br>
    <div class="log-out">
      <span @click="logout">登出</span>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";

export default {
  name: "home",
  store,

  data() {
    return {
      orderList: [],
      order: this.$store.state.lists,
      isShow: false,
      current: "",
      chooseOne: ""
    };
  },
  computed: {
    lists() {
      return store.state.lists;
    }
  },
  created() {
    this.getOrderList();
    this.getDriver();
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push({ name: "login" });
    },
    choose(index) {
      this.current = index;
    },
    async getOrderList() {
      try {
        const { data } = await this.$http({
          url: "https://dev.gogox.co.nz/v1/core/order/driver/orders",
          params: { driverID: window.localStorage.getItem("userID") },
          headers: {
            Authorization: window.localStorage.getItem("accessToken")
          }
        });
        this.orderList = data.data;
      } catch (error) {}
    },
    async getDriver() {
      try {
        const { data } = await this.$http({
          url: "https://dev.gogox.co.nz/v1/core/delivery/driver",
          params: { id: window.localStorage.getItem("userID") },
          headers: {
            Authorization: window.localStorage.getItem("accessToken"),
            "X-GOGO-ORIGIN": "driver"
          }
        });
        console.log(data);
      } catch (error) {}
    },
    showInfo(item) {
      this.chooseOne = item;
      this.isShow = true;
      this.current = "";
    }
  }
};
</script>


<style scoped lang="scss">
$main-color: #0085ff;

.avatar {
  text-align: center;
  font-size: 10px;
}
.driver {
  text-align: center;
  font-size: 25px;
}
.log-out {
  background-color: rgb(211, 211, 211);
  line-height: 3;
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>