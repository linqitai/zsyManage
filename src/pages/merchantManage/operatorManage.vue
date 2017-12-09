<template>
  <div class="operatorManage">
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
          <span class="breadcrumbTextCurrent">操作员管理</span>
        </mu-breadcrumb-item>
      </mu-breadcrumb>
    </div>
    <div class="right-page">
      <div class="searchBox">
        <div class="box">
          <span class="boxlabel">姓名</span>
          <mu-text-field class="normalWidth" hintText="姓名查询" v-model="searchs.name" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl verticalAlignBottom">
          <span class="boxlabel">性别</span>
          <!-- <mu-text-field class="normalWidth-l" hintText="账号查询" v-model="searchs.account" @keyup.enter.native="searchEvent" /> -->
          <mu-select-field class="normalWidth-l" v-model="searchs.sex" :labelFocusClass="['label-foucs']" hintText="选择姓名">
            <mu-menu-item v-for="(text,index) in sexList" :key="index" :value="index" :title="text" />
          </mu-select-field>
        </div>
        <div class="box boxpdl verticalAlignBottom">
          <span class="boxlabel">角色</span>
          <mu-select-field class="normalWidth-ll" v-model="searchs.role" :labelFocusClass="['label-foucs']" hintText="选择角色">
            <mu-menu-item v-for="(text,index) in roleList" :key="index" :value="index" :title="text" />
          </mu-select-field>
        </div>
        <div class="box">
          <span class="boxlabel">手机号码</span>
          <mu-text-field class="normalWidth-l" hintText="手机号码查询" v-model="searchs.mobile" :maxLength="maxLength" type="number" :max="maxLength" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">所在店铺</span>
          <mu-text-field class="normalWidth-l" hintText="所在店铺查询" v-model="searchs.store" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">所属商户</span>
          <mu-text-field class="normalWidth-l" hintText="所属商户查询" v-model="searchs.merchant" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <mu-raised-button mini label="查询" class="demo-raised-button" primary @click="searchs" />
          <mu-raised-button mini label="重置" class="demo-raised-button" primary @click="reset" />
        </div>
        <div v-if="isShowMore">
          no
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe style="width: 1270px;margin-left:5px;">
          <el-table-column fixed prop="date" label="添加时间" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="sex" label="性别" width="120"></el-table-column>
          <el-table-column prop="role" label="角色" width="120"></el-table-column>
          <el-table-column prop="mobile" label="手机号码" width="150"></el-table-column>
          <el-table-column prop="identity" label="身份证号" width="180"></el-table-column>
          <el-table-column prop="store" label="所在店铺" width="200"></el-table-column>
          <el-table-column prop="merchant" label="所属商户" width="200"></el-table-column>
        </el-table>
        <div class="paginationWrapper">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeOption" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <mu-dialog :open="dialog" title="温馨提示" @close="close">
      确认禁用该商户？
      <mu-flat-button slot="actions" @click="close" primary label="取消" />
      <mu-flat-button slot="actions" primary @click="close" label="确定" />
    </mu-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import { resetSearchs } from 'common/js/util'
import animations from 'create-keyframe-animation'
import { prefixStyle } from 'common/js/dom'
// import { openClose } from 'common/js/util.js'
const transform = prefixStyle('transform')

export default {
  data() {
    return {
      maxLength: 11,
      dialog: false,
      isShowMore: false,
      showCheckbox: false,
      total: 130,
      currentPage: 1,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      sexList: ['全部', '男', '女'],
      roleList: ['全部', '收银员', '管理员'],
      statusList: ['全部', '待提交', '待审核', '审核驳回', '网商审核中', '网商驳回', '正常使用', '禁用中'],
      provinceList: ['全国', '浙江省', '江西省', '广东省'],
      cityList: ['全省', '温州市', '杭州市', '宁波市'],
      areaList: ['全市', '瓯海区', '鹿城区', '龙王渠'],
      searchs: {
        name: '',
        sex: '',
        role: '',
        mobile: '',
        identity: '',
        store: '',
        merchant: ''
      },
      tableData: [{
        date: '2016-05-03 23:12:08',
        name: '王小虎',
        sex: '上海',
        role: '普陀区',
        mobile: '13987776325',
        identity: '2016-05-03 23:12:08',
        store: '上海市普陀区金沙江路 ',
        merchant: 200333
      }, {
        date: '2016-05-03 23:12:08',
        name: '王小虎',
        sex: '上海',
        role: '普陀区',
        mobile: '13987776325',
        identity: '2016-05-03 23:12:08',
        store: '上海市普陀区金沙江路 ',
        merchant: 200333
      }, {
        date: '2016-05-03 23:12:08',
        name: '王小虎',
        sex: '上海',
        role: '普陀区',
        mobile: '13987776325',
        identity: '2016-05-03 23:12:08',
        store: '上海市普陀区金沙江路 ',
        merchant: 200333
      }, {
        date: '2016-05-03 23:12:08',
        name: '王小虎',
        sex: '上海',
        role: '普陀区',
        mobile: '13987776325',
        identity: '2016-05-03 23:12:08',
        store: '上海市普陀区金沙江路 ',
        merchant: 200333
      }]
    }
  },
  filters: {
    openClose(value) {
      return value === 1 ? '启用' : value === 0 ? '禁用' : '---'
    }
  },
  methods: {
    open(isopen) {
      this.dialog = true
      console.log(isopen)
      if (isopen === 1) {
        // 这里调用接口
      }
    },
    close() {
      this.dialog = false
    },
    showMoreEvent() {
      this.isShowMore = !this.isShowMore
      let rotate = 0
      if (this.isShowMore === true) {
        rotate = -90
      }
      this.$refs.moreBtn.style[transform] = `rotate(${rotate}deg)`
    },
    detail(row) {
      console.log(row);
      this.$router.push('/detail')
    },
    reset() {
      resetSearchs(this.searchs)
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
    // pageSizeChange(newIndex) {
    //   console.log('page size change event', newIndex)
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './operatorManage';
.el-table
  td
    padding 10px 0 !important
</style>