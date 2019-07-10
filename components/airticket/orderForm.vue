<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in passengers" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in ticketInfo.insurances " :key="index">
          <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" border @change="insuranceChange(item.id)"></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <input type="hidden" :value="getTotalPrice">
  </div>
</template>

<script>
export default {
  data() {
    return {
      //乘客信息数组
      passengers: [
        {
          username: "",
          id: ""
        }
      ],
      //机票信息
      ticketInfo: {
        insurances: [],
        seat_infos:{}
      },
      //选择后的保险信息数组
      checkedInsurances:[],
      //订单联系人
      contactName: "",
      //联系人电话
      contactPhone: "",
      //验证码:
      captcha:''
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.passengers.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.passengers.splice(index, 1);
    },
    //选择保险
    insuranceChange(id){
        //判断数组中是否含有该id
       let index = this.checkedInsurances.indexOf(id)
       if(index < 0){
           this.checkedInsurances.push(id)
       }else{
           this.checkedInsurances.splice(index,1)
       }
    },
    // 发送手机验证码
    handleSendCaptcha() {
      if (this.contactPhone) {
        this.$axios
          .post("/captchas", { tel: this.contactPhone })
          .then(res => {
            this.$alert(res.data.code, "验证码", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.captcha = res.data.code;
              }
            });
          });
      } else {
        this.$alert("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
      }
    },

    // 提交订单
    handleSubmit() {
        const submitForm = {
            users:this.passengers,
            insurances:this.checkedInsurances,
            contactName:this.contactName,
            contactPhone: this.contactPhone,
            captcha: this.captcha,
            invoice:false,
            seat_xid:this.$route.query.seat_xid,
            air:this.$route.query.id
        }
        // console.log(submitForm); 
        this.$axios({
            url:'/airorders',
            method: 'post',
            data:submitForm,
            headers:{ Authorization: `Bearer ${this.$store.state.user.userInfo.token}`}
        }
        ).then(res=>{
          // console.log(res);
          const {id} = res.data.data
          this.$message.success('订单正在生成中,请稍后......')
          this.$router.push({
            path:'/airticket/pay',
            query:{id}
          })
        })
    }
  },
  mounted() {
    this.$axios
      .get(`/airs/${this.$route.query.id}`, {
        params: {
          seat_xid: this.$route.query.seat_xid
        }
      })
      .then(res => {
        // console.log(res);
        this.ticketInfo = res.data;
        this.$emit('getOrderInfo',this.ticketInfo)
      });
  },
  computed: {
    getTotalPrice(){
      // console.log(this.ticketInfo.seat_infos);
      
    //  乘坐人数*(机票单价+机建燃油+选中的保险金额)
      let price = this.ticketInfo.seat_infos.par_price
       price += this.ticketInfo.airport_tax_audlet
       price += 30*this.checkedInsurances.length
       price *= this.passengers.length
       this.$emit('setTotalPrice',price)
       return price
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>