<!--
机构信息卡
描述：展示机构信息卡（详情页最上）
作者：张子涵
-->
<template>
  <div class="info_border" id="0"> 
    <div class="tips_bar" id="basic"></div>
    <span style="font-size:30px;line-height: 60px;">基本信息</span>
      <el-container class="info_table">
        <el-main>
          <div style="color:coral"><img src="../assets/location.png" style="filter: drop-shadow(0 0 0 coral);">
            {{institution.institution_province}} {{institution.institution_city}}</div>
          <div><img src="../assets/navigator.png">
            机构官方网站：<a :href=this.institution.institution_website target="_blank">{{institution.institution_website}}</a></div>
          <div><img src="../assets/message.png">
            学生招生处联系邮箱：<a href="#" target="_blank">{{institution.institution_email}}</a></div>
          <div><img src="../assets/uni_currency.png">
            学生招生处联系电话：<a href="#" target="_blank">{{institution.institution_phone}}</a></div>
          <div ><img src="../assets/dollar.png">
            学生年度学费：<span  style="color:coral;font-size: larger;">30w+</span></div>
        
      </el-main>

      <el-aside width=50%>
      <div><img src="../assets/location.png"><br>
        <span  class="info_tag">省份</span>：<span class="info_content">{{institution.institution_province}} </span><br>
        <span  class="info_tag">城市</span>：<span class="info_content">{{institution.institution_city}}</span><br>
        <span  class="info_tag">地址</span>：<span class="info_content">{{institution.institution_location}}</span><br>
        <span  class="info_tag">机构</span>：<span class="info_content">{{institution.institution_name}}</span><br>

        </div>
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="1"> 
    <div class="tips_bar" id="location"></div>
    <span style="font-size:30px;line-height: 60px;">机构地址</span>
  <el-container class="info_table">
      <el-main>
        <!--<BmapDemo :institution="this.institution"></BmapDemo>-->
        <IMap :institution="this.institution"></IMap>
      </el-main>

      <el-aside width=25%>
        <br>
        <div><img src="../assets/location.png"><br>
        <span  class="info_tag">省份</span>：<span class="info_content">{{institution.institution_province}} </span><br>
        <span  class="info_tag">城市</span>：<span class="info_content">{{institution.institution_city}}</span><br>
        <span  class="info_tag">地址</span>：<span class="info_content">{{institution.institution_location}}</span><br>
        <span  class="info_tag">机构</span>：<span class="info_content">{{institution.institution_name}}</span><br>

        </div>
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="2"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">经营资质</span>
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
        学生年度学费</span>： <span class="score_content">30w+</span>
    </div>
  </div>
  </div>


  <div class="info_border" id="3"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">招生联系方式</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/navigator.png">
            学生招生处联系电话：<a :href=this.institution.institution_website target="_blank">{{institution.institution_phone}}</a></div>
          <div><img src="../assets/message.png">
            学生招生处联系邮箱：<a href="#" target="_blank">{{institution.institution_email}}</a></div>
          <div ><img src="../assets/dollar.png">
            学生年度学费：<span  style="color:coral;font-size: larger;">30w+</span></div>
      </el-main>

      <el-aside width=25%>
        <Loading></Loading>
      </el-aside>
    </el-container>
  </div>


  <div class="info_border" id="4"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">课程及课程特色</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/navigator.png" style="line-height:60px">
            课程特色：{{institution.institution_lessons_characteristic}}</div>
      </el-main>

      <el-aside width=0%>
    
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
    <div><img src="../assets/dollar.png">
      <span  class="info_tag">
        学生年度学费</span>： <span class="score_content">30w+</span>
    </div>
      </el-main>

      <el-aside width=50%>
        <div><img src="../assets/navigator.png" style="margin-top:20px">
            学生招生处联系电话：<a :href=this.institution.institution_website target="_blank">{{institution.institution_phone}}</a></div>
      </el-aside>
    </el-container>
  </div>

<div class="info_border" id="6"> 
    <div class="tips_bar" ></div>
    <span style="font-size:30px;line-height: 60px;">机构资质证书</span>

      <el-container class="info_table">
        <el-main>
          <div><img src="../assets/navigator.png">
            机构资质证书：{{institution.institution_qualify}}</div>
            <div>是不是没有？是不是没有？速速打电话举报吧！</div>
      </el-main>

      <el-aside width=50%>
      <div><img src="../assets/location.png"><br>
        
        <span  class="info_tag">机构</span>：<span class="info_content">{{institution.institution_name}}</span><br>
        <span  class="info_tag">地址</span>：<span class="info_content">{{institution.institution_location}}</span><br>

        </div>
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


