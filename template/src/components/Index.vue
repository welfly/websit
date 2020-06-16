<template>
  <div class>
    <div class="title_content">
      <div class="title_content_date">
        免费发布领队信息网, 今天是{{ year }}年{{ month }}月{{ day }}日</div>
      <div class="title_content_date_fr">
        <span class="tel">Tel: 17816036909
        </span>
        <span v-if="show2Dcode">
          <img
            style="margin-bottom: 3px; cursor: pointer; position: absolute;
            z-index: 100;
            right: 80px;
            top: 40px;
            width: 126px;
            box-shadow: 0 0 6px rgba(20,22,30,.5);"
            src="../../static/img/2Dcode.png" >
        </span>
        <a href="tencent://message/?uin=793811595&Site=http://vps.shuidazhe.com&Menu=yes">
          <img style="margin-bottom: 3px; cursor: pointer;" src="../../static/img/qq_btn.gif" >
        </a>
        <img style="margin-bottom: 3px; cursor: pointer;" src="../../static/img/weixin.png" @mouseenter="show2code" @mouseleave="hide2Dcode" >
        <span v-if=" isLogin === '1' || isLogin === null " class="login">
          <a href="#" @click="registered()">注册</a> |
          <a href="#" @click="login()">登录</a>
        </span>
        <span v-else class="login">
          <a href="#">{{ userName }}</a> |
          <a href="#" @click="userCenter()">用户中心</a> |
          <a href="#" @click="userLoginOut()">退出</a>
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
        <div class="col-sm" @click="goTo(1)">
          <a>首页</a>
        </div>
        <div class="col-sm" @click="goTo(2)">
          <a>免费发布</a>
        </div>
        <!-- <div class="col-sm" @click="goTo(3)">
          <a>夜场直招</a>
        </div> -->
        <div class="col-sm" @click="goTo(4)">
          <a>使用帮助</a>
        </div>
      </div>
    </div>
    <div
      style="width: 1200px;
    margin-left: auto;
    margin-right: auto;">
      <router-view/>
    </div>
    <div class="footer">
      <div style="border: 1px dashed; margin: 0 .5em;"/>
      <div style="margin: 2em;">
        <a>关于我们</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a>联系我们</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a>免责声明</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="#" @click="help">使用帮助</a>
      </div>
      <div style="margin-bottom: 2em;">&copy;2020-{{ year }} 领队直聘 版权所有</div>
    </div>
  </div>
</template>
<script>
// import $ from 'jquery'
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?38a5b50cc0cc263cbb7a0b1de76cf498'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
export default {
  name: 'Index',
  data () {
    return {
      year: '',
      show2Dcode: false,
      month: '',
      day: '',
      isLogin: '1',
      userName: sessionStorage.getItem('userMsg')
        ? sessionStorage.getItem('userMsg')
        : 'null'
    }
  },
  beforeUpdate () {
    this.isLogin = sessionStorage.getItem('isLogin')
    this.userName = sessionStorage.getItem('userMsg')
  },
  mounted () {
    this.getSysTime()
  },
  methods: {
    show2code () {
      this.show2Dcode = true
    },
    hide2Dcode () {
      this.show2Dcode = false
    },
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
      const date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.day = date.getDate()
    },
    goTo (i) {
      if (i === 1) {
        this.$router.push({ path: '/home/indexpage' })
      } else if (i === 2) {
        const isLog = sessionStorage.getItem('isLogin')
        sessionStorage.setItem('isChangeData', '0')
        if (isLog === '1') {
          alert('您还未登录，请登录')
          this.$router.push({ path: '/home/login' })
        } else {
          this.$router.push({ path: '/home/freepublish' })
        }
      } else if (i === 3) {
        console.info(9)
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
