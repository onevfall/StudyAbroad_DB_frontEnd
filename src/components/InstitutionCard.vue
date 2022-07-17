<!--
描述：机构中心主页用于搜索时显示的机构卡片
作者：蔡明宏
-->
<template>
  <div class="institution_card">
    <el-card class="two_block">
      <div class="two_block_hori">
        <div>
          <div class="avatar_text">
            <el-avatar shape="square" :size="70" :src="institution.institution_profile" />
            <div>
                <p class="enname">{{ institution.institution_name }}</p>
            </div>
          </div>
          <!-- 下面主要介绍机构简介 -->
          <div>
              <div style="margin:10px;"> 
                <div>
                    <span class="info_text">简介：</span>
                    <span style="color:gray;">{{institution.institution_introduction}}</span>
                </div>
              </div>
          </div>
        </div>

        <!-- 右侧点击去看看 -->
        <div>
          <el-button type="warning" size="large" color="#626aef" @click="seeInstitution"
            >去看看</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: [
    'institution',
  ],
  data() {
    return {};
  },
  methods: {
    seeInstitution(){
      // <router-link target="_blank" :to="{path:'/home',query:{id:'1'}}">新页面打开home页</router-link>;
      this.$router.push({
        path:'/institution_detail',
        query:{
          institution_id:this.institution.institution_id
        }
      })
    }
  },
};
</script>

<style>
.institution_card {
  margin: 20px;
  width: 95%;
  height: 20%;
  display: flex;
  justify-content: center;
}
.two_block {
  margin-left: 40x;
  padding: 10px;
  height: 20%;
  width: 60%;
  /* align-self: center; */
}
.two_block_hori {
  display: flex;
  justify-content: space-between;
}
.avatar_text {
  display: flex;
}
p.enname{
    color:rgb(57, 47, 65);
    font-family:"Lucida Console", "Courier New", monospace;
    font-size: 20px;
    margin-left:30px;
    margin-top:10px;
}
p.chname{
    color:dimgray;
    font-family:'Times New Roman', Times, serif;
    float:left;
    margin-top:-10px;
    margin-left:30px;
}
span.info_text{
    font-family: Arial, Helvetica, sans-serif;
    font-size:18px;
    color: rgb(121, 75, 75);
}

</style>
