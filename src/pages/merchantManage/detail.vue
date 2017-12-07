<template>
  <div class="detail">
    <div class="breadcrumb">
      <mu-breadcrumb>
        <mu-breadcrumb-item>
          <i class="iconfont iconHome">&#xe6c8;</i>
        </mu-breadcrumb-item>
        <mu-breadcrumb-item href="javascript:void(0)">
          <span class="breadcrumbText">商户管理</span>
        </mu-breadcrumb-item>
        <!-- <mu-breadcrumb-item href="/">VideoGame</mu-breadcrumb-item> -->
        <mu-breadcrumb-item href="javascript:void(0)">
          <span class="breadcrumbText">商户管理</span>
        </mu-breadcrumb-item>
        <mu-breadcrumb-item>
          <span class="breadcrumbTextCurrent">详情</span>
        </mu-breadcrumb-item>
      </mu-breadcrumb>
    </div>
    <div class="right-page">
      detail
    </div>
    <mu-dialog :open="dialog" title="温馨提示" @close="close">
      确认禁用该商户？
      <mu-flat-button slot="actions" @click="close" primary label="取消" />
      <mu-flat-button slot="actions" primary @click="close" label="确定" />
    </mu-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import MHeader from 'components/m-header/m-header'
// import animations from 'create-keyframe-animation'
// import { prefixStyle } from 'common/js/dom'
// import { openClose } from 'common/js/util.js'
// const transform = prefixStyle('transform')

export default {
  data() {
    return {
      dialog: false,
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
      }
    }
  },
  filters: {
    openClose(value) {
      return value === 1 ? '启用' : value === 0 ? '禁用' : '---'
    }
  },
  methods: {
    close() {
      this.dialog = false
    },
    open(isopen) {
      this.dialog = true
      console.log(isopen)
      if (isopen === 1) {
        // 这里调用接口
      }
    }
  },
  components: {
    // MHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './detail';
</style>