<template>
  <div class="">
    <div class="title_content">
      <div class="title_content_date">
        免费发布领队信息网, 今天是{{year}}年{{month}}月{{day}}日
      </div>
      <div class="title_content_date_fr">
        <span class="tel">
          Tel: 188-8888-8888
        </span>
        <span class="login"
              v-if=" isLogin == '1' ">
          <a href="#"
             @click="registered()">注册</a> |
          <a href="#"
             @click="login()">登录</a>
        </span>
        <span class="login"
              v-else>
          <a href="#">{{userName}}</a> |
          <a href="#"
             @click="userCenter()">用户中心</a> |
          <a href="#"
             @click="userLoginOut()">退出</a>
        </span>
      </div>
    </div>
    <div class="search_css">
      <marquee behavior="alternate">
        <span style="color: blue; font-weight: 700;">普通用户：</span>
        <span>每天发帖上限1条</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span style="color: blue; font-weight: 700;">会员用户:</span>&nbsp;&nbsp;
        <span>每天发帖上限100条 帖子审核快速通道</span>
      </marquee>
    </div>
    <div class="container indexCSS">
      <div class="row">
        <div class="col-sm"
             @click="goTo(1)">
          <a>首页</a>
        </div>
        <div class="col-sm"
             @click="goTo(2)">
          <a>免费发布</a>
        </div>
        <div class="col-sm"
             @click="goTo(3)">
          <a>夜场直招</a>
        </div>
        <div class="col-sm"
             @click="goTo(4)">
          <a>使用帮助</a>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div style="border: 1px dashed; margin: 0 .5em;"></div>
      <div style="margin: 2em;">
        <a>关于我们</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a>联系我们</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a>免责声明</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="#"
           @click="help">使用帮助 </a>
      </div>
      <div style="margin-bottom: 2em;">
        &copy;2020-2020 领队直聘 版权所有
      </div>
    </div>
  </div>
</template>
<script>
// import $ from 'jquery'
export default {
  name: 'Index',
  data () {
    return {
      year: '',
      month: '',
      day: '',
      isLogin: '1',
      userName: (sessionStorage.getItem('userMsg')) ? (sessionStorage.getItem('userMsg')).name : 'null'
    }
  },
  methods: {
    userCenter () {
      this.$router.push({ path: '/home/usercenter' })
    },
    userLoginOut () {
      sessionStorage.setItem('userMsg', {})
      sessionStorage.setItem('isLogin', '1')
      this.isLogin = '1'
      this.$router.push({ path: '/home/indexpage' })
    },
    getSysTime () {
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.day = date.getDate()
    },
    goTo (i) {
      if (i === 1) {
        this.$router.push({ path: '/home/indexpage' })
      } else if (i === 2) {
        let isLog = sessionStorage.getItem('isLogin')
        if (isLog === '1') {
          alert('您还未登录，请登录')
          this.$router.push({ path: '/home/login' })
        } else {
          this.$router.push({ path: '/home/freepublish' })
        }
      } else if (i === 3) {
      } else {
        this.$router.push({ path: '/home/help' })
      }
    },
    registered () {
      this.$router.push({ path: '/home/registered' })
    },
    login () {
      this.$router.push({ path: '/home/login' })
    },
    help () {
      this.$router.push({ path: '/home/help' })
    }
  },
  beforeUpdate () {
    this.isLogin = (sessionStorage.getItem('isLogin'))
  },
  mounted () {
    this.getSysTime()
  }

}
</script>
<style scoped lang="less">
.search_css {
  height: 2em;
  line-height: 2em;
  background-color: transparent;
}
.indexCSS {
  list-style-type: none;
  height: 3em;
  line-height: 3em;
  background-color: #42b712;
  color: white;
  max-width: 100%;
  font-size: 1.2em;
}
.title_content {
  height: 2.5em;
  line-height: 2.5em;
  background: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#ffffff),
    to(rgba(234, 233, 233, 1))
  );
}
.title_content_date {
  float: left;
  margin-left: 1em;
}
.title_content_date_fr {
  float: right;
  margin-right: 1em;
  .tel {
    font-weight: 700;
  }
  .login {
    margin-left: 2em;
  }
}
.col-sm:hover {
  color: blue;
  background-color: yellow;
  cursor: pointer;
}
.footer {
  float: left;
  display: inherit;
  width: 100%;
  margin-top: 2em;
}
</style>
