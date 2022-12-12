<!--
高校地图
描述：展示高校地理信息位置
作者：焦佳宇
-->
<template>
  <!--bmap框-->
  <div class="bmap" id="container"></div>
</template>

<script>
export default {
  name: "BmapDemo",
  props: ["school"],
  data() {
    //存一下map
    return {
      thisMap: "",
    };
  },
  methods() {
    translateCallback = function (data) {
      console.log(data);
      if (data.status === 0) {
        var marker = new BMapGL.Marker(data.points[0]);
        bm.addOverlay(marker);
        var label = new BMapGL.Label(this.school.university_chname, {
          offset: new BMapGL.Size(20, -10),
        });
        marker.setLabel(label); //添加百度label
        bm.setCenter(data.points[0]);
      }
    };
  },
  updated() {
    //地图初始化
    var bm = this.thisMap;
    bm.centerAndZoom(
      new BMapGL.Point(
        this.school.university_address_x,
        this.school.university_address_y
      ),
      17
    );
  },
  mounted() {
    console.log("test for map");
    var map = new BMapGL.Map("container");
    this.thisMap = map;
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 16);
    map.enableScrollWheelZoom(true);

    const scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
    map.addControl(scaleCtrl);
    const zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
    map.addControl(zoomCtrl);
    const cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
    map.addControl(cityCtrl);

  },
};
</script>

<style scoped>
.bmap {
  width: 100%;
  height: 400px;
  border: 0px solid #000;
}
</style>

