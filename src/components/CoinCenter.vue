<!--
描述：鸟币中心页面——用于鸟币记录管理的页面
作者：蔡明宏
-->
<template>
  <div class="coin_center_layout">
    <div class="inner-right">
      <div class="info-right-title">
        <span class="right-title-text">我的鸟币</span>
      </div>
      <div class="right-content-all">
        <div class="right-nav">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="鸟币首页" name="1">
              <div style="padding: 24px 20px">
                <div class="coin-inner">
                  <!-- 鸟币首页左侧信息 -->
                  <div class="coin-index-left">
                    <div class="coin-index-title">
                      <p class="coin-rest-p">
                        鸟币余额：
                        <i class="coin-num">{{ coin_num }}</i>
                        <a class="coin-recharge" @click="recharge">去充值</a>
                      </p>
                      <p class="coin-rest-info">
                        鸟币记录：
                        <span class="coin-rest-info-inco"
                          >您最近的变化情况</span
                        >
                      </p>
                    </div>
                    <div class="coin-left-content">
                      <div class="table-warpper">
                        <table class="table-normal">
                          <thead>
                            <tr>
                              <td class="table_1"><div>时间</div></td>
                              <td class="table_2"><div>变化</div></td>
                              <td class="table_3"><div>原因</div></td>
                            </tr>
                          </thead>
                          <tbody v-if="coin_change_list.length >= 7">
                            <tr
                              v-for="(item, index) in coin_change_list.slice(
                                0,
                                7
                              )"
                              :key="index"
                            >
                              <!-- 需要变化记录的数据：需要弄清鸟币部分的表是怎么做的！ -->
                              <td><div>{{item.change_time.replace("T"," ")}}</div></td>
                              <td><div>{{item.change_num}}</div></td>
                              <td><div>{{item.change_reason}}</div></td>
                            </tr>
                          </tbody>
                          <tbody v-else-if="coin_change_list.length > 0">
                            <!-- 此时不用截取7条数据 -->
                            <tr
                              v-for="(item, index) in coin_change_list"
                              :key="index"
                            >
                              <td><div>{{item.change_time.replace("T"," ")}}</div></td>
                              <td><div>{{item.change_num}}</div></td>
                              <td><div>{{item.change_reason}}</div></td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <div class="coin-left-nodata" style="display: none">
                              最近一周没有记录哦( ゜- ゜)
                            </div>
                          </tbody>
                        </table>
                      </div>

                      <p class="get-coin-more" @click="seeMore">查看更多记录 &gt;</p>
                    </div>
                  </div>
                  <!-- 鸟币首页右侧信息 -->
                  <div class="coin-index-right">
                    <div class="coin-index-right-title">鸟币有什么用？</div>
                    <p class="coin-text-p">鸟币是候鸟留学平台非常重要的物品</p>
                    <p class="coin-text-p">
                      <span class="coin-i"></span>
                      鸟币可以用于对优秀问答和帖子进行投币支持，这是对圈友的一种肯定
                    </p>
                    <p class="coin-text-p">
                      <span class="coin-i"></span>
                      鸟币还可用于悬赏问题，尽快得到答案
                    </p>
                    <div class="coin-index-right-title">如何快速获得鸟币？</div>
                    <p class="coin-text-p">
                      <span class="coin-i"></span>
                      鸟币可以通过充值迅速获得
                    </p>
                    <p class="coin-text-p">
                      <span class="coin-i"></span>
                      鸟币可以通过回答悬赏问题得到提问者采纳后获得
                    </p>
                    <p class="coin-text-p">
                      <span class="coin-i"></span>
                      圈友可通过发布问答等获得更多鸟币（所获投币的百分之十将作为该用户的鸟币收入奖励）
                    </p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="鸟币记录" name="2">
              <div style="padding: 24px 20px">
                <div class="coin-inner">
                  <div class="coin-index-title">
                    <p class="coin-rest-info">
                      鸟币记录：
                      <span class="coin-rest-info-inco">您最近的变化情况</span>
                    </p>
                  </div>
                  <div class="table-warpper">
                        <table class="table-normal">
                          <thead>
                            <tr>
                              <td class="table_1"><div>时间</div></td>
                              <td class="table_2"><div>变化</div></td>
                              <td class="table_3"><div>原因</div></td>
                            </tr>
                          </thead>
                          <tbody v-if="coin_change_list.length >= 7">
                            <tr
                              v-for="(item, index) in coin_change_list.slice(
                                0,
                                7
                              )"
                              :key="index"
                            >
                              <!-- 需要变化记录的数据：需要弄清鸟币部分的表是怎么做的！ -->
                              <td><div>{{item.change_time.replace("T"," ")}}</div></td>
                              <td><div>{{item.change_num}}</div></td>
                              <td><div>{{item.change_reason}}</div></td>
                            </tr>
                          </tbody>
                          <tbody v-else-if="coin_change_list.length > 0">
                            <!-- 此时不用截取7条数据 -->
                            <tr
                              v-for="(item, index) in coin_change_list"
                              :key="index"
                            >
                              <td><div>{{item.change_time.replace("T"," ")}}</div></td>
                              <td><div>{{item.change_num}}</div></td>
                              <td><div>{{item.change_reason}}</div></td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <div class="coin-left-nodata" style="display: none">
                              最近一周没有记录哦( ゜- ゜)
                            </div>
                          </tbody>
                        </table>
                      </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  components: {
    ElMessage,
  },
  data() {
    return {
      coin_num: 108, //鸟币数
      coin_change_list: [], //鸟币的改变记录
      activeName:'1',
    };
  },
  created() {
    if (!this.$store.state.is_login) {
      ElMessage({
        message: "请先登录",
        type: "warning",
        showClose: true,
        duration: 2000,
      });
      /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
      this.$router.push({
        path: "/login",
        query: { redirect: this.$route.fullPath },
      });
    }
    axios({
      url: "/money/record?user_id=" + this.$store.state.user_info.user_id,
    })
      .then((res) => {
        console.log("鸟币")
        console.log(res);
        this.coin_change_list = res.data.data.record_list;
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  },
  methods:{
    seeMore(){
      this.activeName='2';
    },
    recharge(){
      router.push({
        name:"recharge"
          })
    },
  }
};
</script>

<style scoped>
.info-right-title {
  height: 60px;
  padding-left: 30px;
  border-bottom: 2px solid #ddd;
}
.right-content-all {
  width: 96%;
  background-color: #f1f9ff;
  border-radius: 30px;
  padding: 1% 0 0 2%;
}
.right-title-text {
  float: left;
  margin: 15px 0 0 0;
  font-size: 20px;
  cursor: default;
}
.coin_center_layout {
  background-color: white;
  padding-left: 5%;
  height: 800px;
}
.inner-right {
  width: 99%;
  background-color: #f1f9ff;
  border-radius: 30px;
  margin-bottom: 3%;
}
.right-nav .el-tabs ::v-deep .el-tabs__item {
  height: 50px;
  position: relative;
  font-size: 15px;
  text-align: center;
  padding: 0 20px; /*关键的第一列的宽度*/
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-weight: 500;
  color: #303133;
}
.coin-inner {
  overflow: auto;
  min-height: 600px;
}
.coin-index-left {
  float: left;
  width: 60%;
  padding-bottom: 10px;
}
.coin-index-title {
  width: 100%;
  height: 20%;
}
.coin-rest-p {
  color: #222;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: left;
}
.coin-num {
  margin-left: 20px;
  color: #00a1d7;
  font-size: 24px;
  margin-right: 85px;
}

.coin-recharge{
  color: #fff;
  background: #fc5531;
  display: inline-block;
  width: 72px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 15px;
  font-size: 14px;
  cursor:pointer;
}
/* 对于放上之后的颜色修改 */
.coin-recharge:hover{
  background: #ae2304;
}
.coin-rest-info {
  color: #222;
  font-weight: 500;
  text-align: left;
}
.coin-rest-info-inco {
  color: #aaa;
  font-weight: 400;
  /* margin-left: 15px; */
}
.table-warpper {
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 2px;
  margin-top: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}
.table-normal {
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  table-layout: fixed;
}
.table-normal thead tr td {
  text-align: center;
  background: #f5f5f5;
  height: 42px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  font-weight: 700;
}
.get-coin-more {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #555;
  display: block;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  text-align: center;
  line-height: 32px;
  cursor:pointer;
}
.coin-left-nodata {
  width: 368px;
  color: #99a2aa;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.coin-index-right {
  float: left;
  width: 35%;
  padding: 24px 0 10px;
  margin-left: 5%;
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
.table-normal tbody tr td {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.table-normal tbody tr td:first-child {
    border-left: none;
}
.table_1 {
    width: 36%;
}
.table_2 {
    width: 21%;
}
.coin-record .table_3 {
    width: 43%;
}
</style>