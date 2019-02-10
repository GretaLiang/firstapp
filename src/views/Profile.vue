<template>
  <div>
    <br>
    <br>
    <div class="driver">
      <center>
        <img :src="'https://s3-ap-southeast-2.amazonaws.com//'+driver.avatar" alt="User Logo">
      </center>
      <br>
      <div>{{driver.legalName}}</div>
      <div>{{driver.phone}}</div>
      <br>
      <br>
      <div class="log-out">
        <span @click="logout">ç™»å‡º</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";

export default {
  name: "Profile",
  store,

  data() {
    return {
      driver: [],
      //driver: this.$store.state.lists,
      isShow: false,
      current: "",
      chooseOne: ""
    };
  },
  computed: {
    // lists() {
    //   return store.state.lists;
    // }
  },
  created() {
    // this.getDriverList();
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
    // async getDriverList() {
    //   try {
    //     const { data } = await this.$http({
    //       url: "https://dev.gogox.co.nz/v1/core/order/driver/orders",
    //       params: { driverID: window.localStorage.getItem("userID") },
    //       headers: {
    //         Authorization: window.localStorage.getItem("accessToken")
    //       }
    //     });
    //     this.driverList = data.data;
    //   } catch (error) {}
    // },
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
        //console.log(data);
        this.driver = data.data;
        console.log(this.driver.avatar);
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

img {
  width: 150px;
  height: 150px;
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
