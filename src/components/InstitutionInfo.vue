<!--
机构信息
描述：展示机构各板块信息（详情页最上）
作者：张子涵
-->
<template>
  <el-container class="info_table">
      <el-aside width="700px" class="left">
          <div class="con1"  style="width:100%;float:left;" >
          <img :src="this.institution.insitution_profile"  class="insitution_profile">
           <div style="float:left;text-align:left;">
            <p class="p1" style="font-size:30px">{{institution.institution_name}}</p>
            <p class="p1">{{institution.institution_name}}</p>
            <p class="p1">{{institution.institution_abbreviation}}</p>
           </div>
          </div> 
          <p style="float:left;">
            <span class="con2_span" style="float:left;">{{institution.institution_introduction}}</span> 
            <span class="show"><span class="more">[更多]</span></span> <!---->
          </p>
  </el-aside>

      <el-main>相关图片
        <Loading></Loading>
      </el-main>
    </el-container>
    
    </template>

<script>
//到时候传入一个
import Loading from "../components/Loading.vue"
export default {
  components:{
    Loading
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


.info_table{
  height: 350px; 
  width: 100%; 
  color:white;
  
  background: rgb(26, 46, 80);
  opacity: 1; 
  z-index: -1;
}

.institution_badge{
  background:white;
  margin:30px;
  margin-bottom: 0;
  height: 100px;
  width: 100px;
  float:left;
}

.left{
  color:white;
  border: black;
}

.left::-webkit-scrollbar{
  background-color: rgb(36, 56, 90);
  color: rgb(26, 46, 80);
}

</style>


