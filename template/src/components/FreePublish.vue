<template>
  <div class="hello">
    <table style=" margin-left: 5em;">
      <tr>
        <td class="td">发布省份：</td>
        <td>
          <el-select v-model="fpsf"
                     filterable
                     size='medium'
                     @change="getCt(fpsf)"
                     @blur="cls"
                     placeholder="请选择发布省份">
            <el-option v-for="item in provinces"
                       :key="item.code"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td class="td">发布城市：</td>
        <td>
          <el-select v-model="fpcs"
                     filterable
                     placeholder="--请选择--">
            <el-option v-for="item in cts"
                       :key="item.code"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td class="td">信息类型：</td>
        <td>
          <el-select v-model="xxlx"
                     filterable
                     placeholder="--请选择--">
            <el-option v-for="item in xxlxs"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr class="td">
        <td>标题：</td>
        <td>
          <el-input placeholder="请输入标题"
                    v-model="bt"
                    clearable>
          </el-input>
        </td>
      </tr>
      <tr class="td">
        <td>标签：</td>
        <td>
          <el-input placeholder="请输入标签"
                    v-model="bq"
                    clearable>
          </el-input>
        </td>
      </tr>
      <tr class="td">
        <td>内容：</td>
        <td>
          <el-input type="textarea"
                    placeholder="请输入招聘内容"
                    v-model="nr"
                    clearable>
          </el-input>
        </td>
      </tr>
      <tr class="td">
        <td>图片：</td>
        <td>
          <el-upload class="upload-demo load-dragger"
                     drag
                     action="http://localhost/cyx/tp/upload"
                     :on-success="upTP">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip"
                 slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </td>
      </tr>
      <tr class="td">
        <td>企业名称：</td>
        <td>
          <el-input placeholder="请输入企业名称"
                    v-model="qymc"
                    clearable>
          </el-input>
        </td>
      </tr>

      <tr class="td">
        <td>联系人：</td>
        <td>
          <el-input placeholder="请输入招聘联系人"
                    v-model="lxr"
                    clearable>
          </el-input>
        </td>
      </tr>
      <tr class="td">
        <td>联系人电话：</td>
        <td>
          <el-input placeholder="请输入招聘联系人电话"
                    v-model="lxdh"
                    clearable>
          </el-input>
        </td>
      </tr>
      <tr class="td">
        <td>审核标志：</td>
        <td>
          <el-input v-model="shbz"
                    disabled>
          </el-input>
        </td>
      </tr>
      <tr class="td">
        <td>发布区县：</td>
        <td>
          <el-input placeholder="请输入招聘区县"
                    v-model="fbqx"
                    clearable>
          </el-input>
        </td>
      </tr>
      <tr class="td">
        <td>发布地址：</td>
        <td>
          <el-input placeholder="请输入招聘地址"
                    v-model="fpdz"
                    clearable>
          </el-input>
        </td>
      </tr>
      <tr style=" width: 13em;  line-height: 3.3em;">
        <td colspan="2">
          <el-button @click="subData()"
                     type="success">发布信息</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FreePublish',
  data () {
    return {
      provinces: [],
      fpsf: '',
      fpcs: '',
      cts: [],
      xxlxs: ['KTV', '夜场', '酒吧'],
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
      fpdz: ''
    }
  },
  methods: {
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
      let fpsf = this.fpsf
      let fpcs = this.fpcs
      let xxlx = this.xxlx
      let bt = this.bt
      let bq = this.bq
      let nr = this.nr
      let tp = this.tp
      let qymc = this.qymc
      let lxr = this.lxr
      let lxdh = this.lxdh
      let shbz = this.shbz
      let fbqx = this.fbqx
      let fpdz = this.fpdz
      this.$api.post('http://localhost/cyx/wz/saveWz',
        {
          fpsf, fpcs, xxlx, bt, bq, nr, tp, qymc, lxr, lxdh, shbz, fbqx, fpdz
        }, res => {
          if (res.status === 200) {
            alert(res.data)
          } else {
            alert('服务器开小差了@_@!')
          }
        })
    },
    upTP (res) {
      this.tp = res.data.src
    }
  },
  mounted () {
    this.getCitys()
  }
}
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
