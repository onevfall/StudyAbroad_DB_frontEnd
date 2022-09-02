<!--
高校详情
描述：展示详细高校信息
作者：张子涵
-->
<template>

  <school-info :school ="this.school_info"></school-info>
  <el-container >
    
    <el-aside width=25% style="overflow:visible">
      <div  style="position:sticky;top:0px;">
        <nav-list></nav-list>
        <div style="height:10px"></div>
        <Advertisement></Advertisement>
      </div>
    </el-aside>
    <el-main>
      <div class="info_detail">
      <school-info-card :school="this.school_info"> </school-info-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>

import BmapDemo from "../components/Map.vue"
import axios from "axios";
import SchoolInfo from "../components/SchoolInfo.vue";
import SchoolInfoCard from "../components/SchoolInfoCard.vue";
import NavList from "../components/NavList.vue";
import Advertisement from "../components/Advertisement.vue";
export default {
components: {
  SchoolInfo,
  SchoolInfoCard,
  BmapDemo,
  NavList,
  Advertisement
},
data() {
  return {
    school_info: "",
    school_id:"",
  };
},
props:["school_id"],
methods:{
  getParams(){
    this.school_id = this.$route.query.school_id 
  },
},
created() {
  this.getParams();
  //在此处向服务器请求数据，初始化所需变量
  axios({
      url: "university?university_id="+this.school_id,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        var response=res.data
        //console.log(response.state);
        if (response.status == true) {
          this.school_info = response.data;
          console.log(this.school_info.university_chname);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  /* axios({
      url: "https://www.zhihu.com/api/v4/search/top_search",
      baseURL:"/api2",
    })
      .then((res) => {
        console.log(res.data);
        var response=res.data
        if (response.status == true) {
          this.school_info = response.data;
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });*/
      //var a=document.createElement('document');
      //a.src="https://www.zhihu.com/api/v4/search/top_search";
      //console.log(a.src);

},
mounted(){
   window.scrollTo(0,0);
}
};
</script>

<style scoped>

.a{
position:sticky;
top:0px;
}

.text {
font-size: 14px;
text-align: left;

margin-bottom: 18px;
}
.card-header {
display: flex;
justify-content: space-between;
text-align: left;
font-size: 28px;
padding-left: 5px;
border-left: 10px rgb(33, 33, 126) solid;
}
</style>
