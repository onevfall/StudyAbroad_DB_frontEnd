<!--
机构信息卡
描述：展示机构信息卡（详情页最上）
作者：张子涵
-->
<template>
  <div class="info_border" id="0"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">基本信息</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/location.png">
            {{institution.institution_country}} {{institution.institution_location}}</div>
          <div><img src="../assets/navigator.png">
            学校官方网站：{{institution.institution_website}}</div>
          <div><img src="../assets/message.png">
            国际学生招生处联系邮箱：{{institution.institution_email}}</div>
          <div><img src="../assets/dollar.png">
            国际学生年度学费：30w+</div>
      </el-main>

      <el-aside width=25%>
        <div><img src="../assets/location.png"><br>
        国家：{{institution.institution_country}} <br>
        省份：{{institution.institution_location}}<br>
        学校：{{institution.institution_name}}<br>
        名称：{{institution.institution_name}}</div>
        <div><img src="../assets/uni_currency.png">
        在校人数：{{institution.institution_student_num}} </div>
        
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="1"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">机构地址</span>
  <el-container class="info_table">
      <el-main>
        <!--<BmapDemo :institution="this.institution"></BmapDemo>-->
        <IMap :institution="this.institution"></IMap>
      </el-main>

      <el-aside width=25%>
        <br><br>
        <div><img src="../assets/location.png"><br>
        国家：{{institution.institution_country}} <br>
        省份：{{institution.institution_location}}<br>
        学校：{{institution.institution_name}}<br>
        名称：{{institution.institution_name}}</div>
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="2"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">经营资质</span>
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
            学校官方网站：{{institution.institution_website}}</div>
          <div><img src="../assets/message.png">
            国际学生招生处联系邮箱：{{institution.institution_email}}</div>
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
    <span style="font-size:30px;line-height: 60px;">教学项目及科研活动</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/navigator.png">
            学院及其实验室：{{institution.institution_college}}</div>
      </el-main>

      <el-aside width=25%>
        <div><img src="../assets/location.png"><br>
        国家：{{institution.institution_country}} <br>
        省份：{{institution.institution_location}}<br>
        学校：{{institution.institution_name}}<br>
        名称：{{institution.institution_name}}</div>
        <div><img src="../assets/uni_currency.png">
        在校人数：{{institution.institution_student_num}} </div>
        
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
        国家：{{institution.institution_country}} <br>
        省份：{{institution.institution_location}}<br>
        学校：{{institution.institution_name}}<br>
        名称：{{institution.institution_name}}</div>
        <div><img src="../assets/uni_currency.png">
        在校人数：{{institution.institution_student_num}} </div>
        
      </el-aside>
    </el-container>
  </div>

</template>

<script>
//到时候传入一个
import Loading from "../components/Loading.vue"
import IMap from "../components/IMap.vue"
export default {
  components:{
    Loading,
    IMap
  },
  props: ["institution"],
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


