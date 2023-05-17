<template>
    <el-card :body-style="{ padding: '0px' }">
        <img
          :src="document.img"
          class="image"
        />
        <div style="padding: 14px">
          <span>{{ document.name }}</span>
          <div class="bottom">
            
            <el-button text class="button" @click="seeDocument">查看</el-button>
          </div>
        </div>
      </el-card>
</template>
<script>
 export default {
    props: [
      'document',
    ],
    data() {
      return {};
    },
    methods: {
      seeDocument(){
        this.$router.push({
          path:'/document_detail',
          query:{
            document_id: this.document.documentId
          }
        })
      }
    },
  };
</script>
<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
</style>