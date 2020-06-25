<template>
  <div class="hotcityContent">
    <div>
      <div class="hotCity">热门城市</div>
      <div class="gap_line" />
      <div style="float: left; width: 85%; margin-left: 2em;">
        <ul class="citysCss">
          <li
            v-for="hotCity of hotCitys"
            :key="hotCity"
            class="cityCss"
            @click="getNews(1, 30, hotCity)"
          >{{ hotCity }}</li>
          <li class="cityCss hotCityOthcss" @click="getOthers">其它地区</li>
        </ul>
      </div>
      <el-drawer :visible.sync="drawer" :with-header="false">
        <span>
          <div>请选择区域</div>
          <div>
            <el-select v-model="selValue" filterable placeholder="请选择 / 搜索区域" @change="getSec()">
              <el-option-group
                v-for="secOption in secOptions"
                :key="secOption.code"
                :label="secOption.name"
              >
                <el-option
                  v-for="item in secOption.cities"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-option-group>
            </el-select>
          </div>
        </span>
      </el-drawer>
    </div>
    <div>
      <a href="#">
        <img style="margin-bottom: .5em; width: 1100px;" src="../../static/img/1.jpg" >
      </a>
      <a href="#">
        <img style="margin-bottom: .5em; width: 1100px;" src="../../static/img/2.jpg" >
      </a>
      <a href="#">
        <img style="margin-bottom: .5em; width: 1100px;" src="../../static/img/3.jpg" >
      </a>
      <!-- <a href="#">
        <img style="margin-bottom: .5em;" src="../../static/img/4.jpg" >
      </a> -->
    </div>

    <div class="ad_main">
      <!-- <div class="ad_left"
           v-show="ad_left">
        <span @click="cls_left(1)">关闭</span>
      </div>-->
      <div class="main_content">
        <div
          style="text-align: left;
            background-color: #eaf6fb;
            width: 300px;
            color: #0b0505;
            padding-left: 1em;">您当前位置：{{ localtion }}</div>
        <span v-if="news_content.length !== 0">
          <span class="pub_content">最新发布</span>
          <ul style="margin-top: 3em; overflow: hidden;">
            <li
              v-for="(news, i) of news_content"
              :key="i"
              :title="news.bt +' —— '+ news.lxr"
              class="pub_news"
              @click="goTODetail(news.id)"
            >
              <span
                style="overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      display: inline-block;
                      width: 360px;">
                <span v-if="news.zhiding === '1'" style="background-color: red;color: white; padding: 2px;">{{ news.tglw }}</span>
                {{ news.bt }}</span>
              <span class="pub_date">{{ news.lxr }} <span style="color: #db5252;">{{ news.fbsj }}</span></span>
            </li>
            <li v-if="news_content_count % 2 !== 0" class="pub_news"/>
          <!-- <li class="pub_news" title="阿道夫噶山东分公司的风格撒旦法森岛帆高a">阿道夫噶山东分公司的风格撒旦法森岛帆高a</li>
          <li class="pub_news">森岛帆高是地方森岛帆高森岛帆高森岛帆高森岛帆高撒旦法告诉对方是个撒旦法公司的风格</li>
          <li class="pub_news">十多个森岛帆高森岛帆高森岛帆高撒旦法森岛帆高森岛帆高森岛帆高森岛帆高撒旦法公司的风格森岛帆高森岛帆高</li>
          <li class="pub_news">d</li> -->
          </ul>
        </span>
        <div
          v-else
          style="  margin: 3em; font-size: 2em;"><span style="color: red;">{{ localtion }}</span> 暂未发布招聘信息</div>
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="pageEve"
            :page-size="evePageCount"
            :total="news_content_count"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <!-- <div class="ad_right"
           v-show="ad_right">
        <span @click="cls_left(2)">关闭</span>
      </div>-->
      <div class="bttop" >
        <!-- <a href="#">
          <img style="width: 12.8em;" src="../../static/img/5.jpg" >
        </a>
        <a href="#">
          <img style="width: 12.8em; margin-top: 7px;" src="../../static/img/6.jpg" >
        </a>
        <a href="#">
          <img style="width: 12.8em; margin-top: 7px;" src="../../static/img/6.jpg" >
        </a> -->
        <a
          href="javascript:window.scrollTo(0,0)"
          style="position: fixed;
                bottom: 2em;
                background-color: #e5e5e5;
                width: 5em;
                height: 5em;
                line-height: 5em;
                margin-left: 2em;
                border-radius: 5em;"
          title="回到顶端"
        >回到顶端</a>
      </div>
    </div>
  </div>
</template>
<script>
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?38a5b50cc0cc263cbb7a0b1de76cf498'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
export default {
  name: 'IndexPage',
  data () {
    return {
      provinces: [],
      citys: [],
      hotCitys: [],
      fBCity: '', // 发布城市
      ad_left: true,
      ad_right: true,
      news_content: [], // 消息内容
      currentPage: 1,
      crtpageContent: [],
      pageEve: [50, 100, 200, 500],
      evePageCount: 30,
      drawer: false,
      secOptions: [],
      selValue: '',
      news_content_count: 0, // 总消息数
      isClk: false,
      clkID: 0,
      localtion: '全国'
    }
  },
  mounted () {
    this.getCitys()
    this.getNews(1, 30, this.fBCity) // 默认第一页，每页30条
  },
  methods: {
    getSec () {
      // console.info()
      this.fBCity = this.selValue
      this.getNews(1, 30, this.fBCity)
    },
    getOthers () {
      this.drawer = !this.drawer
    },
    goTODetail (i) {
      this.isClk = true
      this.clkID = i
      window.open('wz/' + i + '.html')
    },
    handleSizeChange (val) { // 改变每页的数量
      this.getNews(1, val, this.fBCity)
      this.evePageCount = val
      this.crtpageContent = []
    },
    handleCurrentChange (val) { //  切换页数
      this.currentPage = val
      this.crtpageContent = []
      this.getNews(val, this.evePageCount, this.fBCity)
    },
    getNews (pNum, lmt, fbCity) {
      // console.log(fbCity)
      this.localtion = fbCity || '全国'
      const pageNum = pNum
      const limit = lmt
      const fpcs = fbCity
      let para = { pageNum, limit }
      if (fpcs !== '') {
        para = { pageNum, limit, fpcs }
        this.fBCity = fbCity
      }
      this.$api.post(
        'admin/wz/getWzPage', para
        ,
        res => {
          if (res.status === 200) {
            this.news_content = res.data.data
            this.news_content_count = res.data.count
          }
        }
      )
    },
    getCitys () {
      this.$api.get(
        './static/json/citys.json',
        {
          参数名: '参数值'
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            //   console.log(response.data) // 请求成功，response为成功信息参数
            this.provinces = response.data.provinces
            for (let i = 0; i < response.data.provinces.length; i++) {
              if (response.data.provinces[i].level === '1') {
                this.secOptions.push(response.data.provinces[i])
              }
              for (
                let j = 0;
                j < response.data.provinces[i].cities.length;
                j++
              ) {
                if (
                  response.data.provinces[i].cities[j].level === '1' ||
                  response.data.provinces[i].cities[j].level === '2'
                ) {
                  this.hotCitys.push(response.data.provinces[i].cities[j].name)
                }
              }
            }
            //   console.info(this.provinces)
            //   console.info(this.hotCitys)
          } else {
            console.log(response.message) // 请求失败，response为失败信息
          }
        }
      )
    },
    cls_left (i) {
      if (i === 1) {
        this.ad_left = !this.ad_left
      } else {
        this.ad_right = !this.ad_right
      }
    }
  }
}
</script>
<style lang="less" scoped>
.hotcityContent {
  .hotCityOthcss {
    background-color: brown;
    color: white;
    &:hover {
      color: black;
    }
  }
  height: 1em;
  line-height: 2em;
  margin: 3px 0;
  .hotCity {
    margin: 0 auto;
    width: 1.1em;
    line-height: 1.5em;
    float: left;
    margin-left: 6%;
    margin-top: 1.5em;
    font-size: 1.2em;
  }
  .block {
    margin-top: 2em;
  }
  .gap_line {
    height: 10em;
    border-right-style: dashed;
    width: 2px;
    background-color: black;
    margin-left: 3em;
    float: left;
  }
  .citysCss {
    list-style: none;
    list-style-type: none;
    float: left;
    width: 100%;
    .cityCss {
      float: left;
      width: 8em;
      height: 2em;
      line-height: 2em;
      &:hover {
        background-color: beige;
        cursor: pointer;
      }
    }
  }
  .el-pagination {
    height: 3em;
  }
  .ad1 {
    width: 50%;
    height: 8em;
    float: left;
    border: 1px solid black;
  }
  .ad_main {
    // height: 40em;
    // background-color: green;
    // float: left;
    .ad_left {
      width: 13em;
      height: 25em;
      background-color: red;
      float: left;
      position: fixed;
      bottom: 0px;
    }
    .main_content {
      background-color: #fcfcfc;
      width: 91.7%;
      float: left;
      margin-left: 4.15%;
    }
    .ad_right {
      width: 13em;
      height: 25em;
      background-color: blue;
      margin-right: 0px;
      float: right;
      position: fixed;
      bottom: 0px;
      right: 0px;
    }
    .pub_content {
      float: left;
      margin-left: 2em;
      //   margin-top: -2.5em;
      color: red;
      height: 1em;
    }
    .pub_news_clk{
      color: rgb(231, 110, 110);
    }
    .pub_news {
      height: 1.8em;
      line-height: 1.8em;
      text-align: left;
      width: 520px;
      margin-left: 3px;
      display: inline-block;
      border-bottom: 1px solid lightgrey;
      cursor: pointer;
    margin: 5px 15px;
      &:hover{
        background-color: rgb(229, 229, 229);
        color: rgb(40, 141, 251);
      }
    }
    .pub_date {
      float: right;
    }
  }
  .bttop{
      height: 26em;
      width: 12.8em;
      margin-left: 1em;
      a{
        box-shadow: 7px 6px 8px #88884F;
        &:hover{
          text-decoration:none;
        }
      }
  }
}
</style>
