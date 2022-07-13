<!--
高校信息卡
描述：展示高校信息卡（详情页最上）
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
            国际学生年度学费：<span  style="color:coral;font-size: larger;">30w+</span></div>
          <div  ><img src="../assets/uni_currency.png">
            在校人数：
            <span  style="color:coral;font-size: larger;">{{school.university_student_num}} </span>
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
        平均SAT</span>： <span class="score_content">1024</span>
    </div>
    <div><img src="../assets/cup.png">
      <span  class="info_tag">
        平均Tofel</span>： <span class="score_content">119</span>
    </div>
    <div><img src="../assets/cup.png">
      <span  class="info_tag">
        平均雅思</span>：  <span class="score_content">7.0</span>
    </div>
    <div><img src="../assets/dollar.png">
      <span  class="info_tag">
        国际学生年度学费</span>： <span class="score_content">30w+</span>
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
            国际学生年度学费：<span  style="color:coral;font-size: larger;">30w+</span></div>
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
            学院及其实验室：{{school.university_college}}</div>
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
              平均SAT</span>： <span class="score_content">1024</span>
          </div>
          <div><img src="../assets/cup.png">
            <span  class="info_tag">
              平均Tofel</span>： <span class="score_content">119</span>
          </div>
          <div><img src="../assets/cup.png">
            <span  class="info_tag">
              平均雅思</span>：  <span class="score_content">7.0</span>
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

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/cup.png">
            让大家找到同校用户，交个朋友</div>
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


</template>

<script>
//到时候传入一个
import Loading from "../components/Loading.vue"
import BmapDemo from "../components/Map.vue"
export default {
  components:{
    Loading,
    BmapDemo
  },
  props: ["school"],
  computed: {
    contentShow() {
      
    },
  },
  methods:{
     //goNewsDetail(){
       //   alert("跳转至id为"+ this.new_info.news_flash_id+"的快讯详情页面")
      //}
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

</style>


