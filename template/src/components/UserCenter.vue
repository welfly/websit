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
                <el-submenu index="3-2">
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
                </el-submenu>
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
                label="正常信息"
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
              </el-tab-pane>
              <el-tab-pane
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
              </el-tab-pane>
              <el-tab-pane
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
              </el-tab-pane>
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
export default {
  name: 'UserCenter',
  data () {
    return {
      odU: 1,
      oldPwd: '',
      newPWD: '',
      newPWDcfm: '',
      options: [
        { value: '292', label: 'A安顺' },
        { value: '303', label: 'A阿克苏' },
        { value: '310', label: 'A阿勒泰' },
        { value: '332', label: 'A安康' },
        { value: '339', label: 'A阿里' },
        { value: '365', label: 'A阿拉善' },
        { value: '366', label: 'A澳门' },
        { value: '137', label: 'A安阳' },
        { value: '157', label: 'A鞍山' },
        { value: '188', label: 'A阿坝' },
        { value: '242', label: 'A安庆' },
        { value: '260', label: 'B北海' },
        { value: '265', label: 'B百色' },
        { value: '276', label: 'B白银' },
        { value: '30', label: 'B北京' },
        { value: '294', label: 'B毕节' },
        { value: '305', label: 'B巴音郭楞蒙古' },
        { value: '307', label: 'B博尔塔拉蒙古' },
        { value: '326', label: 'B宝鸡' },
        { value: '77', label: 'B滨州' },
        { value: '355', label: 'B包头' },
        { value: '361', label: 'B巴彦淖尔' },
        { value: '152', label: 'B白山' },
        { value: '154', label: 'B白城' },
        { value: '159', label: 'B本溪' },
        { value: '186', label: 'B巴中' },
        { value: '194', label: 'B保山' },
        { value: '217', label: 'B保定' },
        { value: '249', label: 'B亳州' },
        { value: '254', label: 'B蚌埠' },
        { value: '267', label: 'C池州' },
        { value: '269', label: 'C崇左' },
        { value: '33', label: 'C重庆' },
        { value: '36', label: 'C潮州' },
        { value: '306', label: 'C昌吉' },
        { value: '335', label: 'C昌都' },
        { value: '357', label: 'C赤峰' },
        { value: '105', label: 'C长沙' },
        { value: '107', label: 'C常德' },
        { value: '110', label: 'C郴州' },
        { value: '147', label: 'C长春' },
        { value: '167', label: 'C朝阳' },
        { value: '170', label: 'C成都' },
        { value: '202', label: 'C楚雄' },
        { value: '210', label: 'C承德' },
        { value: '214', label: 'C沧州' },
        { value: '221', label: 'C长治' },
        { value: '238', label: 'C常州' },
        { value: '244', label: 'C滁州' },
        { value: '247', label: 'C巢湖' },
        { value: '250', label: 'C池州' },
        { value: '283', label: 'D定西' },
        { value: '48', label: 'D东莞' },
        { value: '75', label: 'D德州' },
        { value: '81', label: 'D东营' },
        { value: '346', label: 'D大庆' },
        { value: '353', label: 'D大兴安岭' },
        { value: '156', label: 'D大连' },
        { value: '160', label: 'D丹东' },
        { value: '174', label: 'D德阳' },
        { value: '183', label: 'D达州' },
        { value: '203', label: 'D大理' },
        { value: '204', label: 'D德宏' },
        { value: '206', label: 'D迪庆' },
        { value: '219', label: 'D大同' },
        { value: '94', label: 'E鄂州' },
        { value: '99', label: 'E恩施' },
        { value: '359', label: 'E鄂尔多斯' },
        { value: '261', label: 'F防城港' },
        { value: '37', label: 'F佛山' },
        { value: '83', label: 'F福州' },
        { value: '128', label: 'F抚州' },
        { value: '158', label: 'F抚顺' },
        { value: '163', label: 'F阜新' },
        { value: '245', label: 'F阜阳' },
        { value: '263', label: 'G贵港' },
        { value: '271', label: 'G桂林' },
        { value: '286', label: 'G甘南' },
        { value: '289', label: 'G贵阳' },
        { value: '34', label: 'G广州' },
        { value: '316', label: 'G果洛' },
        { value: '322', label: 'G固原' },
        { value: '125', label: 'G赣州' },
        { value: '176', label: 'G广元' },
        { value: '182', label: 'G广安' },
        { value: '189', label: 'G甘孜' },
        { value: '257', label: 'H淮北' },
        { value: '266', label: 'H贺州' },
        { value: '287', label: 'H海口' },
        { value: '42', label: 'H惠州' },
        { value: '45', label: 'H河源' },
        { value: '301', label: 'H哈密' },
        { value: '302', label: 'H和田' },
        { value: '55', label: 'H杭州' },
        { value: '312', label: 'H海东' },
        { value: '57', label: 'H湖州' },
        { value: '313', label: 'H海北' },
        { value: '314', label: 'H黄南' },
        { value: '315', label: 'H海南' },
        { value: '318', label: 'H海西' },
        { value: '71', label: 'H潍坊' },
        { value: '330', label: 'H汉中' },
        { value: '78', label: 'H菏泽' },
        { value: '341', label: 'H哈尔滨' },
        { value: '344', label: 'H鹤岗' },
        { value: '351', label: 'H黑河' },
        { value: '96', label: 'H黄冈' },
        { value: '354', label: 'H呼和浩特' },
        { value: '100', label: 'H黄石' },
        { value: '360', label: 'H呼伦贝尔' },
        { value: '112', label: 'H怀化' },
        { value: '117', label: 'H衡阳' },
        { value: '135', label: 'H鹤壁' },
        { value: '168', label: 'H葫芦岛' },
        { value: '200', label: 'H红河' },
        { value: '211', label: 'H邯郸' },
        { value: '216', label: 'H衡水' },
        { value: '235', label: 'H淮安' },
        { value: '243', label: 'H黄山' },
        { value: '252', label: 'H合肥' },
        { value: '255', label: 'H淮南' },
        { value: '274', label: 'J嘉峪关' },
        { value: '275', label: 'J金昌' },
        { value: '281', label: 'J酒泉' },
        { value: '38', label: 'J江门' },
        { value: '50', label: 'J揭阳' },
        { value: '59', label: 'J金华' },
        { value: '65', label: 'J嘉兴' },
        { value: '70', label: 'J济宁' },
        { value: '82', label: 'J济南' },
        { value: '343', label: 'J鸡西' },
        { value: '348', label: 'J佳木斯' },
        { value: '93', label: 'J荆门' },
        { value: '103', label: 'J荆州' },
        { value: '120', label: 'J景德镇' },
        { value: '122', label: 'J九江' },
        { value: '126', label: 'J吉安' },
        { value: '134', label: 'J焦作' },
        { value: '148', label: 'J吉林' },
        { value: '161', label: 'J锦州' },
        { value: '222', label: 'J晋城' },
        { value: '224', label: 'J晋中' },
        { value: '299', label: 'K克拉玛依' },
        { value: '304', label: 'K喀什' },
        { value: '131', label: 'K开封' },
        { value: '191', label: 'K昆明' },
        { value: '268', label: 'L来宾' },
        { value: '270', label: 'L柳州' },
        { value: '273', label: 'L兰州' },
        { value: '284', label: 'L陇南' },
        { value: '285', label: 'L临夏' },
        { value: '290', label: 'L六盘水' },
        { value: '63', label: 'L丽水' },
        { value: '73', label: 'L莱芜' },
        { value: '74', label: 'L临沂' },
        { value: '76', label: 'L聊城' },
        { value: '334', label: 'L拉萨' },
        { value: '340', label: 'L林芝' },
        { value: '91', label: 'L龙岩' },
        { value: '113', label: 'L娄底' },
        { value: '132', label: 'L洛阳' },
        { value: '140', label: 'L漯河' },
        { value: '150', label: 'L辽源' },
        { value: '164', label: 'L辽阳' },
        { value: '173', label: 'L泸州' },
        { value: '179', label: 'L乐山' },
        { value: '190', label: 'L凉山' },
        { value: '196', label: 'L丽江' },
        { value: '198', label: 'L临沧' },
        { value: '215', label: 'L廊坊' },
        { value: '227', label: 'L临汾' },
        { value: '228', label: 'L吕梁' },
        { value: '230', label: 'L连云港' },
        { value: '248', label: 'L六安' },
        { value: '256', label: 'M马鞍山' },
        { value: '40', label: 'M茂名' },
        { value: '43', label: 'M梅州' },
        { value: '350', label: 'M牡丹江' },
        { value: '175', label: 'M绵阳' },
        { value: '184', label: 'M眉山' },
        { value: '259', label: 'N南宁' },
        { value: '56', label: 'N宁波' },
        { value: '338', label: 'N那曲' },
        { value: '85', label: 'N宁德' },
        { value: '90', label: 'N南平' },
        { value: '119', label: 'N南昌' },
        { value: '142', label: 'N南阳' },
        { value: '178', label: 'N内江' },
        { value: '180', label: 'N南充' },
        { value: '205', label: 'N怒江' },
        { value: '229', label: 'N南京' },
        { value: '240', label: 'N南通' },
        { value: '280', label: 'P平凉' },
        { value: '86', label: 'P莆田' },
        { value: '121', label: 'P萍乡' },
        { value: '133', label: 'P平顶山' },
        { value: '138', label: 'P濮阳' },
        { value: '165', label: 'P盘锦' },
        { value: '172', label: 'P攀枝花' },
        { value: '197', label: 'P普洱' },
        { value: '262', label: 'Q钦州' },
        { value: '282', label: 'Q庆阳' },
        { value: '295', label: 'Q黔西南' },
        { value: '296', label: 'Q黔东南' },
        { value: '297', label: 'Q黔南' },
        { value: '47', label: 'Q清远' },
        { value: '60', label: 'Q衢州' },
        { value: '66', label: 'Q青岛' },
        { value: '342', label: 'Q齐齐哈尔' },
        { value: '88', label: 'Q泉州' },
        { value: '349', label: 'Q七台河' },
        { value: '192', label: 'Q曲靖' },
        { value: '207', label: 'Q秦皇岛' },
        { value: '72', label: 'R日照' },
        { value: '337', label: 'R日喀则' },
        { value: '32', label: 'S上海' },
        { value: '288', label: 'S三亚' },
        { value: '35', label: 'S深圳' },
        { value: '44', label: 'S汕尾' },
        { value: '53', label: 'S汕头' },
        { value: '54', label: 'S韶关' },
        { value: '58', label: 'S绍兴' },
        { value: '320', label: 'S石嘴山' },
        { value: '333', label: 'S商洛' },
        { value: '336', label: 'S山南' },
        { value: '87', label: 'S三明' },
        { value: '345', label: 'S双鸭山' },
        { value: '352', label: 'S绥化' },
        { value: '98', label: 'S随州' },
        { value: '102', label: 'S十堰' },
        { value: '118', label: 'S邵阳' },
        { value: '129', label: 'S上饶' },
        { value: '141', label: 'S三门峡' },
        { value: '143', label: 'S商丘' },
        { value: '149', label: 'S四平' },
        { value: '153', label: 'S松原' },
        { value: '169', label: 'S沈阳' },
        { value: '177', label: 'S遂宁' },
        { value: '195', label: 'S邵通' },
        { value: '208', label: 'S石家庄' },
        { value: '223', label: 'S朔州' },
        { value: '234', label: 'S宿迁' },
        { value: '239', label: 'S苏州' },
        { value: '246', label: 'S宿州' },
        { value: '258', label: 'T铜陵' },
        { value: '277', label: 'T天水' },
        { value: '31', label: 'T天津' },
        { value: '293', label: 'T铜仁' },
        { value: '300', label: 'T吐鲁番' },
        { value: '309', label: 'T塔城' },
        { value: '62', label: 'T台州' },
        { value: '67', label: 'T泰安' },
        { value: '325', label: 'T铜川' },
        { value: '358', label: 'T通辽' },
        { value: '368', label: 'T台湾' },
        { value: '151', label: 'T通化' },
        { value: '166', label: 'T铁岭' },
        { value: '209', label: 'T唐山' },
        { value: '218', label: 'T太原' },
        { value: '233', label: 'T泰州' },
        { value: '272', label: 'W梧州' },
        { value: '278', label: 'W武威' },
        { value: '298', label: 'W乌鲁木齐' },
        { value: '64', label: 'W温州' },
        { value: '321', label: 'W吴忠' },
        { value: '69', label: 'W威海' },
        { value: '328', label: 'W渭南' },
        { value: '92', label: 'W武汉' },
        { value: '356', label: 'W乌海' },
        { value: '362', label: 'W乌兰察布' },
        { value: '199', label: 'W文山' },
        { value: '237', label: 'W无锡' },
        { value: '253', label: 'W芜湖' },
        { value: '311', label: 'X西宁' },
        { value: '324', label: 'X西安' },
        { value: '327', label: 'X咸阳' },
        { value: '84', label: 'X厦门' },
        { value: '95', label: 'X孝感' },
        { value: '97', label: 'X咸宁' },
        { value: '101', label: 'X襄樊' },
        { value: '363', label: 'X兴安' },
        { value: '364', label: 'X锡林郭勒' },
        { value: '367', label: 'X香港' },
        { value: '114', label: 'X湘西' },
        { value: '116', label: 'X湘潭' },
        { value: '123', label: 'X新余' },
        { value: '136', label: 'X新乡' },
        { value: '139', label: 'X许昌' },
        { value: '144', label: 'X信阳' },
        { value: '201', label: 'X西双版纳' },
        { value: '212', label: 'X邢台' },
        { value: '232', label: 'X徐州' },
        { value: '251', label: 'X宣城' },
        { value: '264', label: 'Y玉林' },
        { value: '46', label: 'Y阳江' },
        { value: '51', label: 'Y云浮' },
        { value: '308', label: 'Y伊犁哈萨克' },
        { value: '317', label: 'Y玉树' },
        { value: '319', label: 'Y银川' },
        { value: '68', label: 'Y烟台' },
        { value: '329', label: 'Y延安' },
        { value: '331', label: 'Y榆林' },
        { value: '347', label: 'Y伊春' },
        { value: '104', label: 'Y宜昌' },
        { value: '106', label: 'Y岳阳' },
        { value: '109', label: 'Y益阳' },
        { value: '111', label: 'Y永州' },
        { value: '124', label: 'Y鹰潭' },
        { value: '127', label: 'Y宜春' },
        { value: '155', label: 'Y延边' },
        { value: '162', label: 'Y营口' },
        { value: '181', label: 'Y宜宾' },
        { value: '185', label: 'Y雅安' },
        { value: '193', label: 'Y玉溪' },
        { value: '220', label: 'Y阳泉' },
        { value: '225', label: 'Y运城' },
        { value: '226', label: 'Y沂州' },
        { value: '231', label: 'Y扬州' },
        { value: '236', label: 'Y盐城' },
        { value: '279', label: 'Z张掖' },
        { value: '291', label: 'Z遵义' },
        { value: '39', label: 'Z湛江' },
        { value: '41', label: 'Z肇庆' },
        { value: '49', label: 'Z中山' },
        { value: '52', label: 'Z珠海' },
        { value: '61', label: 'Z舟山' },
        { value: '323', label: 'Z中卫' },
        { value: '79', label: 'Z淄博' },
        { value: '80', label: 'Z枣庄' },
        { value: '89', label: 'Z漳州' },
        { value: '108', label: 'Z张家界' },
        { value: '115', label: 'Z株洲' },
        { value: '130', label: 'Z郑州' },
        { value: '145', label: 'Z周口' },
        { value: '146', label: 'Z驻马店' },
        { value: '171', label: 'Z自贡' },
        { value: '187', label: 'Z资阳' },
        { value: '213', label: 'Z张家口' },
        { value: '241', label: 'Z镇江' }
      ],
      optionValue: '',
      show: 1,
      activeName: 'first',
      norTableData: [{
        id: '2016-05-02',
        title: '王小虎王小虎',
        state: 'ok',
        updateTime: '2020-06-06'
      }, {
        id: '2016-05-02',
        title: '王小虎王ss小虎',
        state: 'no',
        updateTime: '2020-06-06'
      }, {
        id: '2016-05-02',
        title: '王小虎王小虎44',
        state: 'ok',
        updateTime: '2020-06-06'
      }, {
        id: '2016-05-02',
        title: '王小虎',
        state: 'no',
        updateTime: '2020-06-06'
      }],
      TopTableData: [],
      fastTableData: []

    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    menuCli (i) {
      if (i === 21) {
        this.show = i
      } else if (i === 22) {
        this.show = i
      } else if (i === 31) {
        this.show = i
      } else if (i === 321) {
        this.show = i
        this.$api.post('http://118.25.137.189/admin/wz/getWzPageByUser', {}, res => {
          console.info(res)
        })
      } else if (i === 322) {
        this.show = i
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
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changePWD () {
      if (this.newPWD !== this.newPWDcfm) {
        alert('两次输入的密码不一致')
        return
      }
      // const oldPwd = this.oldPwd
      const newPWD = this.newPWD
      const id = sessionStorage.getItem('id')
      this.$api.post('http://118.25.137.189/admin/user/updatePsw',
        {
          id, newPWD
        }, res => {
          if (res.data !== -1) {
            alert(res.data)
          } else {
            alert('服务器开小差了@_@!')
            sessionStorage.setItem('isLogin', '1')
          }
        })
    },
    pubHandleClick (row) {
      console.log(row)
    },
    tableRowClassName ({ row, rowIndex }) {
      console.info(row.state)
      if (row.state === 'no') {
        console.info(rowIndex)
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
