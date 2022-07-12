<template>
  <div class="info_border" id="0"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">基本信息</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/location.png">
            {{school.university_country}} {{school.university_location}}</div>
          <div><img src="../assets/navigator.png">
            学校官方网站：{{school.university_website}}</div>
          <div><img src="../assets/message.png">
            国际学生招生处联系邮箱：{{school.university_email}}</div>
          <div><img src="../assets/dollar.png">
            国际学生年度学费：30w+</div>
      </el-main>

      <el-aside width=25%>
        <div><img src="../assets/location.png"><br>
        国家：{{school.university_country}} <br>
        省份：{{school.university_location}}<br>
        学校：{{school.university_chname}}<br>
        名称：{{school.university_enname}}</div>
        <div><img src="../assets/uni_currency.png">
        在校人数：{{school.university_student_num}} </div>
        
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

      <el-aside width=25%>
        <br><br>
        <div><img src="../assets/location.png"><br>
        国家：{{school.university_country}} <br>
        省份：{{school.university_location}}<br>
        学校：{{school.university_chname}}<br>
        名称：{{school.university_enname}}</div>
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="2"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">本研申请要求</span>
    <div class="info_table">
    
    <div><img src="../assets/cup.png">
      平均SAT： 1024</div>
    <div><img src="../assets/cup.png">
      平均Tofel：119</div>
    <div><img src="../assets/cup.png">
      平均雅思： 7.0</div>
    <div><img src="../assets/dollar.png">
      国际学生年度学费：30w+</div>
  </div>
  </div>


  <div class="info_border" id="3"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">招生联系方式</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/navigator.png">
            学校官方网站：{{school.university_website}}</div>
          <div><img src="../assets/message.png">
            国际学生招生处联系邮箱：{{school.university_email}}</div>
          <div><img src="../assets/dollar.png">
            国际学生年度学费：30w+</div>
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
        国家：{{school.university_country}} <br>
        省份：{{school.university_location}}<br>
        学校：{{school.university_chname}}<br>
        名称：{{school.university_enname}}</div>
        <div><img src="../assets/uni_currency.png">
        在校人数：{{school.university_student_num}} </div>
        
      </el-aside>
    </el-container>
  </div>

  <div class="info_border" id="5"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">往届学生信息</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/cup.png">
            平均SAT： 1024</div>
          <div><img src="../assets/cup.png">
            平均Tofel：119</div>
          <div><img src="../assets/cup.png">
            平均雅思： 7.0</div>
      </el-main>

      <el-aside width=25%>
        <div><img src="../assets/location.png"><br>
        国家：{{school.university_country}} <br>
        省份：{{school.university_location}}<br>
        学校：{{school.university_chname}}<br>
        名称：{{school.university_enname}}</div>
        <div><img src="../assets/uni_currency.png">
        在校人数：{{school.university_student_num}} </div>
        
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
        国家：{{school.university_country}} <br>
        省份：{{school.university_location}}<br>
        学校：{{school.university_chname}}<br>
        名称：{{school.university_enname}}</div>
        <div><img src="../assets/uni_currency.png">
        在校人数：{{school.university_student_num}} </div>
        
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
    border:1px solid black;
    background-color: #FBC563;
    opacity: 1;
    color:#FBC563;
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
    background:#F0F9FC;
    border: 1px solid  black;
    text-align:left;
    vertical-align:middle;
}


</style>


