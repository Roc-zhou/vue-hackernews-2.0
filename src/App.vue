<template>
    <div id="app" style="text-align: center">
        <img src="../public/images/logo-144.png" alt="vue-hackernews.logo">
        <p style="line-height: 3;font-size: 30px">{{msg}}</p>
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'hello Vue-HN',
      }
    },
  }
</script>

<style lang="stylus">
    body
        font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        font-size 15px
        background-color lighten(#eceef1, 30%)
        margin 0
        padding-top 55px
        color #34495e
        overflow-y scroll
</style>
