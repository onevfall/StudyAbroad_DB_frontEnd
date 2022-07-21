<!--
描述：认证信息展示卡片
作者：方新宇
-->
<template>
  <div style="margin-bottom:30px">
    <el-card style="width: 90%;background-color: #f2f9ff;height:420px">
      <div class="infor_item">
        <div class="infor_item_name">证明材料</div>
        <el-image style="width: 150px; height: 150px" :src="certif_infor.img_url" fit="fill" />
      </div>
      <div class="infor_item">
        <div class="infor_item_name">学校名称</div>
        <!-- <span>{{}}</span> -->
        <div class="infor_item_content">{{certif_infor.school_name}}</div>
      </div>
      <div class="infor_item">
        <div class="infor_item_name">学历</div>
        <!-- <span>{{}}</span> -->
        <div class="infor_item_content">{{certif_infor.degree}}</div>
      </div>
      <div class="infor_item">
        <div class="infor_item_name">入学时间</div>
        <!-- <span>{{}}</span> -->
        <div class="infor_item_content">{{certif_infor.time}}</div>
      </div>
      <div class="infor_item">
        <div class="infor_item_name">专业</div>
        <!-- <span>{{}}</span> -->
        <div class="infor_item_content">{{certif_infor.major}}</div>
      </div>
      <div class="infor_item">
        <div>
            <el-button type="danger">删除该认证<el-icon class="el-icon--right"><Delete /></el-icon></el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  components:{
  },
  props:['certif_infor'],
  data() {
    return {
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  created() {},
  watch: {},
  methods: {
    seeMore() {},
  },
};
</script>

<style scoped>
.infor_item{
  text-align: left;
  margin-top:20px;
  margin-left: 3%;
  display: flex;
  align-items: center;
}

.infor_item .infor_item_name{
  width:70px;
  margin-right: 20px;
}

.infor_item .infor_item_content{
  width:300px;
  text-align: left;
}
</style>