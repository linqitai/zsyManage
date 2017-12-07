<template>
  <div class="experience">
    <div class="breadcrumb">
      <mu-breadcrumb>
        <mu-breadcrumb-item>
          <i class="iconfont iconHome">&#xe6c8;</i>
        </mu-breadcrumb-item>
        <mu-breadcrumb-item href="javascript:void(0)">
          <span class="breadcrumbText">商户管理</span>
        </mu-breadcrumb-item>
        <!-- <mu-breadcrumb-item href="/">VideoGame</mu-breadcrumb-item> -->
        <mu-breadcrumb-item>
          <span class="breadcrumbTextCurrent">历程</span>
        </mu-breadcrumb-item>
      </mu-breadcrumb>
    </div>
    <div class="right-page">
      <div class="searchBox">
        <div class="box">
          <span class="boxlabel">时间</span>
          <mu-date-picker class="normalWidth time" style="" mode="landscape" hintText="开始时间" v-model="searchs.startTime" @change="startTimeChange" />
          <span class="marginRight">至</span>
          <mu-date-picker class="normalWidth time" mode="landscape" hintText="结束时间" v-model="searchs.endTime" @change="endTimeChange" />
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">姓名</span>
          <mu-text-field class="normalWidth" hintText="姓名查询" v-model="searchs.name" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">账号</span>
          <mu-text-field class="normalWidth-l" hintText="账号查询" v-model="searchs.account" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl verticalAlignBottom">
          <span class="boxlabel">角色</span>
          <mu-select-field class="normalWidth" v-model="searchs.role" :labelFocusClass="['label-foucs']" hintText="选择角色">
            <mu-menu-item v-for="(text,index) in roleList" :key="index" :value="index" :title="text" />
          </mu-select-field>
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">商户</span>
          <mu-text-field class="normalWidth-l" hintText="商户查询" v-model="searchs.merchant" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">动作</span>
          <mu-text-field class="normalWidth-l" hintText="动作查询" v-model="searchs.action" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <mu-raised-button mini label="查询" class="demo-raised-button" primary @click="searchs" />
          <mu-raised-button mini label="重置" class="demo-raised-button" primary @click="reset" />
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe style="width: 1320px;margin-left:5px;"> <!-- 1170px -->
          <el-table-column fixed prop="date" label="时间" width="230"></el-table-column>
          <el-table-column prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="name" label="账号" width="200"></el-table-column>
          <el-table-column prop="name" label="角色" width="150"></el-table-column>
          <el-table-column prop="address" label="商户" width="470"></el-table-column>
          <el-table-column prop="name" label="动作" width="120"></el-table-column>
        </el-table>
        <div class="paginationWrapper">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeOption" :page-size="pageSizeOption[0]" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import MHeader from 'components/m-header/m-header'
export default {
  data() {
    return {
      showCheckbox: false,
      total: 130,
      currentPage: 1,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      roleList: ['全部', '经营者', '管理员', '收银员', '游客'],
      searchs: {
        startTime: '',
        endTime: '',
        name: '',
        account: '',
        role: '',
        merchant: '',
        action: ''
      },
      tableData: [{
        date: '2016-05-03 10:55:48',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  mounted() {
    // this.drawLine();
  },
  methods: {
    reset() {
      console.log('reset')
    },
    searchEvent() {
      console.log('searchEvent')
    },
    startTimeChange(val) {
      console.log('change：' + val)
    },
    endTimeChange(val) {
      console.log('change：' + val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    // MHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './experience';
</style>