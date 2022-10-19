<!--
描述：充值界面——用于鸟币充值的页面
作者：蔡明宏
-->
<template>
  <div class="coin_home">
    <div class="floor">
      <!-- 用户信息 -->
      <div
        class="user-info"
        style="
          opacity: 0.8;
          background-image: url(https://img-home.csdnimg.cn/images/20211115092019.png);
        "
      >
        <img :src="this.user_info.user_profile" alt="" class="user-head" />
        <a class="user-head-warp"></a>
        <div class="user-desc">
          <div class="user-d-t">
            <span class="user-name">{{ this.user_info.user_name }}</span>
          </div>
          <!-- 下面这个标明等级 -->
          <p class="user-d-c">等级；{{ this.user_info.user_level }}</p>
        </div>
      </div>
      <!--  充值栏目-->
      <div class="tabs-content">
        <div class="card-box">
          <recharge-coin-card
            :coin_num="10"
            v-on:childByValue="childByValue"
          ></recharge-coin-card>
          <recharge-coin-card
            :coin_num="100"
            v-on:childByValue="childByValue"
          ></recharge-coin-card>
          <recharge-coin-card
            :coin_num="1000"
            v-on:childByValue="childByValue"
          ></recharge-coin-card>
          <recharge-coin-card
            :coin_num="10000"
            v-on:childByValue="childByValue"
          ></recharge-coin-card>
          <!-- 传入0是为了特殊的判断显示 -->
          <recharge-coin-card
            :coin_num="0"
            v-on:childByValue="childByValue"
          ></recharge-coin-card>
        </div>
        <div class="coin-index-right ">
          <div class="coin-index-right-title">如何充值？</div>
          <p class="coin-text-p">
            <span class="coin-i"></span>
            通过点击鸟币充值框，即可跳转至支付宝充值页面
          </p>
          <p class="coin-text-p">
            <span class="coin-i"></span>
            最后一栏的框内可以自定义输入鸟币，实现自由充值
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RechargeCoinCard from "../components/RechargeCoinCard.vue";
import axios from "axios";
import $ from "jquery";
export default {
  components: {
    RechargeCoinCard,
  },
  data() {
    return {
      coin_num: 0,
      money_num: 0,
      user_info: [],
      goods_name: "商品",
    };
  },
  watch: {
    coin_num(newVal, oldVal) {
      if (newVal > 0) {
        //当改变的值合法时
        this.money_num = newVal / 10; //更新对应金币数
        this.goods_name = this.coin_num + "鸟币商品";
        this.goPay();
      }
    },
  },
  methods: {
    childByValue: function (coin_num) {
      // coin_num就是子组件传过来的值
      this.coin_num = coin_num;
      this.goods_name = this.coin_num + "鸟币商品";
      console.log("this.coin_num:" + this.coin_num);
    },
    goPay() {
      if (this.coin_num > 0) {
        console.log("已调用goPay");
        console.log("goods_name:", this.goods_name);
        console.log("moeny_num:", this.money_num);
        axios
          .post("api/money/order", {
            user_id: this.user_info.user_id,
            name: this.goods_name,
            num: this.money_num,
          })
          .then((res) => {
            $("#divwapform").html(res.data); //给爷笑死了，混入jqurey
          })
          .catch((errMsg) => {
            console.log(errMsg);
            console.log("获取跳转支付网页失败");
          });
      } else {
        console.log("钱都是正数，充啥");
      }
    },
  },
  created() {
    this.user_info = this.$store.state.user_info;
  },
};
</script>

<style scoped>
#divwapform {
  height: 200px;
  width: 100%;
}
.floor {
  margin: 8px auto;
  width: 80%;
}
.user-info {
  height: 96px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border-radius: 8px 8px 0 0;
  color: #fff;
  padding: 0 16px;
  background: #1a1a2a
    url(https://csdnimg.cn/release/cmsfe/public/img/head-bg.0da969ec.png) 50%
    no-repeat;
  background-size: cover;
  position: relative;
}
.user-info .user-head {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 16px;
  margin-right: 8px;
}
.user-info .user-head-warp {
  position: absolute;
  width: 65%;
  height: 100%;
  left: 150px;
}
.user-info .user-desc {
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-top: 16px;
}
.user-info .user-desc .user-d-t {
  text-align: left;
  margin-bottom: 4px;
}
.user-info .user-desc .user-d-t .user-name {
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
}
.user-info .user-desc .user-d-c {
  text-align: left;
  color: #ccccd8;
  font-size: 12px;
  line-height: 22px;
}
.tabs-content {
  padding: 30px 36px;
  background-color: #fff;
}
.tabs-content .card-box {
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin-bottom: 16px;
  margin-top: 30px;
}
.pay-info {
  height: 229px;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
  font-size: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  position: relative;
}
.coin-index-right {
  width: 100%;
  padding: 24px 0 10px;
  padding-left: 2%;
  padding-bottom: 6%;
  background: #fff;
}
.coin-text-p {
  color: #6d757a;
  line-height: 24px;
  text-align: left;
}
.coin-index-right-title {
  color: #222;
  font-weight: 700;
  margin: 24px 0 20px;
  text-align: left;
}
.coin-text-p .coin-i {
  background: #00a1d7;
  border-radius: 6px;
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: -3px 5px 0 0;
  vertical-align: middle;
  text-align: left;
}
</style>
