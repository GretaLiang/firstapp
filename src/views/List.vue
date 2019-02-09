<template>
  <div>
    <div class="order">
      <div class="order-item" v-for="(order,index) in orderList" :key="index">
        <div class="order-logo">
          <img :src="'https://s3-ap-southeast-2.amazonaws.com//'+order.vendor.logo" alt="logo">
        </div>
        <div class="order-main">
          <div>
            {{order.vendor.nameCN }}
            {{order.vendor.phone}}
          </div>
          <div>{{order.vendor.address}}</div>
          <br>
          <div>
            {{order.address.name}}
            {{order.address.phone}}
          </div>
          <div>{{order.address.address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  name: "List",
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
.order {
  margin-bottom: 60px;
  z-index: 1;
}
.order-item {
  background-color: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 10px solid #f5f5f5;

  .order-logo {
    width: 150px;
    img {
      width: 100%;
    }
  }
  .order-main {
    padding-left: 15px;
    flex: 1;
    color: #323232;
    line-height: 1.6;
    p {
      color: #888;
    }
  }
}
</style>
