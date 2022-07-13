<!--
机构详情
描述：展示详细机构信息
作者：张子涵
-->
<template>
  <div>
    <institution-info :institution ="this.institution_info"></institution-info>
    <el-container>
      <el-aside width="400px">
        
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
export default {
  components: {
    InstitutionInfo,
    InstitutionInfoCard,
    BmapDemo
  },
  data() {
    return {
      institution_info: "",
    };
  },
  props:["institution_id"],
  created() {
    //在此处向服务器请求数据，初始化所需变量
    axios({
        url: "institution?institution_id="+0,
        method: "get",
      })
        .then((res) => {
          console.log(res.data);
          var response=res.data
          //console.log(response.state);
          if (response.status == true) {
            this.institution_info = response.data;
            console.log(this.institution_info.institution_name);
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

</style>
