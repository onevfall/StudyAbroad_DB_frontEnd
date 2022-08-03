<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-container>
        <el-main>
          <el-tabs
            tab-position="left"
            style="height: 100%"
            class="demo-tabs"
            v-model="activeName"
          >
            <!-- 基本信息页 -->
            <el-tab-pane label="基本信息" class="selects" name="1">
              <!-- 基本信息 -->
              <person-info-box></person-info-box>
              <!-- <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span style="font-size: 20px">基本信息</span>
                    <el-button id="change" type="success" round>修改</el-button>
                  </div>
                </template>

                <el-card class="content">
                  <div class="info_head">
                    <img src="../assets/logo.png" class="head_portrait" />
                    <div class="top_info">
                      <div>
                        <span style="font-size: 20px; font-weight: bold">{{
                          this.person_info.person_nickname
                        }}</span
                        ><span style="font-size: 3px; color: gray"
                          >用户等级{{ this.person_info.person_level }}</span
                        >
                      </div>
                      <div
                        style="font-size: 3px; text-align: left; color: gray"
                      >
                        <span style="margin-right: 5%"
                          >粉丝数：{{ this.person_info.person_fans_num }}</span
                        ><span
                          >关注数：{{
                            this.person_info.person_follow_num
                          }}</span
                        >
                      </div>
                      <div
                        style="font-size: 3px; text-align: left; color: gray"
                      >
                        <span
                          >鸟币数：{{ this.person_info.person_birdcoin }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <el-row class="bottom_info">
                    <el-col class="bottom_info_attr" :span="5">性别</el-col>
                    <el-col class="bottom_info_value" :span="5">{{
                      this.person_info.person_sex
                    }}</el-col>
                    <el-col class="bottom_info_attr" :span="5">身份</el-col>
                    <el-col class="bottom_info_value" :span="5">{{
                      this.person_info.person_identity
                    }}</el-col>
                    <el-col class="bottom_info_attr" :span="5">手机号码</el-col>
                    <el-col class="bottom_info_value" :span="5">{{
                      this.person_info.person_phone
                    }}</el-col>
                    <el-col class="bottom_info_attr" :span="5">邮箱</el-col>
                    <el-col class="bottom_info_value" :span="5">{{
                      this.person_info.person_email
                    }}</el-col>
                    <el-col class="bottom_info_attr" :span="5">个性签名</el-col>
                    <el-col class="bottom_info_value" :span="5">{{
                      this.person_info.person_signature
                    }}</el-col>
                  </el-row>
                </el-card>
              </el-card>
              
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span style="font-size: 20px">个人资料</span>
                    <el-button id="change" type="success" round>修改</el-button>
                  </div>
                </template>
                <el-card class="content">
                  <el-row class="detail_info">
                    <el-col class="detail_info_attr" :span="11">中文名</el-col>
                    <el-col class="detail_info_value" :span="11">{{
                      this.person_info.person_chinesename
                    }}</el-col>
                    <el-col class="detail_info_attr" :span="11">英文名</el-col>
                    <el-col class="detail_info_value" :span="11">{{
                      this.person_info.person_englishname
                    }}</el-col>
                    <el-col class="detail_info_attr" :span="11"
                      >出生日期</el-col
                    >
                    <el-col class="detail_info_value" :span="11">{{
                      this.person_info.person_birthday
                    }}</el-col>
                    <el-col class="detail_info_attr" :span="11"
                      >目前居住城市</el-col
                    >
                    <el-col class="detail_info_value" :span="11">{{
                      this.person_info.preson_city
                    }}</el-col>
                    <el-col class="detail_info_attr" :span="11"
                      >个性签名</el-col
                    >
                    <el-col class="detail_info_value" :span="11">{{
                      this.person_info.person_want
                    }}</el-col>
                  </el-row>
                </el-card>
              </el-card> -->
            </el-tab-pane>

            <el-tab-pane label="鸟币中心" name="2">
              <coin-center></coin-center>
            </el-tab-pane>
            <el-tab-pane label="学历认证" name="3">
              <certification-center></certification-center>
            </el-tab-pane>
            <el-tab-pane label="消息中心（我的举报）">
              <information-center></information-center>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CertificationCenter from "../components/CertificationCenter.vue";
import PersonInfoBox from "../components/PersonInfoBox.vue";
import CoinCenter from "../components/CoinCenter.vue";

import InformationCenter from "../components/InformationCenter.vue";

import { ElMessage } from "element-plus";
import { ref } from "vue";
export default {
  components: {
    PersonInfoBox,
    CoinCenter,
    CertificationCenter,
    InformationCenter,
  },
  props: ["selectName"],
  data() {
    return {
      person_info: "",
      activeName: "1",
    };
  },
  created() {
    if (typeof this.$route.query.selectName != "undefined")
      this.activeName = this.$route.query.selectName;
  },
  methods: {},
};
</script>

<style scoped>
#info_list {
  list-style-type: none;
  padding: 0;
}
.el-main {
  background-color: #f1f9ff;
  padding-right: 0;
  padding-top: 0;
  height: 800px;
}

.el-tabs ::v-deep .el-tabs__item {
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: left;
  padding-right: 100px;
  padding-left: 1px;
}

.selects {
  background-color: white;
  padding-left: 5%;
  height: 800px;
  overflow: auto;
}

/* 基本信息封装组件 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#change {
  width: 8%;
}
.content {
  width: 95%;
  margin-right: 8%;
  border-radius: 20px;
}

.box-card {
  width: 99%;
  background-color: #f1f9ff;
  border-radius: 30px;
  margin-bottom: 3%;
}
/* 基本信息封装组件 */
.content .info_attribute {
  width: 50%;
}
.info_head {
  display: flex;
  border-bottom: 1px solid #000;
}
.head_portrait {
  height: 56px;
}
.top_info {
  margin-left: 1%;
}
.bottom_info .bottom_info_attr {
  color: gray;
  margin-top: 1%;
}
.bottom_info .bottom_info_value {
  margin-top: 1%;
  text-align: left;
}
.detail_info {
  margin-top: 3%;
  margin-bottom: 2%;
}
.detail_info .detail_info_attr {
  color: gray;
  margin-top: 1%;
  text-align: right;
  margin-right: 6%;
  font-family: "STFangsong";
}
.detail_info .detail_info_value {
  margin-top: 1%;
  text-align: left;
  font-family: "STSong";
  font-weight: bold;
}
.switch_button {
  width: 80%;
}
</style>
