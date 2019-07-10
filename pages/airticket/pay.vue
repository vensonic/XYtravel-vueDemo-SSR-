<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{orderInfo.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
    data () {
        return {
            orderInfo:{}
        }
    },
    mounted () {
        //根据订单id,获取支付信息
        //需要带上token值

        setTimeout(() => {//由于获取store的时候需要时间,mounted执行完毕还没获取到token
       const {token} = this.$store.state.user.userInfo
       
        this.$axios({
            url:`/airorders/${this.$route.query.id}`,
            headers:{Authorization:`Bearer ${token}`}
        }
        ).then(res=>{
            console.log(res);
            this.orderInfo = res.data
            //生成二维码
            const {payInfo,orderNo,price} = res.data
            let canvas = document.getElementById('qrcode-stage')
            QRCode.toCanvas(canvas, payInfo.code_url, function (error) {
            if (error) console.error(error)
            console.log('success!');
            })
               //轮询支付状态
            let timer = setInterval(() => {     
                this.$axios({
                    url:'/airorders/checkpay',
                    method:'post',
                    data:{
                        id:this.$route.query.id,
                        nonce_str:price,
                        out_trade_no:orderNo
                    },
                    headers:{Authorization:`Bearer ${token}`}
                }).then(res=>{
                    console.log(res);
                    const {trade_state} = res.data
                    if(trade_state === 'NOTPAY'){

                    }else{
                        clearInterval(timer)
                        this.$message.success('订单支付成功!!!')
                        setTimeout(() => {
                             this.$router.push('/airticket')
                        }, 1000);
                       
                    }
                    
                })
            }, 3000);
        })
        }, 100);
      
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>