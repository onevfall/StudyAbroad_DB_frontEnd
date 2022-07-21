<template>
  <div class="card-item" v-if="coin_num>0" @click="childClick">
    <p class="t1" >余额+{{coin_num}}鸟币</p>
    <p class="t3">{{(coin_num/10).toFixed(2)}}</p>
    <div class="card-foot">￥{{(coin_num/10).toFixed(2)}}</div>
  </div>
  <div class="card-item" v-else @click="childClick">
    <p class="t1" >自定义充值鸟币数量</p>
    <p class="t3">
        <input type="text" class="custom-num" v-model="enter_coin_num">
         <!-- onkeydown="myInputEnter" -->
    </p>
    <div class="card-foot">先输入再确定</div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
export default {
    props:['coin_num','isInput'],
    data(){
        return{
            enter_coin_num:0,
        }
    },
    methods: {
        childClick () {
        // childByValue是在父组件on监听的方法
        // 第二个参数this.childValue是需要传的值
        if(this.coin_num>0){  //是固定值的充值
            this.$emit('childByValue', this.coin_num)
        }
        else{   //是自定义的值
            this.$emit('childByValue', this.enter_coin_num)
        }

    },
}

};
</script>

<style scoped>
.card-item {
    width: 204px;
    height: 134px;
    border-radius: 8px;
    border: 2px solid #fae8d0;
    background-color: #fff;
    position: relative;
    text-align: center;
    margin-right: 26px;
    flex-shrink: 0;
    cursor: pointer;
}

.card-item .t1 {
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    color: #222226;
    font-weight: 700;
    margin: 24px 0 12px;
    position: relative;
    z-index: 2;
}
.card-item .t3 {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: #b87100;
}
.card-item .card-foot {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 32px;
    background-color: #fae8d0;
    font-size: 12px;
    line-height: 32px;
    color: #69421b;
    font-weight: 500;
    bottom: 0;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
}
.card-item:hover {
    border: 1px solid #02a7e3;
    color: #02a7e3;
    opacity: 0.6;
}

.card-item .custom-num{
    border: none;
    outline: none;
    background-color: transparent;
    max-width: 100%;
    text-align: center;
    color: #b87100;
    font-weight: 700;
    font-size: 24px;
}
</style>