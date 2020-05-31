<template>
  <div style="margin-left: 16em; height: 18em">
    <div style="text-align: left;  margin-left: -3em; margin-top: 1.3em; font-size: 1.5em;">会员登录</div>
    <tr class="td">
      <td>登录账户：</td>
      <td>
        <el-input
          v-model="loginVal"
          placeholder="请输入登录账户"
          clearable/>
      </td>
    </tr>
    <tr class="td">
      <td>登录密码：</td>
      <td>
        <el-input
          v-model="loginPWDVal"
          type="password"
          placeholder="请输入登录密码"
          clearable/>
      </td>
    </tr>
    <tr style=" width: 13em;  line-height: 3.3em;">
      <td colspan="2">
        <el-button
          type="success"
          @click="login()">会员登录</el-button>
      </td>
    </tr>
    <tr class="td">
      <td colspan="2">
        <span>如您没有账号， <a
          href="#"
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
      const name = this.loginVal
      const pwsword = this.loginPWDVal
      this.$api.post('http://118.25.137.189/admin/user/loginqt',
        {
          name, pwsword
        }, res => {
          if (res && res.data !== -1) {
            const uname = res.data.name + ''
            sessionStorage.setItem('userMsg', uname)
            sessionStorage.setItem('isLogin', '0')
            sessionStorage.setItem('id', res.data.id)

            const isL = sessionStorage.setItem('isLogin', '0')
            this.$emit('toPar', isL)
            this.$router.push({ path: '/home/usercenter' })
            alert('登录成功！')
          } else {
            alert('用户名或密码错误！')
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
