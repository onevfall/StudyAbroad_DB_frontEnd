<template>
  <el-container class="info_table">
      <el-aside width=60% class="left">
          <div class="con1"  style="width:100%;float:left;" >
          <img :src="this.school.university_badge"  class="school_badge">
           <div style="float:left;text-align:left;">
            <p class="p1" style="font-size:30px">{{school.university_enname}}</p>
            <p class="p1">{{school.university_chname}}</p>
            <p class="p1">{{school.university_abbreviation}}</p>
           </div>
          </div> 
          <p style="float:left;">
            <span class="con2_span" style="float:left;text-align:left;">{{school.university_introduction}}</span> 
            <span class="show" style="float:right;text-align:right;">[更多]</span> <!---->
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


.info_table{
  height: 350px; 
  width: 100%; 
  color:white;
  
  background: rgb(26, 46, 80);
  opacity: 1; 
  z-index: -1;
}

.school_badge{
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


