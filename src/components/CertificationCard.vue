<!--
描述：认证信息展示卡片
作者：方新宇
-->
<template>
  <div style="margin-bottom: 30px">
    <el-card style="width: 90%; background-color: #f2f9ff; height: 420px">
      <div class="infor_item">
        <div class="infor_item_name">证明材料</div>
        <el-image
          style="width: 150px; height: 150px"
          :src="certif_infor.image"
          fit="fill"
        />
      </div>
      <div class="infor_item">
        <div class="infor_item_name">学校名称</div>
        <!-- <span>{{}}</span> -->
        <div class="infor_item_content">{{ certif_infor.university_name }}</div>
      </div>
      <div class="infor_item">
        <div class="infor_item_name">学历</div>
        <!-- <span>{{}}</span> -->
        <div class="infor_item_content">{{ certif_infor.identity }}</div>
      </div>
      <div class="infor_item">
        <div class="infor_item_name">入学时间</div>
        <!-- <span>{{}}</span> -->
        <div class="infor_item_content">{{ certif_infor.enrollment_time }}</div>
      </div>
      <div class="infor_item">
        <div class="infor_item_name">专业</div>
        <!-- <span>{{}}</span> -->
        <div class="infor_item_content">{{ certif_infor.major }}</div>
      </div>
      <div class="infor_item">
        <div>
          <el-button type="danger" @click="delete_dialog_visible = true"
            >删除该认证<el-icon class="el-icon--right"><Delete /></el-icon
          ></el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
      v-model="delete_dialog_visible"
      title="警告"
      width="30%"
      :before-close="handleClose"
    >
      <span style="font-size:18px">你确认要删除该认证信息吗? 此操作不可逆!</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="delete_dialog_visible = false">取消</el-button>
          <el-button type="primary" @click="deleteCheck">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from "element-plus";
export default {
  components: {ElMessage},
  props: ["certif_infor"],
  data() {
    return {
      delete_dialog_visible: false,
    };
  },
  created() {},
  watch: {},
  methods: {
    seeMore() {},
    deleteCheck() {
      console.log("1111");
      axios.delete(
        '/identity', {	
      params: {	// 请求参数拼接在url上
        identity_id: this.certif_infor.identity_id,
      }
    })
      .then((res) => {
        this.delete_dialog_visible = false;
        console.log(res);
        if (res.data.status == true){
          ElMessage.success("删除成功!");
          this.$emit("deletecheck",true);
          this.need_refresh = !this.need_refresh;
        }else {
          ElMessage.error("删除失败!");
        }
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
      // axios.delete
    },
    handleClose() {
      this.delete_dialog_visible = false;
    },
  },
};
</script>

<style scoped>
.infor_item {
  text-align: left;
  margin-top: 20px;
  margin-left: 3%;
  display: flex;
  align-items: center;
}

.infor_item .infor_item_name {
  width: 70px;
  margin-right: 20px;
}

.infor_item .infor_item_content {
  width: 300px;
  text-align: left;
}
</style>