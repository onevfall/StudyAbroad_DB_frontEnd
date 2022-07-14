<!--
机构地图
描述：展示机构地理信息位置
作者：张子涵
-->
<template>
  <!--bmap框-->
  <div class="bmap" id="container"></div>
   <div>{{institution.institution_name}}关键字的检索结果</div> 
</template>

<script>

export default {
  name: 'IMap',
  props:["institution"],
  data(){//存一下map
    return {
      thisMap: "",
    };
    },
  updated(){//一开始数据没到，更新渲染呗
    
    var map =this.thisMap;
    var local = new BMapGL.LocalSearch(map, {
		  renderOptions:{map: map}
	  });
    //let {sc}=props;
    console.log(this.institution.institution_name);
    //console.log(prop.school);
    console.log("test fot props");
    local.search(this.institution.institution_location); 
    
//创建地址解析器实例
        var myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(this.institution.institution_location, function(point){
            if(point){
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMapGL.Marker(point, {title: this.institution.institution_location}))
            }else{
                alert('您选择的地址没有解析到结果！');
            }
        }, this.institution.institution_city)
  
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

  }
}
</script>

<style scoped>
.bmap {
  width: 100%;
  height: 400px;
  border: 1px solid #000;
}
</style>

