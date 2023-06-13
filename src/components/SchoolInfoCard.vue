<!--
高校信息卡
描述：展示高校具体各板块信息
作者：张子涵、焦佳宇（部分调用web api）
-->
<template>
  <div class="info_border" id="0">
    <div class="tips_bar"></div>
    <span style="font-size: 30px; line-height: 60px">基本信息</span>

    <el-container class="info_table">
      <el-main>
        <div style="color: coral">
          <img
            src="../assets/location.png"
            style="filter: drop-shadow(0 0 0 coral)"
          />
          {{ school.universityCountry }}
        </div>
        <div>
          <img src="../assets/navigator.png" /> 学校官方网站：<a
            :href="this.school.university_website"
            target="_blank"
            >{{ school.university_website }}</a
          >
        </div>
        <div>
          <img src="../assets/message.png" /> 国际学生招生处联系邮箱：<a
            href="#"
            target="_blank"
            >{{ school.universityEmail }}</a
          >
        </div>
        <div>
          <img src="../assets/dollar.png" /> 国际学生年度学费：<span
            style="color: coral; font-size: larger"
            >{{ school.universityTuition }}</span
          >
        </div>
        <!-- <div>
          <img src="../assets/uni_currency.png" />
          在校人数：
          <span style="color: coral; font-size: larger"
            >{{ school.university_student_num }}
          </span>
        </div>
        <div>
          <img src="../assets/uni_currency.png" />
          教师人数：
          <span style="color: coral; font-size: larger"
            >{{ school.university_teacher_num }}
          </span>
        </div> -->
      </el-main>

      <el-aside width="45%">
        <div>
          <!-- <img src="../assets/location.png" /><br />
          <span class="info_tag">国家</span>：<span class="info_content"
            >{{ school.university_country }} </span
          ><br /> -->
          <!-- <span class="info_tag">省份</span>：<span class="info_content">{{
            school.university_location
          }}</span
          ><br /> -->
          <br />
          <span class="info_tag">学校</span>：<span class="info_content">{{
            school.universityChName
          }}</span
          ><br />
          <span class="info_tag">名称</span>：<span class="info_content">{{
            school.universityEnName
          }}</span>
        </div>
      </el-aside>
    </el-container>
  </div>

  <div class="info_border" id="1">
    <div class="tips_bar"></div>
    <span style="font-size: 30px; line-height: 60px">学校地址</span>
    <el-container class="info_table">
      <el-main>
        <BmapDemo :school="this.school"></BmapDemo>
      </el-main>

      <el-aside width="34%" class="location_info">
        <br />
        <div v-loading="this.weather == null">
          <weather
            :weather_info="this.weather"
            v-if="this.weather != null"
          ></weather>
        </div>
      </el-aside>
    </el-container>
  </div>

  <div class="info_border" id="3">
    <div class="tips_bar"></div>
    <span style="font-size: 30px; line-height: 60px">官方信息</span>

    <el-container class="info_table" v-loading="relevant_pages == null">
      <div v-if="relevant_pages != null">
        <div
          style="
            font-family: 'Times New Roman', Times, serif;
            font-size: x-large;
            width: 95%;
            margin-left: 2.5%;
            font-weight: bold;
            margin-bottom: 20px;
          "
        >
          {{ this.relevant_pages[0].snippet }}
        </div>
        <div
          v-for="deepLink in relevant_pages[0].deepLinks"
          :key="deepLink"
          style="margin-bottom: 20px"
        >
          <CollegeRelevantPage :page="deepLink"></CollegeRelevantPage>
        </div>
      </div>
    </el-container>
  </div>
  <div class="info_border" id="5">
    <div class="tips_bar"></div>
    <span style="font-size: 30px; line-height: 60px">相关资料</span>
    <el-container class="info_table" v-loading="relevant_pages == null">
      <div v-if="relevant_pages != null">
        <div
          v-for="link in relevant_pages.slice(1)"
          :key="link"
          style="margin-bottom: 20px"
        >
          <CollegeRelevantPage :page="link"></CollegeRelevantPage>
        </div>
      </div>
    </el-container>
  </div>
  <div class="info_border" id="2">
    <div class="tips_bar"></div>
    <span style="font-size: 30px; line-height: 60px">本研申请要求</span>
    <div class="info_table">
      <div class="score_info">
        <img src="../assets/cup.png" /> <span class="info_tag"> 平均SAT</span>：
        <span class="score_content">1400</span>
        <el-button type="primary" plain @click="goGRE" style="margin-left: 20px;">查看SAT考试详细信息</el-button> 
      </div>
      <div>
        <img src="../assets/cup.png" />
        <span class="info_tag"> TOEFL需求</span>：
        <span class="score_content">{{
          school.universityTofelRequirement
        }}</span>
        <el-button type="primary" plain @click="goTOEFL" style="margin-left: 20px;">查看TOEFL考试详细信息</el-button> 
      </div>
      <div>
        <img src="../assets/cup.png" />
        <span class="info_tag"> IELTS需求</span>：
        <span class="score_content">{{
          school.universityIeltsRequirement
        }}</span>
        <el-button type="primary" plain @click="goIELTS" style="margin-left: 20px;">查看IELTS考试详细信息</el-button> 
      </div>
      <div>
        <img src="../assets/cup.png" />
        <span class="info_tag"> GRE需求</span>：
        <span class="score_content">320 + 3.5</span>
        <el-button type="primary" plain @click="goGRE" style="margin-left: 20px;">查看GRE考试详细信息</el-button> 
      </div>
      <div>
        <img src="../assets/dollar.png" />
        <span class="info_tag"> 国际学生年度学费</span>：
        <span class="score_content">{{ school.universityTuition }}</span>
      </div>
    </div>
  </div>

  <div class="info_border" id="4">
    <div class="tips_bar"></div>
    <span style="font-size: 30px; line-height: 60px">学院及其实验室</span>

    <el-container class="info_table">
      <el-main>
        <div>
          <img src="../assets/navigator.png" /> 学院及其实验室：
          <div v-for="x in school.universityCollege">
            {{ x }}
          </div>
        </div>
      </el-main>

      <el-aside width="30%">
        <div style="margin-top: 20px">
          <img src="../assets/message.png" /> 国际学生招生处联系邮箱：<a
            href="#"
            target="_blank"
            >{{ school.universityEmail }}</a
          >
        </div>
      </el-aside>
    </el-container>
  </div>

<!--  <div class="info_border" id="6">-->
<!--    <div class="tips_bar"></div>-->
<!--    <span style="font-size: 30px; line-height: 60px">校友圈</span>-->

<!--    <el-container class="info_table" style="max-height: 800px">-->
<!--      <el-main>-->
<!--        <div><img src="../assets/cup.png" /> 让大家找到同校用户，交个朋友</div>-->
<!--        <div-->
<!--          class="user_list"-->
<!--          v-for="follower_person in user_list"-->
<!--          :key="follower_person.user_id"-->
<!--        >-->
<!--          <el-avatar :size="70" :src="follower_person.user_profile" />-->
<!--          <div-->
<!--            style="display: block; width: 85%"-->
<!--            @click="goPersonSpace(follower_person.user_id, $event)"-->
<!--          >-->
<!--            <div-->
<!--              style="-->
<!--                font-size: 20px;-->
<!--                font-weight: bold;-->
<!--                margin-left: 2%;-->
<!--                margin-bottom: 2%;-->
<!--                text-align: left;-->
<!--              "-->
<!--            >-->
<!--              {{ follower_person.user_name }}-->
<!--            </div>-->
<!--            <div-->
<!--              style="-->
<!--                font-size: 15px;-->
<!--                font-weight: normal;-->
<!--                margin-left: 2%;-->
<!--                text-align: left;-->
<!--              "-->
<!--            >-->
<!--              个性签名：{{ follower_person.user_signature }}-->
<!--            </div>-->
<!--          </div>-->
<!--          <span style="padding-top: 3%; padding-right: 2%">-->
<!--            <follow-button-->
<!--              object_type="0"-->
<!--              :object_id="follower_person.user_id"-->
<!--              @giveFollow="follow"-->
<!--              @cancelFollow="unFollow"-->
<!--            ></follow-button>-->
<!--          </span>-->
<!--        </div>-->
<!--      </el-main>-->

<!--      <el-aside width="25%"> </el-aside>-->
<!--    </el-container>-->
<!--  </div>-->
</template>

<script>
//到时候传入一个
import Loading from "../components/Loading.vue";
import BmapDemo from "../components/Map.vue";
import FollowButton from "../components/FollowButton.vue";
import Weather from "../components/Weather.vue";
import CollegeRelevantPage from "../components/CollegeRelevantPage.vue";
import axios from "axios";
export default {
  components: {
    FollowButton,
    Loading,
    BmapDemo,
    Weather,
    CollegeRelevantPage,
  },
  props: ["school"],
  data() {
    return {
      // user_list: [],
      weather: null,
      relevant_pages: null,
    };
  },
  watch: {
    school: function (newVal, oldVal) {
      // 调用web api
      // hipo 获取地区、域名
      axios
        .get("/spring/college/detail/basic_info", {
          params: {
            college_enname: this.school.universityEnName,
          },
        })
        .then((res) => {
          if (res.data.status == true) {
            if (res.data.obj[0].web_pages[0] != undefined) {
              this.school.university_website = res.data.obj[0].web_pages[0];
              this.school.university_country = res.data.obj[0].country;
            }
          }
        });
      // open weather 获取天气
      axios
        .get("/spring/college/weather", {
          params: {
            longitude: this.school.universityAddressX,
            latitude: this.school.universityAddressY,
          },
        })
        .then((res) => {
          if (res.data.status == true) {
            this.weather = res.data.obj;
          }
        });
      // bing 获取相关页面
      axios
        .get("/spring/college/detail/bing_search", {
          params: {
            college_name: this.school.universityChName + "官网",
          },
        })
        .then((res) => {
          if (res.data.status == true) {
            this.relevant_pages = res.data.obj.webPages.value;
          }
        });
    },
  },
  // updated() {
  //   //在此处向服务器请求数据，初始化所需变量
  //   axios({
  //     url:
  //       "api/university/get_oldboy?university_id=" + this.school.universityId,
  //     method: "get",
  //   })
  //     .then((res) => {
  //       var response = res.data;
  //       //console.log(response.state);
  //       if (response.status == true) {
  //         this.user_list = response.data.user_info;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },
  computed: {
    contentShow() {},
  },
  methods: {
    goPersonSpace(id, event) {
      console.log(id);
      this.$router.push({
        path: "/person_space",
        query: {
          host_id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.tips_bar {
  margin: 10px;
  float: left;
  border: 0px solid black;
  background-color: coral;
  opacity: 1;
  color: coral;
  height: 40px;
  width: 10px;
}

.info_border {
  height: auto;
  width: 100%;
  background: white;
  margin: 10px;
  border: 1px solid black;
  text-align: left;
}
.info_table {
  line-height: 30px;
  padding: 20px;
  margin: 10px;
  background: #fbfeff;
  border: 1px solid black;
  text-align: left;
  vertical-align: middle;
}

.info_tag {
  font-size: smaller;
  border-bottom: 3px solid coral;
  color: rgb(30, 30, 30);
}
.info_content {
  font-size: larger;
}

.location_info {
  line-height: 40px;
}

.score_info {
  line-height: 40px;
}
.score_content {
  color: coral;
  font-size: larger;
}

.user_list {
  border-bottom: 1px solid #f0f0f2;
  display: flex;
  padding-bottom: 1%;
  margin-bottom: 1%;
  padding-top: 1%;
  padding-left: 10%;
  transition: background-color 0.1s ease;
}
.user_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
</style>
