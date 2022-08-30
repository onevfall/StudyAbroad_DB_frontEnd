<!--
高校信息卡
描述：展示高校具体各板块信息
作者：张子涵
-->
<template >
  <div class="info_border" id="0"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">基本信息</span>

      <el-container class="info_table">
        <el-main>
          <div style="color:coral"><img src="../assets/location.png" style="filter: drop-shadow(0 0 0 coral);">
            {{school.university_country}} {{school.university_location}}</div>
          <div><img src="../assets/navigator.png">
            学校官方网站：<a :href=this.school.university_website target="_blank">{{school.university_website}}</a></div>
          <div><img src="../assets/message.png">
            国际学生招生处联系邮箱：<a href="#" target="_blank">{{school.university_email}}</a></div>
          <div ><img src="../assets/dollar.png">
            国际学生年度学费：<span  style="color:coral;font-size: larger;">{{school.university_tuition}}</span></div>
          <div  ><img src="../assets/uni_currency.png">
            在校人数：
            <span  style="color:coral;font-size: larger;">{{school.university_student_num}} </span>
          </div>
          <div  ><img src="../assets/uni_currency.png">
            教师人数：
            <span  style="color:coral;font-size: larger;">{{school.university_teacher_num}} </span>
          </div>
      </el-main>

      <el-aside width=25%>
        <div><img src="../assets/location.png"><br>
        <span  class="info_tag">国家</span>：<span class="info_content">{{school.university_country}} </span><br>
        <span  class="info_tag">省份</span>：<span class="info_content">{{school.university_location}}</span><br>
        <span  class="info_tag">学校</span>：<span class="info_content">{{school.university_chname}}</span><br>
        <span  class="info_tag">名称</span>：<span class="info_content">{{school.university_enname}}</span>
        </div>
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="1"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">学校地址</span>
  <el-container class="info_table">
      <el-main>
        <BmapDemo :school="this.school"></BmapDemo>
      </el-main>

      <el-aside width=25% class="location_info">
        <br>
        <div><img src="../assets/location.png"><br>
        <span  class="info_tag">国家</span>：<span class="info_content">{{school.university_country}} </span><br>
        <span  class="info_tag">省份</span>：<span class="info_content">{{school.university_location}}</span><br>
        <span  class="info_tag">学校</span>：<span class="info_content">{{school.university_chname}}</span><br>
        <span  class="info_tag">名称</span>：<span class="info_content">{{school.university_enname}}</span>
        </div>
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="2"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">本研申请要求</span>
    <div class="info_table">
    
    <div class="score_info"><img src="../assets/cup.png">
      <span  class="info_tag">
        平均SAT</span>： <span class="score_content">1400</span>
    </div>
    <div><img src="../assets/cup.png">
      <span  class="info_tag">
        Tofel需求</span>： <span class="score_content">{{school.university_tofel_requirement}}</span>
    </div>
    <div><img src="../assets/cup.png">
      <span  class="info_tag">
        IELTS需求</span>：  <span class="score_content">{{school.university_ielts_requirement}}</span>
    </div>
    <div><img src="../assets/dollar.png">
      <span  class="info_tag">
        国际学生年度学费</span>： <span class="score_content">{{school.university_tuition}}</span>
    </div>
  </div>
  </div>


  <div class="info_border" id="3"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">招生联系方式</span>

      <el-container class="info_table">
        <el-main>
         <div><img src="../assets/navigator.png">
            学校官方网站：<a :href=this.school.university_website target="_blank">{{school.university_website}}</a></div>
          <div><img src="../assets/message.png">
            国际学生招生处联系邮箱：<a href="#" target="_blank">{{school.university_email}}</a></div>
          <div ><img src="../assets/dollar.png">
            国际学生年度学费：<span  style="color:coral;font-size: larger;">{{school.university_tuition}}</span></div>
      </el-main>

      <el-aside width=25%>
        <Loading></Loading>
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="4"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">学院及其实验室</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/navigator.png">
            学院及其实验室：<div v-for="x in school.university_college">
            {{x}}</div>
            </div>
      </el-main>

      <el-aside width=25%>
        <div><img src="../assets/location.png"><br>
        <span  class="info_tag">国家</span>：<span class="info_content">{{school.university_country}} </span><br>
        <span  class="info_tag">省份</span>：<span class="info_content">{{school.university_location}}</span><br>
        <span  class="info_tag">学校</span>：<span class="info_content">{{school.university_chname}}</span><br>
        <span  class="info_tag">名称</span>：<span class="info_content">{{school.university_enname}}</span>
        </div>
        
      </el-aside>
    </el-container>
  </div>

  <div class="info_border" id="5"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">往届学生信息</span>

      <el-container class="info_table">
        <el-main>
        <div class="score_info"><img src="../assets/cup.png">
    <span  class="info_tag">
        最低SAT</span>： <span class="score_content">1400</span>
    </div>
    <div><img src="../assets/cup.png">
      <span  class="info_tag">
        最低Tofel</span>： <span class="score_content">{{school.university_tofel_requirement}}</span>
    </div>
    <div><img src="../assets/cup.png">
      <span  class="info_tag">
        最低IELTS</span>：  <span class="score_content">{{school.university_ielts_requirement}}</span>
    </div>
      </el-main>

      <el-aside width=25%>
        <div><img src="../assets/location.png"><br>
        <span  class="info_tag">国家</span>：<span class="info_content">{{school.university_country}} </span><br>
        <span  class="info_tag">省份</span>：<span class="info_content">{{school.university_location}}</span><br>
        <span  class="info_tag">学校</span>：<span class="info_content">{{school.university_chname}}</span><br>
        <span  class="info_tag">名称</span>：<span class="info_content">{{school.university_enname}}</span>
        </div>
      </el-aside>
    </el-container>
  </div>

  <div class="info_border" id="6"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">校友圈</span>

      <el-container class="info_table"  style="max-height:800px">
        <el-main>
          <div><img src="../assets/cup.png">
            让大家找到同校用户，交个朋友</div>
            <div
                class="user_list"
                v-for="follower_person in user_list"
                :key="follower_person.user_id"
              >
                <el-avatar :size="70" :src="follower_person.user_profile"/>
                <div
                  style="display: block; width: 85%"
                  @click="goPersonSpace(follower_person.user_id, $event)"
                >
                  <div
                    style="
                      font-size: 20px;
                      font-weight: bold;
                      margin-left: 2%;
                      margin-bottom: 2%;
                      text-align: left;
                    "
                  >
                    {{ follower_person.user_name }}
                  </div>
                  <div
                    style="
                      font-size: 15px;
                      font-weight: normal;
                      margin-left: 2%;
                      text-align: left;
                    "
                  >
                    个性签名：{{ follower_person.user_signature }}
                  </div>
                </div>
                <span style="padding-top: 3%; padding-right: 2%">
                  <follow-button
                    object_type="0"
                    :object_id="follower_person.user_id"
                    @giveFollow="follow"
                    @cancelFollow="unFollow"
                  ></follow-button>
                </span>
              </div>
      </el-main>

      <el-aside width=25%>

      </el-aside>
    </el-container>
  </div>


</template>

<script>
//到时候传入一个
import Loading from "../components/Loading.vue"
import BmapDemo from "../components/Map.vue"
import FollowButton from "../components/FollowButton.vue";
import axios from "axios";
export default {
  components:{
    FollowButton,
    Loading,
    BmapDemo
  },
  props: ["school"],
  data(){
    return {
      user_list: []
    }
  },
  updated() {
    //在此处向服务器请求数据，初始化所需变量
    axios({
        url: "university/get_oldboy?university_id="+this.school.university_id,
        method: "get",
      })
        .then((res) => {
          console.log(res.data);
          var response=res.data
          //console.log(response.state);
          if (response.status == true) {
            this.user_list = response.data.user_info;
            console.log(this.school.university_id);
            console.log(this.user_list);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  },
  computed: {
    contentShow() {
      
    },
  },
  methods:{
     //goNewsDetail(){
       //   alert("跳转至id为"+ this.new_info.news_flash_id+"的快讯详情页面")
      //}
      goPersonSpace(id, event) {
      console.log(id);
      this.$router.push({
        path: "/person_space",
        query: {
          host_id: id,
        },
      });
    },
  }
};
</script>

<style scoped>

.tips_bar{
    margin:10px;
    float:left;
    border:0px solid black;
    background-color: coral;
    opacity: 1;
    color:coral;
    height:40px;
    width:10px;
}

.info_border{
  height: auto;
  width: 100%; 
  background: white;
  margin: 10px;
  border: 1px solid  black;
  text-align:left;
}
.info_table{
    line-height:30px;
    padding:20px;
    margin:10px;
    background:#fbfeff;
    border: 1px solid  black;
    text-align:left;
    vertical-align:middle;
}

.info_tag{
  font-size: smaller;
  border-bottom: 3px solid coral;
  color:rgb(30, 30, 30);
}
.info_content{
  font-size: larger;
}

.location_info{
  line-height: 40px;
}

.score_info{
  line-height: 40px;
}
.score_content{
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


