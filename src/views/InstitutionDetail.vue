<!--
机构详情
描述：展示详细机构信息
作者：张子涵
-->
<template>
  <div>
    <institution-info :institution ="this.institution_info"></institution-info>
    <el-container>
      <el-aside width=25% style="overflow:visible">
        <div  style="position:sticky;top:0px;">
          <nav-list></nav-list>
          <div style="height:10px"></div>
          <!-- <Advertisement></Advertisement> -->
        </div>
      </el-aside>
      <el-main>
        <div class="info_detail">
        <institution-info-card :institution="this.institution_info"> </institution-info-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import BmapDemo from "../components/Map.vue"
import axios from "axios";
import InstitutionInfo from "../components/InstitutionInfo.vue";
import InstitutionInfoCard from "../components/InstitutionInfoCard.vue";
import NavList from "../components/NavList.vue";
import DistrictNewsList from "../components/DistrictNewsList.vue";
export default {
  components: {
    InstitutionInfo,
    InstitutionInfoCard,
    BmapDemo,
    NavList,
    DistrictNewsList,
},
  data() {
    return {
      institution_info: "",
      institution_id:"",

    };
  },
  props:["institution_id"],
  methods:{
    getParams(){
      this.institution_id = this.$route.query.institution_id 
    },
  },
  created() {
    this.getParams();
    //在此处向服务器请求数据，初始化所需变量
    axios({
        url: "spring/institution/"+this.institution_id,
        method: "get",
      })
        .then((res) => {
          console.log(res.data);
          var response=res.data
          //console.log(response.state);
          if (response.status == true) {
            this.institution_info = response.obj;
            console.log(this.institution_info.institutionName);
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
