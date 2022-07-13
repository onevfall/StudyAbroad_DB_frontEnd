<!--
高校地图
描述：展示高校地理信息位置
作者：张子涵
-->
<template>
  <!--bmap框-->
  <div class="bmap" id="container"></div>
   <div>{{school.university_chname}}关键字的检索结果</div> 
</template>

<script>

export default {
  name: 'BmapDemo',
  props:["school"],
  data(){//存一下map
    return {
      thisMap: "",
    };
    },
  methods(){
   translateCallback = function (data){
        console.log(data);
      if(data.status === 0) {
        var marker = new BMapGL.Marker(data.points[0]);
        bm.addOverlay(marker);
        var label = new BMapGL.Label(this.school.university_chname,{offset:new BMapGL.Size(20,-10)});
        marker.setLabel(label); //添加百度label
        bm.setCenter(data.points[0]);
      }
    }
    },
  updated(){//一开始数据没到，更新渲染呗
      //谷歌坐标
    var y = 38.897709;
    var x = -77.036543;
    var ggPoint = new BMapGL.Point(x,y);
    console.log("test for map");
    //地图初始化
    var bm = this.thisMap;

    /*//添加谷歌marker和label
    var markergg = new BMapGL.Marker(ggPoint);
    bm.addOverlay(markergg); //添加谷歌marker
    var labelgg = new BMapGL.Label(this.school.university_chname,{offset:new BMapGL.Size(20,-10)});
    markergg.setLabel(labelgg); //添加谷歌label
   
   translateCallback = function (data){
        console.log(data);
      if(data.status === 0) {
        var marker = new BMapGL.Marker(data.points[0]);
        bm.addOverlay(marker);
        var label = new BMapGL.Label(this.school.university_chname,{offset:new BMapGL.Size(20,-10)});
        marker.setLabel(label); //添加百度label
        bm.setCenter(data.points[0]);
      }
    }; */
    var that = this;
    setTimeout(function(){
        var convertor = new BMapGL.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, COORDINATES_WGS84_MC, COORDINATES_BD09, function (data){
        console.log(data);
      if(data.status === 0) {
        var marker = new BMapGL.Marker(data.points[0]);
        bm.addOverlay(marker);
        var label = new BMapGL.Label(that.school.university_chname,{offset:new BMapGL.Size(20,-10)});
        marker.setLabel(label); //添加百度label
        bm.centerAndZoom(data.points[0]);
      }
    })
    }, 1000);



   
    //坐标转换完之后的回调函数
   
 /**
     * 坐标常量说明：
     * COORDINATES_WGS84 = 1, WGS84坐标
     * COORDINATES_WGS84_MC = 2, WGS84的平面墨卡托坐标
     * COORDINATES_GCJ02 = 3，GCJ02坐标
     * COORDINATES_GCJ02_MC = 4, GCJ02的平面墨卡托坐标
     * COORDINATES_BD09 = 5, 百度bd09经纬度坐标
     * COORDINATES_BD09_MC = 6，百度bd09墨卡托坐标
     * COORDINATES_MAPBAR = 7，mapbar地图坐标
     * COORDINATES_51 = 8，51地图坐标
    */

 /*
    var map =this.thisMap;
    var local = new BMapGL.LocalSearch(map, {
		  renderOptions:{map: map}
	  });
    //let {sc}=props;
    console.log(this.school.university_chname);
    //console.log(prop.school);
    console.log("test fot props");
    //local.search(this.school.university_chname); 

    
   
*/
  },
  mounted(){
    console.log("test for map");
    var map = new BMapGL.Map("container"); 
    this.thisMap=map;         
	  map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 15);
	  map.enableScrollWheelZoom(true); 

    const scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    const zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);
    const cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
    map.addControl(cityCtrl);


    /*//添加谷歌marker和label
    var markergg = new BMapGL.Marker(ggPoint);
    bm.addOverlay(markergg); //添加谷歌marker
    var labelgg = new BMapGL.Label(this.school.university_chname,{offset:new BMapGL.Size(20,-10)});
    markergg.setLabel(labelgg); //添加谷歌label
    */

  }
}
</script>

<style scoped>
.bmap {
  width: 100%;
  height: 400px;
  border: 0px solid #000;
}
</style>

