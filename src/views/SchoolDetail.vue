<!--
高校详情
描述：展示详细高校信息
作者：张子涵、焦佳宇（部分改为web-api调用）
-->
<template>
  <school-info :school ="this.school_info"></school-info>
  <el-container >
    <el-aside width=25% style="overflow:visible">
      <div style="position:sticky;top:0px;">
        <DistrictNewsList :country_name="this.school_country_zh"></DistrictNewsList>        
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
import DistrictNewsList from "../components/DistrictNewsList.vue";
export default {
components: {
  SchoolInfo,
  SchoolInfoCard,
  BmapDemo,
  NavList,
  DistrictNewsList
},
data() {
  return {
    school_info: "",
    school_id:"",
    school_country_zh:"",
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
      url: "spring/college/"+this.school_id,
      method: "get",
    })
      .then((res) => {
        var response=res.data
        //console.log(response.state);
        if (response.status == true) {
          this.school_info = response.obj;
          this.school_country_zh = response.obj.universityCountry;
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
