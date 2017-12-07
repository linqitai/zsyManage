<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
#app{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.mu-checkbox-icon{
  margin-right: 5px !important;
}

.mu-menu-item{
  padding: 0 16px !important;
}
.mu-menu-item-wrapper.active{
  color: $color-theme
}
</style>