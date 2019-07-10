<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <orderForm @getOrderInfo='getOrderInfo' @setTotalPrice='setTotalPrice'/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                  <OrderAside :data='orderInfo' :totalPrice='totalPrice'/>        
            </div>
        </el-row>
    </div>
</template>

<script>
import orderForm from '@/components/airticket/orderForm';
import OrderAside from "@/components/airticket/orderAside";
export default {
    data () {
        return {
            orderInfo:{
              seat_infos:{}
            },
            totalPrice:0
        }
    },
    components: {
        orderForm,
        OrderAside
    },
    methods: {
        getOrderInfo(data){
            // console.log(data);
            
            this.orderInfo = data
        },
        //设置总金额
        setTotalPrice(price){
            this.totalPrice = price
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>