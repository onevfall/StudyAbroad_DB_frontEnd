<template>
  <el-card class="box-card" shadow="hover"> 
    <el-row>
        <el-col :span="16">
            <el-row class="title">
                <el-link :href="news.url" target="_blank" :underline="false">{{news.title}}</el-link>
            </el-row>
            <el-row class="addtional">
                <el-col :span="12">
                    {{news.source}}
                </el-col>
                <el-col :span="12" style="margin-top:2px">
                    {{news.ctime.substring(0,news.ctime.indexOf(" "))}}
                </el-col>
                
            </el-row>
        </el-col>
        <el-col :span="8">
            <img :src="news.picUrl" class="newsPic">
        </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  props: ["news"],
};
</script>
<style scoped>
.title{
    font-size: normal;
    font-weight: normal;
    text-align: left;
}
.addtional{
    margin-top: 10px;
    font-size: small;
    text-align: left;
    font-weight: normal;
    color:#909399
}
.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin: 0 auto;
}
.newsPic{
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 3px;
}
</style>
