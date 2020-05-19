<template>
  <div style="margin-left: 16em; height: 18em">
    <div style="text-align: left;  margin-left: -3em; margin-top: 1.3em; font-size: 1.5em;">会员登录</div>
    <tr class="td">
      <td>登录账户：</td>
      <td>
        <el-input placeholder="请输入登录账户"
                  v-model="loginVal"
                  clearable>
        </el-input>
      </td>
    </tr>
    <tr class="td">
      <td>登录密码：</td>
      <td>
        <el-input placeholder="请输入登录密码"
                  v-model="loginPWDVal"
                  clearable>
        </el-input>
      </td>
    </tr>
    <tr style=" width: 13em;  line-height: 3.3em;">
      <td colspan="2">
        <el-button @click="login()"
                   type="success">会员登录</el-button>
      </td>
    </tr>
    <tr class="td">
      <td colspan="2">
        <span>如您没有账号， <a href="#"
             @click="registered()">点此注册！</a></span>
      </td>
    </tr>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginVal: '',
      loginPWDVal: ''
    }
  },
  methods: {
    registered () {
      this.$router.push({ path: '/home/registered' })
    },
    login () {
      let name = this.loginVal
      let pwsword = this.loginPWDVal
      this.$api.post('http://localhost/cyx/user/loginqt',
        {
          name, pwsword
        }, res => {
          if (res.status === 200) {
            alert('登录成功！')
            console.info(res)
            sessionStorage.setItem('userMsg', JSON.stringify(res.data))
            sessionStorage.setItem('isLogin', '0')
          } else {
            alert('服务器开小差了@_@!')
            sessionStorage.setItem('isLogin', '1')
          }
        })
    }
  }

}
</script>
<style lang="less" scoped>
.td {
  width: 13em;
  text-align: right;
  margin-right: 2em;
  line-height: 3.3em;
}
</style>
