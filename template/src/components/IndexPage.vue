<template>
  <div class="hotcityContent">
    <div class="hotCity">热门城市</div>
    <div class="gap_line"></div>
    <div style="float: left; width: 85%;">
      <ul class="citysCss">
        <li class="cityCss"
            v-for="hotCity of hotCitys"
            :key="hotCity">{{hotCity}}</li>
      </ul>
    </div>
    <div>
      <div class="ad1"></div>
      <div class="ad1"></div>
      <div class="ad1"></div>
      <div class="ad1"></div>
    </div>
    <div class="ad_main">
      <div class="ad_left"
           v-show="ad_left">
        <span @click="cls_left(1)">关闭</span>
      </div>
      <div class="main_content">
        <span class="pub_content">最新发布</span>
        <ul style="margin-top: 3em;">
          <li class="pub_news"
              @click="goTODetail(i)"
              v-for="(news, i) of crtpageContent"
              :key="i">
            <a href="#"><span>{{news.newsTitle}}</span><span class="pub_date">{{news.date}}</span></a>
          </li>
        </ul>
        <div class="block">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="pageEve"
                         :page-size="evePageCount"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="news_content.length">
          </el-pagination>
        </div>
      </div>
      <div class="ad_right"
           v-show="ad_right">
        <span @click="cls_left(2)">关闭</span>
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
      ad_left: true,
      ad_right: true,
      news_content: [],
      currentPage: 1,
      crtpageContent: [],
      pageEve: [20, 40],
      evePageCount: 10

    }
  },
  methods: {
    goTODetail (i) {
      console.info(i)
      window.open('../../static/stachtml/temple.html')
    },
    handleSizeChange (val) {
      this.evePageCount = val
      this.crtpageContent = []
      for (let i = (this.currentPage - 1) * this.evePageCount; i < this.evePageCount * this.currentPage; i++) {
        if (this.news_content[i]) {
          this.crtpageContent.push(this.news_content[i])
        }
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.crtpageContent = []
      for (let i = (this.currentPage - 1) * this.evePageCount; i < this.evePageCount * this.currentPage; i++) {
        if (this.news_content[i]) {
          this.crtpageContent.push(this.news_content[i])
        }
      }
    },
    getNews () {
      this.$api.get('./static/json/mostNews.json', {}, res => {
        if (res.data.status === 200) {
          this.news_content = res.data.news
          this.handleSizeChange(10)
          this.handleCurrentChange(1)
          if (res.data.news.length > 1000) {
            this.pageEve.push(100)
          }
        }
      })
    },
    getCitys () {
      this.$api.get('./static/json/citys.json', {
        '参数名': '参数值'
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          //   console.log(response.data) // 请求成功，response为成功信息参数
          this.provinces = response.data.provinces
          for (let i = 0; i < response.data.provinces.length; i++) {
            for (let j = 0; j < response.data.provinces[i].cities.length; j++) {
              if (response.data.provinces[i].cities[j].level === '1' || response.data.provinces[i].cities[j].level === '2') {
                this.hotCitys.push(response.data.provinces[i].cities[j].name)
              }
            }
          }
          this.hotCitys.push('其它地区')
          //   console.info(this.provinces)
          //   console.info(this.hotCitys)
        } else {
          console.log(response.message) // 请求失败，response为失败信息
        }
      })
    },
    cls_left (i) {
      if (i === 1) {
        this.ad_left = !this.ad_left
      } else {
        this.ad_right = !this.ad_right
      }
    }
  },
  mounted () {
    this.getCitys()
    this.getNews()
  }
}
</script>
<style lang="less" scoped>
.hotcityContent {
  height: 8em;
  line-height: 8em;
  margin: 3px 0;
  .hotCity {
    margin: 0 auto;
    width: 1.1em;
    line-height: 1.5em;
    float: left;
    margin-left: 4%;
    margin-top: 0.5em;
    font-size: 1.2em;
  }
  .block {
    margin-top: 2em;
  }
  .gap_line {
    height: 8em;
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
    // background-color: aqua;
    height: 8em;
    float: left;
    border: 1px solid black;
  }
  .ad_main {
    // height: 40em;
    // background-color: green;
    float: left;
    .ad_left {
      width: 13em;
      height: 25em;
      background-color: red;
      float: left;
      position: fixed;
      bottom: 0px;
    }
    .main_content {
      background-color: yellow;
      width: 55em;
      float: left;
      margin-left: 27.5%;
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
      margin-top: -2.5em;
      color: red;
      height: 1em;
    }
    .pub_news {
      height: 1.8em;
      line-height: 1.8em;
      text-align: left;
      margin-left: 2em;
    }
    .pub_date {
      float: right;
      margin-right: 2em;
    }
  }
}
</style>
