<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="mq"></div>
        <div class="aboutsp">
          <div class="col1">
            <div class="anav">
              <ul>
                <li @click="goToHelp(1)"><a href="#">联系客服</a></li>
                <li @click="goToHelp(2)"><a href="#">使用帮助</a></li>
                <li @click="goToHelp(3)"><a href="#">免责声明</a></li>
              </ul>
            </div>
          </div>
          <div v-if="showID == 1"></div>
          <div v-else-if="showID == 2"></div>
          <div v-else-if="showID == 3">
            <div class="col2">
              <div class="subheader">
                <h1>发布技巧</h1>
              </div>
              <div class="con">
                <span style="font-size:18px;color:#337FE5;"><strong>问题解答</strong></span><br>
                <span style="font-size:18px;color:#009900;"><strong>如何显示在百度首页？</strong></span><br>
                <span style="font-size:18px;color:#009900;"><strong>请保持文章的独一无二性，可以修改一部分内容，也可以全部是自己的手写原创，因为当有人搜索相关信息时，独一无二或原创的信息就会被搜索引擎排在首位。</strong></span>
                <p>
                  <span style="color:#009900;font-family:monospace;font-size:18px;">
                    <strong>领队在线网-领队招聘网（www.lingdui.com）是中国领队求职招聘第一网站，涵盖KTV招聘、酒吧招聘、夜总会招聘、夜店招聘、酒店招聘等各方面。自成立以来，我们一直致力于做好全国领队人才招聘的向导，并且就不断为实现这个目标而努力。</strong>
                  </span>
                  <span style="font-size:18px;color:#009900;"><strong></strong></span>
                </p>
                <p>
                  <span style="color:#009900;font-family:monospace;font-size:18px;"><strong><br>
                    </strong></span>
                </p>
                <p>
                  <br>
                </p>
                <div style="text-align:center;">
                  <span style="color:#E53333;font-size:32px;"><strong>《领队在线网守法发布规则》</strong></span>
                </div>
                <b>&nbsp;</b><br>
                <br>
                <div style="color:#009900;font-family:monospace;font-size:18px;font-weight:bold;text-align:center;">
                  <strong><span style="color:#000000;">所有含有以下禁止性物品或内容的信息一经查出，将被立即删除</span></strong>
                </div>
                <div style="color:#009900;font-family:monospace;font-size:18px;font-weight:bold;text-align:center;">
                  <strong><span style="color:#000000;">如果您屡次恶意发布违禁内容，我们将限制您继续发布，并保留进一步行动的权利</span></strong>
                </div>
                <br>
                <div style="color:#009900;font-family:monospace;font-size:18px;font-weight:bold;text-align:center;">
                  <strong><span style="color:#337FE5;">若您的信息被<span style="color:#E53333;">拒绝审核</span>或<span style="color:#E53333;">删除</span>，肯定是因为违反了如下规则，敬请认真阅读！</span></strong>
                </div>
                <div style="text-align:center;">
                </div>
                <b>
                  <div style="text-align:center;">
                    <b><span style="color:#337FE5;"><span style="font-size:18px;">领队在线网为</span><span style="color:#E53333;font-size:18px;">网警备案单位</span><span style="font-size:18px;">，我们将</span><span style="color:#E53333;font-size:18px;">严格执行网警要求</span><span style="font-size:18px;">的去运营网站！</span></span></b>
                  </div>
                </b><b>
                  <div style="text-align:center;">
                    <b><span style="color:#337FE5;"><span style="font-size:18px;">也希望您的谅解与配合！</span><span style="color:#E53333;font-size:18px;">守法发布</span><span style="font-size:18px;">，信息方能终身长存！</span></span></b>
                  </div>
                </b>
                <div style="text-align:center;">
                  <br>
                </div>
                <b><span style="color:#E53333;">一．总则</span></b><br>
                <b>所有的发布内容不得包含下述的任一信息：</b><br>
                <b>1.煽动分裂国家、破坏祖国统一的；</b><br>
                <b>2.煽动颠覆政府或社会主义制度的；</b><br>
                <b>3.煽动民族仇恨、民族歧视，破坏民族团结的；</b><br>
                <b>4.煽动抵抗或违反中华人民共和国宪法、法律或行政法规执行的；</b><br>
                <b>5.制造谎言或歪曲事实、散布谣言、破坏社会秩序的；</b><br>
                <b>6.宣扬封建迷信、传播有性挑逗性质的材料、赌博、暴力或凶杀的；</b><br>
                <b>7.宣扬恐怖主义或唆使他人犯罪；公开侮辱他人或歪曲事实诽谤他人的；</b><br>
                <b>8.损害国家机关声誉的；</b><br>
                <b>9.其它违反中华人民共和国宪法、法律和行政法规的内容。</b><br>
                <br>
                <b><span style="color:#E53333;"><b><span style="color:#E53333;">二</span></b>．色情低俗类</span></b><br>
                <b>1.禁止发布色情陪聊、招嫖服务、寻找一夜情、性伴侣、成人网站论坛等内容；</b><br>
                <b>2.禁止发布或者传播存储含有色情淫秽内容的音像制品及视频获取方式等内容；</b><br>
                <b>3.禁止发布带有性暗示、性挑逗、性过程、性方式等内容；</b><br>
                <b>4.禁止发布禁止发布带有侵犯个人隐私性质的走光、偷拍、漏点等内容；</b><br>
                <b>5.禁止发布描述或展示全身或者隐私部位未着衣物，仅用肢体掩盖隐私部位的内容；</b><br>
                <b>6.禁止发布或者传播含有可致使他人暂时失去反抗能力、意识模糊的口服或外用的催情类商品的交易信息；</b><br>
                <b>7.禁止发布含有或传播换妻、性虐待等有害信息内容；</b><br>
                <b>8.禁止发布涉及推介淫秽色情网站和网上低俗信息的链接、图片、文字等内容；</b><br>
                <b>9.禁止发布提供色情产品或服务的信息内容，包括全套特殊按摩一条龙服务、小姐服务、百度网盘种子出售、外围模特等涉黄服务内容或图片；</b><br>
                <b>10.禁止图片中出现真人、充气娃娃、成人用品仿真器具，露点（男性上半身除外）和严重性爱姿势等内容；</b><br>
                <br>
                <b><span style="color:#E53333;">三<b><span style="color:#E53333;">．</span></b>KTV员工招聘发布规则（违反以下任意1条将会被拒绝审核或删除，请务必仔细阅读）</span></b><br>
                <b>① 仅允许在<span style="color:#EE33EE;">招聘</span>的<span style="color:#EE33EE;">KTV</span>栏目发布，禁止在除此之外的任何一个栏目发布，否则拒绝审核</b><br>
                <b>② 若跨城市发布：标题中<span style="color:#EE33EE;">不允许有其他城市名，并且一定要有该城市名称</span>，否则拒绝审核</b><br>
                <b>③ 标题及内容中：禁止发布公关<b>,</b>佳丽,美女,学生,妹妹.小姐姐,小仙女等 <span style="color:#EE33EE;">疑似有偿陪侍的词汇</span></b><br>
                <b>④ 标题及内容中：禁止发布喝酒、陪酒、玩塞子、陪聊、陪唱陪玩等<span style="color:#EE33EE;">涉嫌有偿陪侍的词汇</span></b><br>
                <b>⑤ 标题及内容中：<span style="color:#EE33EE;">禁止发布钱数金额</span>，包括用K代表千，用W代表万，或用简繁体汉字代替</b><br>
                <b>⑥ 标题及内容中：<span style="color:#EE33EE;">禁止发布夸大性话语</span>，如保证赚钱，一夜暴富、一年可买房等同义词汇</b><br>
                <b>⑦ 标题及内容中：禁止发布最大、最好、最豪华、首选等等等<span style="color:#EE33EE;">违反广告法</span>的夸大同义词汇</b><br>
                <b>⑧ 标题及内容中：禁止上传任何女性、人民币或其他图片，<span style="color:#EE33EE;">只能上传KTV营业场所的图片</span></b><br>
                <b>⑨ 上传的图片中：禁止印有以上及《领队在线网守法发布规则》中不允许的<span style="color:#EE33EE;">违规违法信息内容</span></b><br>
                <b>⑩ 逃避风控检查：若您发布违规或违法关键词，本站将自动拦截，<span style="color:#EE33EE;">请您立即修改后再发布</span></b><br>
                <br>
                <div style="text-align:center;">
                  <span style="font-size:24px;color:#337FE5;"><strong>若您发现有用户违反</strong><span style="color:#E53333;"><strong>《领队在线网守法发布规则》</strong></span><strong>请及时举报！我们将会立即删除！</strong></span>
                </div>
                <div style="text-align:center;">
                  <span style="font-size:24px;color:#337FE5;"><strong>举报请您加微信号&nbsp; </strong><span style="color:#E53333;"><strong>ZTS5888</strong></span><strong>（请注明“</strong><span style="color:#000000;"><strong>违法信息举报</strong></span><strong>”）谢谢您的支持！</strong></span>
                </div>
              </div>
            </div>
          </div>
          <div v-else></div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showID: 3
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goToHelp (i) {
      if (i === 1) {
        this.showID = i
      } else if (i === 2) {
        this.showID = i
      } else if (i === 3) {
        this.showID = i
      } else if (i === 4) {
        this.showID = i
      } else {
        this.showID = 5
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  width: 1100px;
  min-height: 600px;
  margin: 0px auto;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  .content {
    width: 1096px;
    margin: 0 auto;
  }
  .mq {
    height: 10px;
    line-height: 8px;
    font-size: 8px;
  }
  .aboutsp {
    width: 1080px;
    margin: 0px auto;
    .col1 {
      width: 120px;
      float: left;
    }
    .anav {
      border-right: 1px solid #e8e6e6;
      padding-top: 5px;
      & ul {
        margin: 0px;
        padding: 0px;
        list-style-type: none;
        & li {
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          padding-left: 15px;
        }
      }
    }
    .col2 {
      width: 960px;
      float: right;
      .subheader {
        padding: 10px;
        h1 {
          font-family: Arial, 微软雅黑, 黑体;
          font-size: 20px;
          font-weight: normal;
        }
      }
    }
    .con {
      font-size: 14px;
      line-height: 28px;
      padding-left: 10px;
      padding-bottom: 20px;
      text-align: left;
    }
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
    margin-right: 1em;
  }
}
.clear {
  clear: both;
}
</style>
