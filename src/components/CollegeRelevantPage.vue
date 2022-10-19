<template>
  <el-card
    class="box-card"
    style="width: 95%; margin-left: 2.5%"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span class="page_name">{{page.name}}</span>
        <el-link :href="page.url" target="_blank" type="warning">查看详情</el-link>
      </div>
    </template>
    <div>{{page.snippet}}</div>
  </el-card>
</template>
<script>
export default {
  props: ["page"],
};
</script>
<style scoped>
.page_name {
  font-size: larger;
  font-weight: bold;
}
.box-card {
  width: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
