<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>
.main-sidebar{z-index: 0 !important}

@media (max-width: 991.98px){
  .sidebar-open .main-sidebar, .sidebar-open .main-sidebar:before{z-index: 1900 !important}
}
</style>

