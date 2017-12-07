<template>
  <div class="merchantManage">
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
          <span class="breadcrumbTextCurrent">商户管理</span>
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
          <span class="boxlabel">商户名称</span>
          <mu-text-field class="normalWidth" hintText="商户名称查询" v-model="searchs.mName " @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl verticalAlignBottom">
          <span class="boxlabel">商户类型</span>
          <!-- <mu-text-field class="normalWidth-l" hintText="账号查询" v-model="searchs.account" @keyup.enter.native="searchEvent" /> -->
          <mu-select-field class="normalWidth-l" v-model="searchs.mtype" :labelFocusClass="['label-foucs']" hintText="选择商户类型">
            <mu-menu-item v-for="(text,index) in mtypeList" :key="index" :value="index" :title="text" />
          </mu-select-field>
        </div>
        <div class="box boxpdl verticalAlignBottom">
          <span class="boxlabel">经营类目</span>
          <mu-select-field class="normalWidth-ll" v-model="searchs.runTYpe" :labelFocusClass="['label-foucs']" hintText="选择经营类目">
            <mu-menu-item v-for="(text,index) in runTYpeList" :key="index" :value="index" :title="text" />
          </mu-select-field>
        </div>
        <div class="box boxpdl">
          <span class="boxlabel">负责人</span>
          <mu-text-field class="normalWidth-l" hintText="负责人查询" v-model="searchs.fzMan" @keyup.enter.native="searchEvent" />
        </div>
        <div class="box boxpdl">
          <mu-raised-button mini label="查询" class="demo-raised-button" primary @click="searchEvent" />
          <mu-raised-button mini label="重置" class="demo-raised-button" primary @click="reset" />
          <mu-flat-button class="demo-flat-button btnWidthForMore" primary @click="showMoreEvent">
            <i class="iconfont iconfontLeft icon" ref="moreBtn">&#xe602;</i>
          </mu-flat-button>
        </div>
        <div v-if="isShowMore">
          <div class="box">
            <span class="boxlabel">手机号码</span>
            <mu-text-field class="normalWidth-l" hintText="手机号码查询" v-model="searchs.mobile" @keyup.enter.native="searchEvent" />
          </div>
          <div class="box boxpdl verticalAlignBottom">
            <span class="boxlabel">状态</span>
            <!-- <mu-text-field class="normalWidth-l" hintText="商户查询" v-model="searchs.status" @keyup.enter.native="searchEvent" /> -->
            <mu-select-field class="normalWidth-ll" v-model="searchs.status" :labelFocusClass="['label-foucs']" hintText="选择状态">
              <mu-menu-item v-for="(text,index) in statusList" :key="index" :value="index" :title="text" />
            </mu-select-field>
          </div>
          <div class="box boxpdl">
            <span class="boxlabel">代理商</span>
            <mu-text-field class="normalWidth-l" hintText="代理商查询" v-model="searchs.agent" @keyup.enter.native="searchEvent" />
          </div>
          <div class="box boxpdl verticalAlignBottom">
            <span class="boxlabel">店铺地址</span>
            <!-- <mu-text-field class="normalWidth-l" hintText="商户查询" v-model="searchs.address" @keyup.enter.native="searchEvent" /> -->
            <mu-select-field class="normalWidth" v-model="searchs.address.province" :labelFocusClass="['label-foucs']" hintText="选择省">
              <mu-menu-item v-for="(text,index) in provinceList" :key="index" :value="text" :title="text" />
            </mu-select-field>
            <mu-select-field class="normalWidth" v-model="searchs.address.city" v-if="searchs.address.province" :labelFocusClass="['label-foucs']" hintText="选择市">
              <mu-menu-item v-for="(text,index) in cityList" :key="index" :value="text" :title="text" />
            </mu-select-field>
          </div>
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe style="width: 98%;margin-left:5px;">
          <el-table-column fixed prop="date" label="申请时间" width="180"></el-table-column>
          <el-table-column prop="name" label="商户名称" width="120"></el-table-column>
          <el-table-column prop="name" label="商户类型" width="120"></el-table-column>
          <el-table-column prop="name" label="经营类型" width="120"></el-table-column>
          <el-table-column prop="address" label="店铺地址" width="400"></el-table-column>
          <el-table-column prop="name" label="负责人" width="120"></el-table-column>
          <el-table-column prop="name" label="性别" width="120"></el-table-column>
          <el-table-column prop="name" label="手机号码" width="120"></el-table-column>
          <el-table-column prop="name" label="状态" width="120"></el-table-column>
          <el-table-column prop="name" label="代理商" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
              <el-button type="text" size="small" @click="open(scope.row.isopen)">{{scope.row.isopen|openClose}}</el-button>
              <el-button type="text" size="small">门店</el-button>
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
        startTime: '',
        endTime: '',
        mName: '',
        mtype: '',
        runTYpe: '',
        fzMan: '',
        mobile: '',
        status: '',
        agent: '',
        address: {
          province: '',
          city: '',
          area: ''
        }
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
    showMoreEvent(el, done) {
      this.isShowMore = !this.isShowMore
      let rotate = 0
      if (this.isShowMore === true) {
        // rotateStart = '-90'
        rotate = -90
      }
      this.$refs.moreBtn.style[transform] = `rotate(${rotate}deg)`
      // let animation = {
      //   transform: `rotate(${rotate})`
      // }
      // animations.registerAnimation({
      //   name: 'move',
      //   animation,
      //   presets: {
      //     duration: 200,
      //     easing: 'linear'
      //   }
      // })

      // animations.runAnimation(this.$refs.moreBtn, 'move', done)
    },
    detail(row) {
      console.log(row);
      this.$router.push('/detail')
    },
    reset() {
      for (let key in this.searchs) {
        if (key === 'address') {
          console.log('find roleList')
          for (let keyToo in this.searchs['address']) {
            this.searchs['address'][keyToo] = ''
          }
        } else {
          this.searchs[key] = ''
        }
      }
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
@import './merchantManage';
</style>