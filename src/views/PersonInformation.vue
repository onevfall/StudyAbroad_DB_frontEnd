<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-container>
        <el-main>
          <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
            <!-- 基本信息页 -->
            <el-tab-pane label="基本信息" class="selects">
              <!-- 基本信息 -->
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span style="font-size: 20px">基本信息</span>
                    <el-button id="change" type="success" round>修改</el-button>
                  </div>
                </template>

                <el-card class="content">
                  <div class="info_head">
                    <img src="../assets/logo.png" class="head_portrait" />
                    <!-- <el-avatar size="large" src="../assets/logo.png" /> -->
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
              <!-- 个人资料 -->
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
              </el-card>
            </el-tab-pane>
            <!-- 关注/粉丝页 -->
            <el-tab-pane label="关注/粉丝" class="selects">
              <!-- 关注列表 -->
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span style="font-size: 20px">关注列表</span>
                    <div class="switch_button">
                      <el-button style="width: 8%; border-radius: 10px"
                        >用户</el-button
                      >
                      <el-divider direction="vertical" />
                      <el-button style="width: 8%; border-radius: 10px"
                        >高校</el-button
                      >
                      <el-divider direction="vertical" />
                      <el-button style="width: 8%; border-radius: 10px"
                        >机构</el-button
                      >
                    </div>
                  </div>
                </template>
                <el-card class="content">
                  <div
                    class="follow_person_list"
                    v-for="follow_person in follow_person_list"
                    :key="follow_person.id"
                  >
                    <el-avatar :size="70" :src="follow_person.head_portrait" />
                    <div style="display: block; width: 100%">
                      <div
                        style="
                          font-size: 20px;
                          font-weight: bold;
                          margin-left: 2%;
                          margin-bottom: 3%;
                          text-align: left;
                        "
                      >
                        {{ follow_person.nickname }}
                      </div>
                      <div
                        style="
                          font-size: 15px;
                          font-weight: normal;
                          margin-left: 2%;
                          text-align: left;
                        "
                      >
                        个性签名：{{ follow_person.signature }}
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-card>
              <!-- 粉丝列表 -->
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span style="font-size: 20px">粉丝列表</span>
                    <div class="switch_button">
                      粉丝数：{{ person_info.person_fans_num }}
                    </div>
                  </div>
                </template>
                <el-card class="content">
                  <div class="fans_list" v-for="fan in fans_list" :key="fan.id">
                    <el-avatar :size="70" :src="fan.head_portrait" />
                    <div style="display: block; width: 100%">
                      <div style="display: flex; width: 100%">
                        <span
                          style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 3%;
                            text-align: left;
                          "
                        >
                          {{ fan.nickname }}
                        </span>
                        <span
                          style="margin-left: 5%; color: gray; font-size: 3px"
                          >ta在{{ fan.date }}关注了你</span
                        >
                      </div>
                      <div
                        style="
                          font-size: 15px;
                          font-weight: normal;
                          margin-left: 2%;
                          text-align: left;
                        "
                      >
                        个性签名：{{ fan.signature }}
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-card>
            </el-tab-pane>
            <!-- 收藏页 -->
            <el-tab-pane label="收藏" class="selects">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span style="font-size: 20px">收藏夹</span>
                    <!-- 板块切换按钮 -->
                    <div class="switch_button">
                      <el-button
                        id="star_btn1"
                        style="width: 8%; border-radius: 10px"
                        @click="switch_plate(1)"
                        >问题</el-button
                      >
                      <el-divider direction="vertical" />
                      <el-button
                        id="star_btn2"
                        style="width: 8%; border-radius: 10px"
                        @click="switch_plate(2)"
                        >回答</el-button
                      >
                      <el-divider direction="vertical" />
                      <el-button
                        id="star_btn3"
                        style="width: 8%; border-radius: 10px"
                        @click="switch_plate(3)"
                        >动态</el-button
                      >
                    </div>
                  </div>
                </template>
                <el-card class="content">
                  <!-- 收藏问题板块 -->
                  <div id="star_show1">
                    <div
                      id="star_question_list"
                      v-for="question in star_question_list"
                      :key="question.id"
                    >
                      <div style="display: block; width: 60%">
                        <div
                          style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          "
                        >
                          {{ question.title }}
                        </div>
                        <div
                          style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            text-align: left;
                          "
                        >
                          {{ question.description }}
                        </div>
                      </div>
                      <div class="question_date">
                        <div>收藏于{{ question.star_date }}</div>
                        <div>发布于{{ question.date }}</div>
                      </div>
                    </div>
                  </div>
                  <!-- 收藏回答板块(key) -->
                  <div id="star_show2">
                    <div
                      id="star_answer_list"
                      v-for="answer in star_answer_list"
                      :key="answer"
                    >
                      <div style="display: block; width: 60%">
                        <div
                          style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          "
                        >
                          {{ answer.title }}
                        </div>
                        <div
                          style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            text-align: left;
                          "
                        >
                          {{ answer.nickname }}：{{ answer.content }}
                        </div>
                      </div>
                      <div class="question_date">
                        <div>收藏于{{ answer.star_date }}</div>
                        <div>发布于{{ answer.date }}</div>
                      </div>
                    </div>
                  </div>
                  <!-- 收藏动态板块 -->
                  <div id="star_show3">
                    <div
                      id="star_blog_list"
                      v-for="blog in star_blog_list"
                      :key="blog.id"
                    >
                      <div style="display: block; width: 60%">
                        <div
                          style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          "
                        >
                          {{ blog.nickname }}：{{ blog.content }}
                        </div>
                        <div style="margin-left: 2%; display: flex">
                          <div v-for="imag in blog.images" :key="imag">
                            <img
                              class="blog_image"
                              :src="imag"
                              style="text-align: left"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="question_date">
                        <div>收藏于{{ blog.star_date }}</div>
                        <div>发布于{{ blog.date }}</div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="财务">财务</el-tab-pane>
            <el-tab-pane label="发布历史">发布历史</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import PersonInfoBox from "../components/PersonInfoBox.vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";
export default {
  components: { PersonInfoBox },
  data() {
    return {
      person_info: "",
      follow_person_list: [],
      follow_university_list: [],
      follow_institution_list: [],
      fans_list: [],
      star_question_list: [],
      star_answer_list: [],
      star_blog_list: [],
    };
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    //暂时将所有数据都在页面初始化时加载完，之后将改进为点击标签页才加载相应数据
    var tmp_person_info = {
      person_id: 1,
      person_nickname: "你的名字（昵称）",
      person_level: 1,
      person_fans_num: 1,
      person_follow_num: 2,
      person_birdcoin: 999,
      person_sex: "男",
      person_identity: "学生",
      person_signature: "呵呵。",
      person_phone: "114514",
      person_email: "114514@qq.com",
      person_chinesename: "你的中文名",
      person_englishname: "你的英文名",
      person_birthday: "2202.15.7",
      preson_city: "上海",
      person_want: "留学",
    };
    this.person_info = tmp_person_info;

    var tmp_follow_person_info = {
      id: 0,
      nickname: "阿波尼亚",
      head_portrait:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      signature: "逐火十三英桀",
    };
    for (let i = 0; i < 3; ++i) {
      this.follow_person_list.push(tmp_follow_person_info);
    }
    var tmp_follow_university_info = {};
    var tmp_follow_institution_info = {};
    var tmp_fans_info = {
      id: 1,
      nickname: "张角",
      head_portrait:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      signature: "苍天已死，黄天当立；岁在甲子，天下大吉。雷公助我！",
      date: "2022/7/15",
    };
    for (let i = 0; i < 3; ++i) {
      this.fans_list.push(tmp_fans_info);
    }
    var tmp_star_question_info = {
      id: 0,
      title: "为什么要编程？",
      date: "2022/7/14",
      star_date: "2022/7/15",
      description: "为什么要编程？",
    };
    for (let i = 0; i < 3; ++i) {
      this.star_question_list.push(tmp_star_question_info);
    }
    var tmp_star_answer_info = {
      question_id: 0,
      answer_id: 0,
      title: "为什么要编程？",
      nickname: "xxx",
      content: "谢邀。人在美国，刚下飞机。编程使我快乐。",
      like_num: 999,
      coin_num: 999,
      date: "2022/7/14",
      star_date: "2022/7/15",
    };
    for (let i = 0; i < 3; ++i) {
      this.star_answer_list.push(tmp_star_answer_info);
    }
    var tmp_star_blog_info = {
      id: 0,
      nickname: "xxx",
      content: "hhhhhhhhhhhhhhhhhhhhhhhhhh",
      images: [
        "http://img2.huashi6.com/images/resource/thumbnail/2022/04/18/133350_3001344557.jpg?imageMogr2/quality/75/interlace/1/thumbnail/700x/gravity/North/crop/700x1041/format/webp",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0623%252F3dce3cf1j00qv5v7d001cd000dw00h6p.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660503308&t=2a4f741f226648d47ca3dd8538a7905f",
        "https://img2.baidu.com/it/u=697131356,3954126737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501",
      ],
      like_num: 999,
      coin_num: 999,
      date: "2022/7/14",
      star_date: "2022/7/15",
    };
    for (let i = 0; i < 3; ++i) {
      this.star_blog_list.push(tmp_star_blog_info);
    }
  },
  methods: {
    switch_plate(e) {
      if (e == 1) {
        document.getElementById("star_show1").style.display = "block";
        document.getElementById("star_show2").style.display = "none";
        document.getElementById("star_show3").style.display = "none";
      } else if (e == 2) {
        document.getElementById("star_show1").style.display = "none";
        document.getElementById("star_show2").style.display = "block";
        document.getElementById("star_show3").style.display = "none";
      } else {
        document.getElementById("star_show1").style.display = "none";
        document.getElementById("star_show2").style.display = "none";
        document.getElementById("star_show3").style.display = "block";
      }
    },
  },
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
/* .demo-tabs > .el-tabs__content {
  padding: 32px;
  font-size: 64px;
  font-weight: 600;
} */
.el-tabs ::v-deep .el-tabs__item {
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: left;
  padding-right: 100px;
  padding-left: 1px;
}

/* .el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
} */

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

.follow_person_list,
.fans_list {
  border-bottom: 1px solid #000;
  display: flex;
  padding-bottom: 1%;
  margin-bottom: 1%;
  padding-left: 10%;
}
#star_question_list {
  border-bottom: 1px solid #000;
  display: flex;
  padding-bottom: 1%;
  margin-bottom: 1%;
  padding-left: 10%;
  display: flex;
}
#star_answer_list {
  border-bottom: 1px solid #000;
  display: flex;
  padding-bottom: 1%;
  margin-bottom: 1%;
  padding-left: 10%;
}
#star_blog_list {
  border-bottom: 1px solid #000;
  display: flex;
  padding-bottom: 1%;
  margin-bottom: 1%;
  padding-left: 10%;
}
#star_show1 {
  display: block;
}
#star_show2 {
  display: none;
}
#star_show3 {
  display: none;
}

.question_date {
  font-size: 3px;
  color: gray;
}
.blog_image {
  width: 100px;
  height: 100px;
  margin-left: 20px;
}
</style>
