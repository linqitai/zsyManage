<template>
  <div class="QRcode">
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
          <span class="breadcrumbTextCurrent">立牌二维码</span>
        </mu-breadcrumb-item>
      </mu-breadcrumb>
    </div>
    <div class="right-page">
      <div class="searchBox">
        <!-- <div class="box">
          <span class="boxlabel">时间</span>
          <mu-date-picker class="normalWidth time" style="" mode="landscape" hintText="开始时间" v-model="searchs.startTime" @change="startTimeChange" />
          <span class="marginRight">至</span>
          <mu-date-picker class="normalWidth time" mode="landscape" hintText="结束时间" v-model="searchs.endTime" @change="endTimeChange" />
        </div> -->
        <div class="box">
          <span class="boxlabel">名称</span>
          <mu-text-field class="normalWidth" hintText="名称查询" v-model="searchs.name" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">所属门店</span>
          <mu-text-field class="normalWidth-l" hintText="负责人查询" v-model="searchs.store" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">所属商户</span>
          <mu-text-field class="normalWidth-l" hintText="负责人查询" v-model="searchs.merchant" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <mu-raised-button mini label="查询" class="demo-raised-button" primary @click="searchEvent" />
          <mu-raised-button mini label="重置" class="demo-raised-button" primary @click="reset" />
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe style="width: 1130px; margin-left:5px;">
          <el-table-column fixed prop="date" label="添加时间" width="180"></el-table-column>
          <el-table-column prop="name" label="名称"width="120"></el-table-column>
          <el-table-column prop="name" label="编号" width="150"></el-table-column>
          <el-table-column prop="name" label="所属门店" width="200"></el-table-column>
          <el-table-column prop="address" label="所属商户" width="400"></el-table-column>
          <el-table-column fixed="right" label="图片" width="80">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
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
      dialog: false,
      isShowMore: false,
      showCheckbox: false,
      total: 130,
      currentPage: 1,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      mtypeList: ['全部', '自然人', '企业商户', '个体工商户'],
      runTYpeList: ['全部', '美食', '超市便利店', '休闲娱乐', '购物', '爱车', '生活服务', '教育培训', '医疗健康', '航旅', '专业销售/批发', '政府/社会组织'],
      statusList: ['全部', '待提交', '待审核', '审核驳回', '网商审核中', '网商驳回', '正常使用', '禁用中'],
      provinceList: ['全国', '浙江省', '江西省', '广东省'],
      cityList: ['全省', '温州市', '杭州市', '宁波市'],
      areaList: ['全市', '瓯海区', '鹿城区', '龙王渠'],
      searchs: {
        name: '',
        store: '',
        merchant: ''
      },
      tableData: [{
        date: '2016-05-03 23:12:08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        isopen: 1
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        isopen: 0
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        isopen: 0
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        isopen: 1
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
      // this.$router.push('/detail')
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
@import './QRcode';
</style>