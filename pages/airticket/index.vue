<template>
  <div class="container">
    <div class="ticket">
      <h3 class="ticket-title">
        <span class="iconfont iconfeiji"></span>
        国内机票
      </h3>
      <!-- 输入模块和广告模块 -->
      <el-row type="flex" class="serachAndBanner" justify="space-between">
        <!-- 搜索机票模块 -->
        <searchticket></searchticket>
        <div class="banner">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg">
        </div>
      </el-row>
    </div>

    <!-- 服务模块 -->
    <el-row class="service" justify="space-around" type="flex" align="middle">
      <div>
        <span class="iconfont iconweibiaoti-_huabanfuben" style="color:rgb(64, 158, 255)"></span>100%航协认证
      </div>
      <div>
        <span class="iconfont iconbaozheng"  style="color:green"></span>出行保证
      </div>
      <div>
        <span class="iconfont icondianhua"  style="color:rgb(64, 158, 255)"></span> 7x24小时服务
      </div>
    </el-row>
    <!-- 特价机票模块 -->
    <div class="special">
      <h3 class="special-title">
        <span class="iconfont icontejiajipiao"></span>特价机票
      </h3>
      <el-row class="special-content" :gutter="20">
        <el-col :span='6' v-for="(item,index) in specialTicket" :key="index">
          <nuxt-link :to="`airticket/airlines?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
          <div class="special-items"
          :style="`background:url(${item.cover})`">
            <el-row class="special-item-text" type="flex" justify="space-between">
              <span>{{item.departCity}}--{{item.destCity}}</span>
              <span>￥{{item.price}}</span>
            </el-row>
          </div>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import searchticket from "@/components/airticket/searchticket";
export default {
  data() {
    return {
      specialTicket:[]
    };
  },
  components: {
    searchticket
  },
  mounted () {
    this.$axios.get('/airs/sale')
    .then(res=>{
      const {data} = res.data
      this.specialTicket = data
      
    })
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;

  .ticket {
    padding-top: 10px;
    .ticket-title {
      font-size: 20px;
      font-weight: 400;
      color: orange;
      padding:5px 0;
    }
    .serachAndBanner {
      .banner {
          img{ 
          }
      }
    }
  }
  .service {
    margin: 15px 0;
    height: 58px;
     background: #f5f5f5;
     border: 1px solid #ddd;
     padding:5px;
     box-sizing: border-box;
     font-size: 18px;
    >div {
        flex:1;
        text-align: center;
        &:nth-child(2){
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        .iconfont{
          font-size: 26px;
          margin-right: 5px;
        }
    }
    }
    
  }
  .special {
    margin-bottom: 20px;
    .special-title {
      margin: 15px 0;
      font-size: 18px;
      font-weight: 400;
      color: #409eff;
      span{
        margin-right: 5px;
      }
    }
    .special-content {
      padding:20px 10px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      margin:0px !important;
      .special-items{
         position: relative;
          height: 140px;
          background-size: contain;
        .special-item-text{
         position: absolute;
         bottom: 0;
         left:0;
         padding:5px 10px;
         width:100%;
         color:#fff;
         background: rgba(0, 0, 0, 0.6)
        }
      }
    }
  }
}
</style>

