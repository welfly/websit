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
        <img style="margin-bottom: .5em;" src="../../static/img/1.jpg" >
      </a>
      <a href="#">
        <img style="margin-bottom: .5em;" src="../../static/img/2.jpg" >
      </a>
      <a href="#">
        <img style="margin-bottom: .5em;" src="../../static/img/3.jpg" >
      </a>
      <a href="#">
        <img style="margin-bottom: .5em;" src="../../static/img/4.jpg" >
      </a>
    </div>

    <div class="ad_main">
      <!-- <div class="ad_left"
           v-show="ad_left">
        <span @click="cls_left(1)">关闭</span>
      </div>-->
      <div class="main_content">
        <span class="pub_content">最新发布</span>
        <ul style="margin-top: 3em;">
          <li
            v-for="(news, i) of news_content"
            :key="i"
            class="pub_news"
            @click="goTODetail(news.id)"
          >
            <a href="#">
              <span>{{ news.bt }}</span>
              <span class="pub_date">{{ news.fpsf }}省 {{ news.fpcs }} {{ news.fbqx }}</span>
            </a>
          </li>
        </ul>
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
      <div
        style="height: 26em;
            width: 12.8em;
            float: left;
            margin-left: 1em;"
      >
        <a href="#">
          <img style="width: 12.8em;" src="../../static/img/5.jpg" >
        </a>
        <a href="#">
          <img style="width: 12.8em; margin-top: 7px;" src="../../static/img/6.jpg" >
        </a>
        <a href="#">
          <img style="width: 12.8em; margin-top: 7px;" src="../../static/img/6.jpg" >
        </a>
        <a
          href="javascript:window.scrollTo(0,0)"
          style="position: fixed; bottom: 2em; background-color: wheat; width: 5em; height: 5em; line-height: 5em; margin-left: 2em;"
          title="回到顶端"
        >回到顶端</a>
      </div>
    </div>
  </div>
</template>
<script>
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
      pageEve: [30, 70],
      evePageCount: 30,
      drawer: false,
      secOptions: [],
      selValue: '',
      news_content_count: 0 // 总消息数

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
      window.open('http://118.25.137.189/wz/' + i + '.html')
    },
    handleSizeChange (val) { // 改变每页的数量
      console.info(val)
      this.getNews(1, val, this.fBCity)
      this.evePageCount = val
      this.crtpageContent = []
    },
    handleCurrentChange (val) { //  切换页数
      console.info(val, 22)
      this.currentPage = val
      this.crtpageContent = []
      this.getNews(val, this.evePageCount, this.fBCity)
    },
    getNews (pNum, lmt, fbCity) {
      console.log(fbCity)
      const pageNum = pNum
      const limit = lmt
      const fpcs = fbCity
      let para = { pageNum, limit }
      if (fpcs !== '') {
        para = { pageNum, limit, fpcs }
        this.fBCity = fbCity
      }
      this.$api.post(
        'http://localhost/cyx/wz/getWzPage', para
        ,
        res => {
          if (res.status === 200) {
            this.news_content = res.data.data
            this.news_content_count = res.data.count
            if (res.data.count > 1000) {
              this.pageEve.push(100)
            }
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
      width: 55em;
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
    .pub_news {
      height: 1.8em;
      line-height: 1.8em;
      text-align: left;
      margin-left: 2em;
      & a{
            color: black;
      }
    }
    .pub_date {
      float: right;
      margin-right: 2em;
    }
  }
}
</style>
