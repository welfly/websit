<template>
  <div class="hello">
    <table style=" margin-left: 5em;">
      <tr>
        <td class="td">发布省份：</td>
        <td style="    text-align: left;">
          <el-select
            v-model="fpsf"
            filterable
            size="medium"
            placeholder="请选择发布省份"
            @change="getCt(fpsf)"
            @blur="cls"
            @click="getCitys">
            <el-option
              v-for="item in provinces"
              :key="item.code"
              :label="item.name"
              :value="item.name"/>
          </el-select>
        </td>
      </tr>
      <tr>
        <td class="td">发布城市：</td>
        <td style="    text-align: left;">
          <el-select
            v-model="fpcs"
            filterable
            placeholder="--请选择--">
            <el-option
              v-for="item in cts"
              :key="item.code"
              :label="item.name"
              :value="item.name"/>
          </el-select>
        </td>
      </tr>
      <tr>
        <td class="td">信息类型：</td>
        <td style="    text-align: left;">
          <el-select
            v-model="xxlx"
            filterable
            placeholder="--请选择--">
            <el-option
              v-for="item in xxlxs"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </td>
      </tr>
      <tr class="td">
        <td>标题：</td>
        <td >
          <el-input
            v-model="bt"
            placeholder="请输入标题"
            clearable/>
        </td>
      </tr>
      <tr class="td">
        <td>标签：</td>
        <td>
          <el-input
            v-model="bq"
            placeholder="请输入标签"
            clearable/>
        </td>
      </tr>
      <tr class="td">
        <td>内容：</td>
        <td style="width: 50em">
          <EditorBox ele-id="EditorBox" content="nr" @editorContent="getContent"/>
        </td>
      </tr>
      <tr class="td">
        <td>企业名称：</td>
        <td>
          <el-input
            v-model="qymc"
            placeholder="请输入企业名称"
            clearable/>
        </td>
      </tr>

      <tr class="td">
        <td>联系人：</td>
        <td>
          <el-input
            v-model="lxr"
            placeholder="请输入招聘联系人"
            clearable/>
        </td>
      </tr>
      <tr class="td">
        <td>联系人电话：</td>
        <td>
          <el-input
            v-model="lxdh"
            placeholder="请输入招聘联系人电话"
            clearable/>
        </td>
      </tr>
      <tr class="td">
        <td>审核标志：</td>
        <td>
          <el-input
            v-model="shbz"
            disabled/>
        </td>
      </tr>
      <tr class="td">
        <td>发布区县：</td>
        <td>
          <el-input
            v-model="fbqx"
            placeholder="请输入招聘区县"
            clearable/>
        </td>
      </tr>
      <tr class="td">
        <td>发布地址：</td>
        <td>
          <el-input
            v-model="weixin"
            placeholder="请输入招聘人微信"
            clearable/>
        </td>
      </tr>
      <tr style=" width: 13em;  line-height: 3.3em;">
        <td colspan="2">
          <el-button
            type="success"
            @click="subData()">发布信息</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import EditorBox from './Editor'
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?38a5b50cc0cc263cbb7a0b1de76cf498'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
export default {
  name: 'FreePublish',
  components: {
    EditorBox
  },
  data () {
    return {
      uploadImgForm: {
        file: {},
        name: ''
      },
      provinces: [],
      fpsf: '',
      fpcs: '',
      cts: [],
      xxlxs: ['酒吧招聘', '夜店招聘', 'KTV招聘', '夜总会招聘', '夜场招聘'],
      xxlx: '',
      bt: '',
      bq: '',
      nr: '',
      tp: '',
      qymc: '',
      lxr: '',
      lxdh: '',
      shbz: '',
      fbqx: '',
      fpdz: '',
      weixin: '',
      changeData: {}
    }
  },
  mounted () {
    this.getCitys()
    this.changeData = JSON.parse(sessionStorage.getItem('changeData'))
    const isChangeData = sessionStorage.getItem('isChangeData')
    if (isChangeData === '1' && this.changeData && this.changeData !== null) {
      this.bt = this.changeData.bt
      this.nr = this.changeData.nr
      this.fpsf = this.changeData.fpsf
      this.fpcs = this.changeData.fpcs
      this.xxlx = this.changeData.xxlx
      this.bq = this.changeData.bq
      this.qymc = this.changeData.qymc
      this.lxr = this.changeData.lxr
      this.lxdh = this.changeData.lxdh
      this.shbz = this.changeData.shbz
      this.fbqx = this.changeData.fbqx
      this.fpdz = this.changeData.fpdz
      this.weixin = this.changeData.weixin
    }
  },
  methods: {

    getContent (data) {
      this.nr = data
    },
    cls () {
      this.fpcs = ''
    },
    getCitys () {
      this.$api.get('./static/json/citys.json', {}, response => {
        if (response.status >= 200 && response.status < 300) {
          this.provinces = response.data.provinces
        } else {
          console.log(response.message) // 请求失败，response为失败信息
        }
      })
    },
    getCt (proc) {
      this.$api.get('./static/json/citys.json', {}, res => {
        if (res.status >= 200) {
          for (let i = 0; i < res.data.provinces.length; i++) {
            if (res.data.provinces[i].name === proc) {
              this.cts = res.data.provinces[i].cities
            }
          }
        }
      })
    },
    subData () {
    // admin/wz/saveWz
      const fpsf = this.fpsf
      if (fpsf === '') {
        alert('未选择发布省份！！')
        return
      }
      const fpcs = this.fpcs
      if (fpcs === '') {
        alert('未选择发布城市！！')
        return
      }
      const xxlx = this.xxlx
      if (xxlx === '') {
        alert('未选择信息类型！！')
        return
      }
      const bt = this.bt
      if (bt === '') {
        alert('未填写标题！！')
        return
      }
      const bq = this.bq
      if (bt === '') {
        alert('未填写标签！！')
        return
      }
      const nr = this.nr
      const tp = this.tp

      const qymc = this.qymc
      if (qymc === '') {
        alert('未填写企业名称！！')
        return
      }
      const lxr = this.lxr
      if (lxr === '') {
        alert('未填写联系人！！')
        return
      }
      const lxdh = this.lxdh
      if (lxdh === '') {
        alert('未填写联系电话！！')
        return
      }
      // const shbz = this.shbz
      const fbqx = this.fbqx
      if (fbqx === '') {
        alert('未填写发布区县！！')
        return
      }
      const weixin = this.weixin
      if (weixin === '') {
        alert('未填写发布人微信！！')
        return
      }
      if (nr === '') {
        alert('未填写任何发布内容！！')
        return
      }
      const yxbz = '1'
      this.$api.post('http://lingduizhipin.com/admin/wz/saveWz',
        {
          fpsf, fpcs, xxlx, bt, bq, nr, tp, qymc, lxr, lxdh, fbqx, yxbz, weixin
        }, res => {
          if (res.status === 200) {
            alert(res.data.data)
          } else {
            alert('服务器开小差了@_@!')
          }
        })
    },
    upTP (res) {
      this.tp = res.data.src
    }
  }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.td {
  width: 13em;
  text-align: right;
  margin-right: 2em;
  line-height: 3.3em;
}
.load-dragger {
  width: 220px;
  //   height: 160px;
  margin-top: 1em;
}
</style>
