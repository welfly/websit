<template>
  <div>
    <div>
      <el-row class="tac">
        <el-col :span="12">
          <h5 style="padding: 1em; color: black;">用户中心</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户首页</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
                <el-menu-item index="1-4">选项4</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <el-menu-item
              index="1"
              @click="menuCli(1)">
              <i class="el-icon-location"/>
              <span slot="title">用户首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"/>
                <span>账号管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="2-1"
                  @click="menuCli(21)">修改我的资料</el-menu-item>
                <el-menu-item
                  index="2-2"
                  @click="menuCli(22)">修改密码</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"/>
                <span>管理我的信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="3-1"
                  @click="menuCli(31)">发布信息</el-menu-item>
                <el-menu-item
                  index="3-2"
                  @click="menuCli(321)">管理我的信息</el-menu-item>
                  <!-- <el-submenu index="3-2">
                  <template slot="title">
                    <span>管理我的信息</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      index="3-2-1"
                      @click="menuCli(321)">已发布</el-menu-item>
                    <el-menu-item
                      index="3-2-2"
                      @click="menuCli(322)">待审核</el-menu-item>
                  </el-menu-item-group>
                </el-submenu> -->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"/>
                <span>客户服务</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="4-1"
                  @click="menuCli(41)">联系客服</el-menu-item>
                <el-menu-item
                  index="4-2"
                  @click="menuCli(42)">使用帮助</el-menu-item>
                <el-menu-item
                  index="4-3"
                  @click="menuCli(43)">免责声明</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <div class="pane_r">
          <div v-if="show === 1">
            <div>
              您当前是<span class="odUser">普通用户</span>：您每天可以发布 1 条信息，今日已发布<span class="odU"> {{ odU }} </span>条，还可以发布<span class="odU"> {{ 1-odU }} </span>条
            </div>
            <div>
              您当前是<span class="odUser">VIP会员</span>：您每天可以发布 100 条信息，今日已发布<span class="odU"> {{ odU }} </span>条，还可以发布<span class="odU"> {{ 100-odU }} </span>条
            </div>
          </div>

          <div v-else-if="show === 22">
            <tr class="td">
              <td>原密码：</td>
              <td>
                <el-input
                  v-model="oldPwd"
                  placeholder="请输入原密码"
                  type="password"
                  clearable/>
              </td>
            </tr>
            <tr class="td">
              <td>新密码：</td>
              <td>
                <el-input
                  v-model="newPWD"
                  type="password"
                  placeholder="请输入新密码"
                  clearable/>
              </td>
            </tr>
            <tr class="td">
              <td>确认新密码：</td>
              <td>
                <el-input
                  v-model="newPWDcfm"
                  placeholder="请确认新密码"
                  type="password"
                  clearable/>
              </td>
            </tr>
            <tr style=" width: 13em; line-height: 3.3em; text-align: center;">
              <td colspan="2">
                <el-button
                  type="success"
                  @click="changePWD">修改密码</el-button>
              </td>
            </tr>
          </div>

          <div v-else-if="show === 21">
            <table style=" margin-left: -7em;">
              <tr>
                <td class="td">所在城市：</td>
                <td>
                  <el-select
                    v-model="optionValue"
                    filterable
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>
                </td>
              </tr>
              <tr class="td">
                <td>用户名：</td>
                <td>
                  <el-input
                    v-model="loginVal"
                    disabled
                    clearable/>
                </td>
              </tr>
              <tr class="td">
                <td>手机号：</td>
                <td>
                  <el-input
                    v-model="phoneVal"
                    placeholder="请输入手机号"
                    clearable/>
                </td>
              </tr>
              <tr class="td">
                <td>电子邮箱：</td>
                <td>
                  <el-input
                    v-model="emailVal"
                    disabled
                    clearable/>
                </td>
              </tr>
              <tr class="td">
                <td>联系人姓名：</td>
                <td>
                  <el-input
                    v-model="connectName"
                    placeholder="请输入联系人姓名"
                    clearable/>
                </td>
              </tr>
              <tr class="td">
                <td>联系人电话：</td>
                <td>
                  <el-input
                    v-model="connectPhnoe"
                    placeholder="请输入联系人电话"
                    clearable/>
                </td>
              </tr>
              <tr class="td">
                <td>联系人地址：</td>
                <td>
                  <el-input
                    v-model="connectAddr"
                    placeholder="请输入联系人地址"
                    clearable/>
                </td>
              </tr>
              <tr class="td">
                <td colspan="2">
                  <el-button type="success">修改</el-button>
                </td>
              </tr>
            </table>
          </div>

          <div v-else-if="show === 31"/>

          <div v-else-if="show === 321">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick">
              <el-tab-pane
                label="信息列表"
                name="first">
                <el-table
                  :data="norTableData"
                  :row-class-name="tableRowClassName"
                  border
                  style="width: 100%">
                  <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="100"/>
                  <el-table-column
                    prop="bt"
                    label="标题"/>
                  <el-table-column
                    prop="shbz"
                    label="审核状态"
                    width="80"/>
                  <el-table-column
                    prop="fbsj"
                    label="更新时间"
                    width="100"/>

                  <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="watchClick(scope.row.id)">查看</el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="changeClick(scope.row)">修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <!-- <el-tab-pane
                label="置顶信息"
                name="second">
                <el-table
                  :data="TopTableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="100"/>
                  <el-table-column
                    prop="title"
                    label="标题"/>
                  <el-table-column
                    prop="state"
                    label="审核状态"
                    width="80"/>
                  <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    width="100"/>

                  <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="pubHandleClick(scope.row)">查看</el-button>
                      <el-button
                        type="text"
                        size="small">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane> -->
              <!-- <el-tab-pane
                label="特急信息"
                name="third">

                <el-table
                  :data="fastTableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="100"/>
                  <el-table-column
                    prop="title"
                    label="标题"/>
                  <el-table-column
                    prop="state"
                    label="审核状态"
                    width="80"/>
                  <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    width="100"/>

                  <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="pubHandleClick(scope.row)">查看</el-button>
                      <el-button
                        type="text"
                        size="small">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane> -->
              <div style="text-align: center; margin-top: 1em;">
                <el-pagination
                  :current-page="currentPage"
                  :page-sizes="pageEve"
                  :page-size="evePageCount"
                  :total="news_content_count"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="sizeChange"
                  @current-change="currentPageChange"
              /></div>

            </el-tabs>
          </div>
          <div v-else-if="show === 322">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick">
              <el-tab-pane
                label="正常信息"
                name="first">正常信息</el-tab-pane>
              <el-tab-pane
                label="置顶信息"
                name="second">置顶信息</el-tab-pane>
              <el-tab-pane
                label="特急信息"
                name="third">特急信息</el-tab-pane>
            </el-tabs>
          </div>
          <div v-else-if="show === 41"/>
          <div v-else-if="show === 42"/>
          <div v-else-if="show === 43"/>
        </div>
      </el-row>
    </div>

    <div style="float: clear;"/>
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
  name: 'UserCenter',
  data () {
    return {
      odU: 1,
      oldPwd: '',
      newPWD: '',
      newPWDcfm: '',
      options: [{ value: '安顺', label: '安顺' },
        { value: '阿克苏', label: '阿克苏' },
        { value: '阿勒泰', label: '阿勒泰' },
        { value: '安康', label: '安康' },
        { value: '阿里', label: '阿里' },
        { value: '阿拉善', label: '阿拉善' },
        { value: '澳门', label: '澳门' },
        { value: '安阳', label: '安阳' },
        { value: '鞍山', label: '鞍山' },
        { value: '阿坝', label: '阿坝' },
        { value: '安庆', label: '安庆' },
        { value: '北海', label: '北海' },
        { value: '百色', label: '百色' },
        { value: '白银', label: '白银' },
        { value: '北京', label: '北京' },
        { value: '毕节', label: '毕节' },
        { value: '巴音郭楞蒙古', label: '巴音郭楞蒙古' },
        { value: '博尔塔拉蒙古', label: '博尔塔拉蒙古' },
        { value: '宝鸡', label: '宝鸡' },
        { value: '滨州', label: '滨州' },
        { value: '包头', label: '包头' },
        { value: '巴彦淖尔', label: '巴彦淖尔' },
        { value: '白山', label: '白山' },
        { value: '白城', label: '白城' },
        { value: '本溪', label: '本溪' },
        { value: '巴中', label: '巴中' },
        { value: '保山', label: '保山' },
        { value: '保定', label: '保定' },
        { value: '亳州', label: '亳州' },
        { value: '蚌埠', label: '蚌埠' },
        { value: '池州', label: '池州' },
        { value: '崇左', label: '崇左' },
        { value: '重庆', label: '重庆' },
        { value: '潮州', label: '潮州' },
        { value: '昌吉', label: '昌吉' },
        { value: '昌都', label: '昌都' },
        { value: '赤峰', label: '赤峰' },
        { value: '长沙', label: '长沙' },
        { value: '常德', label: '常德' },
        { value: '郴州', label: '郴州' },
        { value: '长春', label: '长春' },
        { value: '朝阳', label: '朝阳' },
        { value: '成都', label: '成都' },
        { value: '楚雄', label: '楚雄' },
        { value: '承德', label: '承德' },
        { value: '沧州', label: '沧州' },
        { value: '长治', label: '长治' },
        { value: '常州', label: '常州' },
        { value: '滁州', label: '滁州' },
        { value: '巢湖', label: '巢湖' },
        { value: '池州', label: '池州' },
        { value: '定西', label: '定西' },
        { value: '东莞', label: '东莞' },
        { value: '德州', label: '德州' },
        { value: '东营', label: '东营' },
        { value: '大庆', label: '大庆' },
        { value: '大兴安岭', label: '大兴安岭' },
        { value: '大连', label: '大连' },
        { value: '丹东', label: '丹东' },
        { value: '德阳', label: '德阳' },
        { value: '达州', label: '达州' },
        { value: '大理', label: '大理' },
        { value: '德宏', label: '德宏' },
        { value: '迪庆', label: '迪庆' },
        { value: '大同', label: '大同' },
        { value: '鄂州', label: '鄂州' },
        { value: '恩施', label: '恩施' },
        { value: '鄂尔多斯', label: '鄂尔多斯' },
        { value: '防城港', label: '防城港' },
        { value: '佛山', label: '佛山' },
        { value: '福州', label: '福州' },
        { value: '抚州', label: '抚州' },
        { value: '抚顺', label: '抚顺' },
        { value: '阜新', label: '阜新' },
        { value: '阜阳', label: '阜阳' },
        { value: '贵港', label: '贵港' },
        { value: '桂林', label: '桂林' },
        { value: '甘南', label: '甘南' },
        { value: '贵阳', label: '贵阳' },
        { value: '广州', label: '广州' },
        { value: '果洛', label: '果洛' },
        { value: '固原', label: '固原' },
        { value: '赣州', label: '赣州' },
        { value: '广元', label: '广元' },
        { value: '广安', label: '广安' },
        { value: '甘孜', label: '甘孜' },
        { value: '淮北', label: '淮北' },
        { value: '贺州', label: '贺州' },
        { value: '海口', label: '海口' },
        { value: '惠州', label: '惠州' },
        { value: '河源', label: '河源' },
        { value: '哈密', label: '哈密' },
        { value: '和田', label: '和田' },
        { value: '杭州', label: '杭州' },
        { value: '海东', label: '海东' },
        { value: '湖州', label: '湖州' },
        { value: '海北', label: '海北' },
        { value: '黄南', label: '黄南' },
        { value: '海南', label: '海南' },
        { value: '海西', label: '海西' },
        { value: '潍坊', label: '潍坊' },
        { value: '汉中', label: '汉中' },
        { value: '菏泽', label: '菏泽' },
        { value: '哈尔滨', label: '哈尔滨' },
        { value: '鹤岗', label: '鹤岗' },
        { value: '黑河', label: '黑河' },
        { value: '黄冈', label: '黄冈' },
        { value: '呼和浩特', label: '呼和浩特' },
        { value: '黄石', label: '黄石' },
        { value: '呼伦贝尔', label: '呼伦贝尔' },
        { value: '怀化', label: '怀化' },
        { value: '衡阳', label: '衡阳' },
        { value: '鹤壁', label: '鹤壁' },
        { value: '葫芦岛', label: '葫芦岛' },
        { value: '红河', label: '红河' },
        { value: '邯郸', label: '邯郸' },
        { value: '衡水', label: '衡水' },
        { value: '淮安', label: '淮安' },
        { value: '黄山', label: '黄山' },
        { value: '合肥', label: '合肥' },
        { value: '淮南', label: '淮南' },
        { value: '嘉峪关', label: '嘉峪关' },
        { value: '金昌', label: '金昌' },
        { value: '酒泉', label: '酒泉' },
        { value: '江门', label: '江门' },
        { value: '揭阳', label: '揭阳' },
        { value: '金华', label: '金华' },
        { value: '嘉兴', label: '嘉兴' },
        { value: '济宁', label: '济宁' },
        { value: '济南', label: '济南' },
        { value: '鸡西', label: '鸡西' },
        { value: '佳木斯', label: '佳木斯' },
        { value: '荆门', label: '荆门' },
        { value: '荆州', label: '荆州' },
        { value: '景德镇', label: '景德镇' },
        { value: '九江', label: '九江' },
        { value: '吉安', label: '吉安' },
        { value: '焦作', label: '焦作' },
        { value: '吉林', label: '吉林' },
        { value: '锦州', label: '锦州' },
        { value: '晋城', label: '晋城' },
        { value: '晋中', label: '晋中' },
        { value: '克拉玛依', label: '克拉玛依' },
        { value: '喀什', label: '喀什' },
        { value: '开封', label: '开封' },
        { value: '昆明', label: '昆明' },
        { value: '来宾', label: '来宾' },
        { value: '柳州', label: '柳州' },
        { value: '兰州', label: '兰州' },
        { value: '陇南', label: '陇南' },
        { value: '临夏', label: '临夏' },
        { value: '六盘水', label: '六盘水' },
        { value: '丽水', label: '丽水' },
        { value: '莱芜', label: '莱芜' },
        { value: '临沂', label: '临沂' },
        { value: '聊城', label: '聊城' },
        { value: '拉萨', label: '拉萨' },
        { value: '林芝', label: '林芝' },
        { value: '龙岩', label: '龙岩' },
        { value: '娄底', label: '娄底' },
        { value: '洛阳', label: '洛阳' },
        { value: '漯河', label: '漯河' },
        { value: '辽源', label: '辽源' },
        { value: '辽阳', label: '辽阳' },
        { value: '泸州', label: '泸州' },
        { value: '乐山', label: '乐山' },
        { value: '凉山', label: '凉山' },
        { value: '丽江', label: '丽江' },
        { value: '临沧', label: '临沧' },
        { value: '廊坊', label: '廊坊' },
        { value: '临汾', label: '临汾' },
        { value: '吕梁', label: '吕梁' },
        { value: '连云港', label: '连云港' },
        { value: '六安', label: '六安' },
        { value: '马鞍山', label: '马鞍山' },
        { value: '茂名', label: '茂名' },
        { value: '梅州', label: '梅州' },
        { value: '牡丹江', label: '牡丹江' },
        { value: '绵阳', label: '绵阳' },
        { value: '眉山', label: '眉山' },
        { value: '南宁', label: '南宁' },
        { value: '宁波', label: '宁波' },
        { value: '那曲', label: '那曲' },
        { value: '宁德', label: '宁德' },
        { value: '南平', label: '南平' },
        { value: '南昌', label: '南昌' },
        { value: '南阳', label: '南阳' },
        { value: '内江', label: '内江' },
        { value: '南充', label: '南充' },
        { value: '怒江', label: '怒江' },
        { value: '南京', label: '南京' },
        { value: '南通', label: '南通' },
        { value: '平凉', label: '平凉' },
        { value: '莆田', label: '莆田' },
        { value: '萍乡', label: '萍乡' },
        { value: '平顶山', label: '平顶山' },
        { value: '濮阳', label: '濮阳' },
        { value: '盘锦', label: '盘锦' },
        { value: '攀枝花', label: '攀枝花' },
        { value: '普洱', label: '普洱' },
        { value: '钦州', label: '钦州' },
        { value: '庆阳', label: '庆阳' },
        { value: '黔西南', label: '黔西南' },
        { value: '黔东南', label: '黔东南' },
        { value: '黔南', label: '黔南' },
        { value: '清远', label: '清远' },
        { value: '衢州', label: '衢州' },
        { value: '青岛', label: '青岛' },
        { value: '齐齐哈尔', label: '齐齐哈尔' },
        { value: '泉州', label: '泉州' },
        { value: '七台河', label: '七台河' },
        { value: '曲靖', label: '曲靖' },
        { value: '秦皇岛', label: '秦皇岛' },
        { value: '日照', label: '日照' },
        { value: '日喀则', label: '日喀则' },
        { value: '上海', label: '上海' },
        { value: '三亚', label: '三亚' },
        { value: '深圳', label: '深圳' },
        { value: '汕尾', label: '汕尾' },
        { value: '汕头', label: '汕头' },
        { value: '韶关', label: '韶关' },
        { value: '绍兴', label: '绍兴' },
        { value: '石嘴山', label: '石嘴山' },
        { value: '商洛', label: '商洛' },
        { value: '山南', label: '山南' },
        { value: '三明', label: '三明' },
        { value: '双鸭山', label: '双鸭山' },
        { value: '绥化', label: '绥化' },
        { value: '随州', label: '随州' },
        { value: '十堰', label: '十堰' },
        { value: '邵阳', label: '邵阳' },
        { value: '上饶', label: '上饶' },
        { value: '三门峡', label: '三门峡' },
        { value: '商丘', label: '商丘' },
        { value: '四平', label: '四平' },
        { value: '松原', label: '松原' },
        { value: '沈阳', label: '沈阳' },
        { value: '遂宁', label: '遂宁' },
        { value: '邵通', label: '邵通' },
        { value: '石家庄', label: '石家庄' },
        { value: '朔州', label: '朔州' },
        { value: '宿迁', label: '宿迁' },
        { value: '苏州', label: '苏州' },
        { value: '宿州', label: '宿州' },
        { value: '铜陵', label: '铜陵' },
        { value: '天水', label: '天水' },
        { value: '天津', label: '天津' },
        { value: '铜仁', label: '铜仁' },
        { value: '吐鲁番', label: '吐鲁番' },
        { value: '塔城', label: '塔城' },
        { value: '台州', label: '台州' },
        { value: '泰安', label: '泰安' },
        { value: '铜川', label: '铜川' },
        { value: '通辽', label: '通辽' },
        { value: '台湾', label: '台湾' },
        { value: '通化', label: '通化' },
        { value: '铁岭', label: '铁岭' },
        { value: '唐山', label: '唐山' },
        { value: '太原', label: '太原' },
        { value: '泰州', label: '泰州' },
        { value: '梧州', label: '梧州' },
        { value: '武威', label: '武威' },
        { value: '乌鲁木齐', label: '乌鲁木齐' },
        { value: '温州', label: '温州' },
        { value: '吴忠', label: '吴忠' },
        { value: '威海', label: '威海' },
        { value: '渭南', label: '渭南' },
        { value: '武汉', label: '武汉' },
        { value: '乌海', label: '乌海' },
        { value: '乌兰察布', label: '乌兰察布' },
        { value: '文山', label: '文山' },
        { value: '无锡', label: '无锡' },
        { value: '芜湖', label: '芜湖' },
        { value: '西宁', label: '西宁' },
        { value: '西安', label: '西安' },
        { value: '咸阳', label: '咸阳' },
        { value: '厦门', label: '厦门' },
        { value: '孝感', label: '孝感' },
        { value: '咸宁', label: '咸宁' },
        { value: '襄樊', label: '襄樊' },
        { value: '兴安', label: '兴安' },
        { value: '锡林郭勒', label: '锡林郭勒' },
        { value: '香港', label: '香港' },
        { value: '湘西', label: '湘西' },
        { value: '湘潭', label: '湘潭' },
        { value: '新余', label: '新余' },
        { value: '新乡', label: '新乡' },
        { value: '许昌', label: '许昌' },
        { value: '信阳', label: '信阳' },
        { value: '西双版纳', label: '西双版纳' },
        { value: '邢台', label: '邢台' },
        { value: '徐州', label: '徐州' },
        { value: '宣城', label: '宣城' },
        { value: '玉林', label: '玉林' },
        { value: '阳江', label: '阳江' },
        { value: '云浮', label: '云浮' },
        { value: '伊犁哈萨克', label: '伊犁哈萨克' },
        { value: '玉树', label: '玉树' },
        { value: '银川', label: '银川' },
        { value: '烟台', label: '烟台' },
        { value: '延安', label: '延安' },
        { value: '榆林', label: '榆林' },
        { value: '伊春', label: '伊春' },
        { value: '宜昌', label: '宜昌' },
        { value: '岳阳', label: '岳阳' },
        { value: '益阳', label: '益阳' },
        { value: '永州', label: '永州' },
        { value: '鹰潭', label: '鹰潭' },
        { value: '宜春', label: '宜春' },
        { value: '延边', label: '延边' },
        { value: '营口', label: '营口' },
        { value: '宜宾', label: '宜宾' },
        { value: '雅安', label: '雅安' },
        { value: '玉溪', label: '玉溪' },
        { value: '阳泉', label: '阳泉' },
        { value: '运城', label: '运城' },
        { value: '沂州', label: '沂州' },
        { value: '扬州', label: '扬州' },
        { value: '盐城', label: '盐城' },
        { value: '张掖', label: '张掖' },
        { value: '遵义', label: '遵义' },
        { value: '湛江', label: '湛江' },
        { value: '肇庆', label: '肇庆' },
        { value: '中山', label: '中山' },
        { value: '珠海', label: '珠海' },
        { value: '舟山', label: '舟山' },
        { value: '中卫', label: '中卫' },
        { value: '淄博', label: '淄博' },
        { value: '枣庄', label: '枣庄' },
        { value: '漳州', label: '漳州' },
        { value: '张家界', label: '张家界' },
        { value: '株洲', label: '株洲' },
        { value: '郑州', label: '郑州' },
        { value: '周口', label: '周口' },
        { value: '驻马店', label: '驻马店' },
        { value: '自贡', label: '自贡' },
        { value: '资阳', label: '资阳' },
        { value: '张家口', label: '张家口' },
        { value: '镇江', label: '镇江' }],
      optionValue: '',
      show: 1,
      activeName: 'first',
      norTableData: [],
      // 分页
      currentPage: 1,
      pageEve: [6, 10, 30],
      evePageCount: 6,
      news_content_count: 0,
      pageNum: 1,
      limit: 6
    }
  },
  methods: {
    sizeChange (v) {
      // console.log(v)
      this.limit = v
      this.getNewsByUser(this.pageNum, this.limit)
    },
    currentPageChange (v) {
      // console.info(v)
      this.pageNum = v
      this.getNewsByUser(this.pageNum, this.limit)
    },
    watchClick (id) {
      window.open('http://lingduizhipin.com/wz/' + id + '.html')
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    getNewsByUser (pageNum, limit) {
      this.$api.post('http://lingduizhipin.com/admin/wz/getWzPageByUser', { pageNum, limit }, res => {
        this.norTableData = res.data.data
        this.news_content_count = res.data.count
      })
    },
    menuCli (i) {
      if (i === 21) {
        this.show = i
      } else if (i === 22) {
        this.show = i
      } else if (i === 31) {
        this.show = i
        sessionStorage.setItem('isChangeData', '0')
        this.$router.push({ path: '/home/freepublish' })
      } else if (i === 321) {
        this.show = i
        // const shbz = '已发布'
        this.getNewsByUser(this.pageNum, this.limit)
      } else if (i === 322) {
        this.show = i
        const shbz = '审核中'
        const pageNum = 1
        const limit = 1000
        this.$api.post('http://lingduizhipin.com/admin/wz/getWzPageByUser', { shbz, pageNum, limit }, res => {
          // console.info(res)
        })
      } else if (i === 41) {
        this.show = i
      } else if (i === 42) {
        this.show = i
      } else if (i === 43) {
        this.show = i
      } else {
        this.show = 1
      }
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    changePWD () {
      if (this.newPWD !== this.newPWDcfm) {
        alert('两次输入的密码不一致')
        return
      }
      // const oldPwd = this.oldPwd
      const pwsword = this.newPWD
      const id = sessionStorage.getItem('id')
      this.$api.post('http://lingduizhipin.com/admin/user/updatePsw',
        {
          id, pwsword
        }, res => {
          // console.info(res)
          if ((res.data).indexOf('-1') === 0) {
            sessionStorage.setItem('isLogin', '1')
            alert('服务器开小差了@_@!')
          } else {
            alert('密码修改成功！')
          }
        })
    },
    changeClick (row) {
      sessionStorage.setItem('changeData', JSON.stringify(row))
      if (row.shbz === '已发布') {
        alert('“已发布”的内容不能再修改！')
        return
      }
      sessionStorage.setItem('isChangeData', '1') // 1 表示在用户中心修改
      this.$router.push({ path: '/home/freepublish' })
    },
    tableRowClassName ({ row, rowIndex }) {
      // console.info(row.shbz)
      if (row.state === '审核中') {
        // console.info(rowIndex)
        return 'warning-row'
      } else {
        return 'success-row'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-col-12 {
  width: 25%;
  text-align: left;
}
.odUser {
  color: blue;
}
.odU {
  color: blue;
  padding-bottom: 1px;
  border-bottom: 1px solid blue;
}
.pane_r {
  margin-top: 4em;
  text-align: left;
  margin-left: 22em;
  margin-right: 1em;
}
.td {
  width: 13em;
  text-align: right;
  margin-right: 2em;
  line-height: 3.3em;
}
.el-table .warning-row {
  background: red;
}

.el-table .success-row {
  background: blue;
}
</style>
