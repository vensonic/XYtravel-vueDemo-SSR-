<template>
  <div class="container">
    <el-row class="airlines" type="flex" justify="space-between">
      <!-- 左边列表页 -->
      <div class="airlines-info">
        <!-- 搜索栏 -->
        <div class="serach">
            <flightsFilters
            :data='cashFligthsInfo'
            @filterFLightsList='filterFLightsList'
            />
        </div>
        <!-- 航班列表头部 -->
        <el-row class="airlines-list-head">
          <el-col :span="6">航空信息</el-col>
          <el-col :span="6">起飞时间</el-col>
          <el-col :span="6">到达时间</el-col>
          <el-col :span="6">价格</el-col>
        </el-row>
        <!-- 航班列表信息 -->
        <airlinesItem v-for="(item,index) in fligthsList" :key="index" :data="item" />
        <!-- 提示没有数据 -->
        <div class="tips" v-if='fligthsList.length === 0'>抱歉!没有航班信息</div>
        <!-- 分页器 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <div class="airlines-service">
          <el-row class="guarantee">
            <el-col :span="8" class="guarantee-items">
              <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF"></i>
              <span>航协认证</span>
            </el-col>
            <el-col :span="8" class="guarantee-items">
              <i class="iconfont iconbaozheng" style="color:green"></i>
              <span>出行保证</span>
            </el-col>
            <el-col :span="8" class="guarantee-items">
              <i class="iconfont icondianhua" style="color:#409EFF"></i>
              <span>7x24</span>
            </el-col>
          </el-row>
          <div class="contract">免费客服电话：4006345678转2</div>
        </div>
        <div class="search-history">
          <h3>历史查询</h3>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import airlinesItem from "@/components/airticket/airlinesItem";
import flightsFilters from '@/components/airticket/flightsFilters';
export default {
  data() {
    return {
      //航班信息
      fligthsInfo: {
          flights:[],
          info:{},
          options:{},
          total:0
      },
      //航班信息副本,不可改变,用于过滤
      cashFligthsInfo: {
          flights:[],
          info:{},
          options:{},
          total:0
      },
      //航班列表
      fligthsList:[],
      //当前页码
      currentPage:1,
    //每页显示的条数
        pageSize:5,
        //总条数
        total:0
    };
  },
  methods: {
    //计算每页显示航班显示
    render(){
        const {flights} = this.fligthsInfo
        this.fligthsList = flights.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
    },
    // 过滤信息列表
    filterFLightsList(arr){
        // console.log(arr);
        if(arr){
            this.fligthsInfo.flights = arr
            this.total = arr.length
            this.render()
        }

    },
    //分页器修改每页显示条数变化触发的函数
    handleSizeChange(pageSize){
        this.pageSize = pageSize
        this.render()
    },
     //分页器当前页码变化触发的函数
     handleCurrentChange(currentPage){
         this.currentPage = currentPage
         this.render()
     }
  },
  mounted() {
    // console.log(this.$route);

    this.$axios.get("/airs", { params: this.$route.query }).then(res => {
      console.log(res);
      this.fligthsInfo = res.data;
      this.cashFligthsInfo = {...res.data}
      this.total = this.fligthsInfo.total;

      this.render()
    });
  },
  components: {
    airlinesItem,
    flightsFilters
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
  .airlines {
      .tips{
          text-align: center
      }
    .airlines-info {
      width: 745px;
      .airlines-list-head {
        height: 38px;
        background: #f6f6f6;
        color: #666;
        text-align: center;
        font-size: 14px;
        line-height: 38px;
        border: 1px solid #ddd;
      }
      .pagination{
          text-align: center;
      }
    }
    .aside {
      width: 240px;
      .airlines-service {
        width: 240px;
        border: 1px solid #ddd;
        .guarantee {
          .guarantee-items {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px;
            .iconfont {
              font-size: 40px;
              margin-bottom: 5px;
            }
            span {
              font-size: 12px;
            }
          }
        }
        .contract {
          padding: 5px 10px;
          background: #eee;
          font-size: 14px;
        }
      }
      .search-history {
        margin-top: 10px;
        padding: 10px;
        width: 240px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        h3 {
          height: 30px;
          font-size: 16px;
          font-weight: normal;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
}
</style>
