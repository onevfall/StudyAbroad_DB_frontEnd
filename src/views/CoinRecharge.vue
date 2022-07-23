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
        <img
          src="https://profile.csdnimg.cn/A/1/4/1_qq_54928033"
          alt=""
          class="user-head"
        />
        <a class="user-head-warp"></a>
        <div class="user-desc">
          <div class="user-d-t">
            <span class="user-name">onevfall{{}}</span>
          </div>
          <!-- 下面这个标明等级 -->
          <p class="user-d-c">等级；3{{}}</p>
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
        <div class="pay-info">
          <pay-view></pay-view>
        </div>
      </div>
      <div id="divwapform" >
        <!--网页端测试代码-->
        
      </div>
    </div>
  </div>
</template>

<script>
import RechargeCoinCard from "../components/RechargeCoinCard.vue";
import PayView from "../views/PayView.vue";
export default {
  components: {
    RechargeCoinCard,
    PayView,
  },
  data() {
    return {
      coin_num: 0,
      money_num: 0,
    };
  },
  watch: {
    coin_num(newVal, oldVal) {
      if (newVal > 0) {
        //当改变的值合法时
        this.money_num = newVal / 10; //更新对应金币数
        this.goPay();
      }
    },
  },
  methods: {
    childByValue: function (coin_num) {
      // coin_num就是子组件传过来的值
      this.coin_num = coin_num;
      console.log("this.coin_num:" + this.coin_num);
    },
    goPay() {
      console.log("已调用goPay")

      ;
    },
  },
};
</script>

<style scoped>
#divwapform{
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
</style>

