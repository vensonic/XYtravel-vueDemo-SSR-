<template>
  <div class="airlineItem">
      <div @click="showRecom">
<el-row class="airlineInfo" type="flex" justify="space-between" align="middle">
      <div class="airlineName">{{data.airline_name}}{{data.flight_no}}</div>
      <el-row class="timeInfo" type="flex" justify="space-around">
        <div class="departInfo">
          <div class="departTime">{{data.dep_time}}</div>
          <div class="departAirPort">{{data.org_airport_name}}{{data.org_airport_quay}}</div>
        </div>
    <div class="takingTime">{{takingTime}}</div>
        <div class="destInfo">
          <div class="destTime">{{data.arr_time}}</div>
          <div class="destAirPort">{{data.dst_airport_name}}{{data.dst_airport_quay}}</div>
        </div>
      </el-row>
      <div class="ticketPrice">
        ￥<span>{{data.seat_infos[0].settle_price}}</span>起
      </div>
    </el-row>
      </div>
    
    <!-- 机票选择列表 -->
    <el-row class="priceCombo"  type="flex" justify="center" align="middle" v-if="isshow">
      <el-col :span="4">
        <el-row class="lowerPrice" type="flex" justify="center" align="middle">低价推荐</el-row>
      </el-col>
      <el-col :span="20">
        <el-row class="recomInfo" 
        type="flex" 
        justify="center"
         align="middle"
         v-for='(item,index) in data.seat_infos'
         :key='index'
         >
          <el-col :span="14">
            <div class="service-info">
              <span class="serviceClass">{{item.group_name}}</span>
              <span>|</span>
              <span>{{item.supplierName}}</span>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="price">￥{{item.settle_price}}</div>
          </el-col>
          <el-col :span="5">
            <el-button type="warning" size="small">选定</el-button>
            <div class="remaining">剩余:{{item.discount}}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
        isshow:false
    };
  },
  methods: {
     showRecom(){
         this.isshow = !this.isshow
     } 
  },
  props:{
      data:{
          type:Object,
          default:{}
      }
  },
  computed: {
      //计算航班路程花费时间
      takingTime(){
        //   console.log(this.data);
          const depArr = this.data.dep_time.split(':')
          const arrArr = this.data.arr_time.split(':')
          if(arrArr[0]<depArr[0]){
              arrArr[0]+=24
          }
          const totalMinute = (arrArr[0]*60 + +arrArr[1]) - (depArr[0]*60 + +depArr[1])
          const hours = Math.floor(totalMinute/60) 
          const minute = totalMinute%60
          return hours+'时'+minute+'分'
      }
  },
  mounted () {
    // console.log(this.data,'123')
  }
};
</script>
<style lang="less" scoped>
.airlineItem {
  margin: 10px 0;
  // 航班信息
  border: 1px solid #ddd;
  .airlineInfo {
    height: 82px;
    border-bottom: 1px solid #ddd;
    .airlineName {
      flex: 2;
      font-size: 14px;
      text-align: center;
    }
    .timeInfo {
      flex: 3;
      text-align: center;
      padding: 0 40px;
      .departInfo {
        .departTime {
          font-size: 24px;
        }
        .departAirPort {
          font-size: 12px;
          color: #bbb;
        }
      }
      .takingTime {
        padding: 5px 0;
        font-size: 14px;
        height: 30px;
        border-bottom: 1px solid #bbb;
        color: #bbb;
      }
      .destInfo {
        .destTime {
          font-size: 24px;
        }
        .destAirPort {
          font-size: 12px;
          color: #bbb;
        }
      }
    }
    .ticketPrice {
      flex: 2;
      text-align: center;
      font-size: 14px;
      span {
        font-size: 24px;
        color: orange;
      }
    }
  }
  //   低价推荐
  .priceCombo {
    background: #f6f6f6;
    .lowerPrice {
      height: 100%;
    }
    .recomInfo {
      height: 73px;
      border-bottom: 1px solid #ddd;
      .service-info {
          font-size: 12px;
        .serviceClass {
            color:green;
        }
      }
      .price {
          font-size: 20px;
          color:orange;
      }
      .remaining {
          font-size: 14px;
          color:#666;
          margin-top: 5px;
      }
    }
  }
}
</style>
