<template>
<div class="container">
    <div class="form-wrapper">
        <!-- 表单头部 -->
        <el-row class="form-header" type="flex">
            <div :class="{tabs:true,active:isActive}" @click="handlechange(0)">登录</div>
            <div :class="{tabs:true,active:!isActive}" @click="handlechange(1)">注册</div>
        </el-row>
        <!-- 登录表单 -->
        <loginForm v-if='isActive'></loginForm>
        <!-- 注册表单 -->
        <registerForm v-if="!isActive"></registerForm>
    </div>
</div>
</template>
<script>
import loginForm from "@/components/user/loginForm";
import registerForm from "@/components/user/registerForm";
export default {
    data () {
        return {
            isActive:true
        }
    },
    methods: {
        handlechange(i){
            if(i===0){
                //登录激活
                this.isActive = true
                //显示登录组件
            }else{
                //注册激活
                this.isActive = false
                //显示注册组件
            }
        }
    },
    components: {
        loginForm,
        registerForm
    }
}
</script>
<style lang="less" scoped>
    .container{
        position: relative;
        height: 700px;
        background: url('http://157.122.54.189:9095/assets/images/th03.jfif');
        .form-wrapper{
            position: absolute;
            top: 50%;
            left:50%;
            transform: translate(-50%,-50%);
            width: 400px;
            background: #fff;
            box-shadow: 1px 1px 3px rgba(0,0, 0, 0.2);
            .form-header{
                .tabs{
                    flex:1;
                    height: 50px;
                    line-height: 50px;
                    font-size: 16px;
                    color:#666;
                    background: #eee;
                    text-align: center;
                    box-sizing: border-box
                }
                .active{
                    color:orange;
                    border-top:2px solid orange;
                    background: #fff;
                }
            }
        }
    }
</style>

