<template>
  <div style="width: 110%;margin-top: -60px;margin-left: -30px">
    <div id="Wrapper" style="overflow: hidden;width: 100%">
      <div class="content">
        <div
          id="Main"
          style="width: 550px;float: right;margin-right:10%;margin-top: 10%"
        >
          <div class="box" style="margin-top: 100px">
            <div class="loginheader" v-if="!flagN">
              <span class="chevron">&nbsp;›&nbsp;</span> 登录 &nbsp;
            </div>
            <div class="loginheader" v-if="flagN">
              <span class="chevron">&nbsp;›&nbsp;</span> 注册 &nbsp;
            </div>
            <div class="cell" v-if="!flagN">
              <form method="post" action="/signin">
                <table cellpadding="5" cellspacing="0" border="0" width="100%">
                  <tbody>
                  <tr>
                    <td align="right"></td>
                    <td align="right">
                      <b-field>
                        <div align="left">
                        </div>
                      </b-field>
                    </td>
                  </tr>
                  <tr>
                    <td align="right">
                      <b-icon icon="account"> </b-icon>
                    </td>
                    <td width="auto" align="left">
                      <b-field>
                        <b-autocomplete
                          v-model="lusername"
                          rounded
                          clearable
                          placeholder="输入用户名"
                          style="width: 80%"
                        >
                        </b-autocomplete>
                      </b-field>
                    </td>
                  </tr>

                  <tr>
                    <td align="right">
                      <b-icon icon="account-key"> </b-icon>
                    </td>
                    <td width="auto" align="left">
                      <b-field>
                        <b-input
                          type="password"
                          placeholder="请输入密码"
                          v-model="lpassword"
                          password-reveal
                          style="width: 80%"
                          rounded
                        >
                        </b-input>
                      </b-field>
                    </td>
                  </tr>

                  <tr>
                    <td width="120" align="right"></td>
                    <td width="auto" align="left">
                      <b-button type="is-success" value="登录" @click="login">
                        登录
                      </b-button>
                      <b-button
                        type="is-primary"
                        outlined
                        value="注册"
                        @click="gotoRegister"
                        style="margin-left: 5%"
                      >
                        注册
                      </b-button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <input type="hidden" value="/" name="next" />
              </form>
            </div>

            <div class="cell" v-if="flagN">
              <form method="post" action="/signin">
                <table cellpadding="5" cellspacing="0" border="0" width="100%">
                  <tbody>
                  <tr>
                    <td align="right"></td>
                    <td align="right">
                      <b-field>
                        <div align="left">
                        </div>
                      </b-field>
                    </td>
                  </tr>
                  <tr>
                    <td align="right">
                      <b-icon icon="account-circle"> </b-icon>
                    </td>
                    <td width="auto" align="left">
                      <b-field>
                        <b-autocomplete
                          v-model="rusername"
                          rounded
                          clearable
                          placeholder="输入用户名"
                          style="width: 80%"
                        >
                        </b-autocomplete>
                      </b-field>
                    </td>
                  </tr>
                  <tr>
                    <td align="right">
                      <b-icon icon="settings-outline"> </b-icon>
                    </td>
                    <td width="auto" align="left">
                      <b-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="rpassword"
                        style="width: 80%"
                        rounded
                      >
                      </b-input>
                    </td>
                  </tr>
                  <tr>
                    <td align="right">
                      <b-icon icon="settings"> </b-icon>
                    </td>
                    <td width="auto" align="left">
                      <b-input
                        type="password"
                        placeholder="请再次输入密码"
                        v-model="passwordagain"
                        style="width: 80%"
                        rounded
                      >
                      </b-input>
                    </td>
                  </tr>

                  <tr>
                    <td width="120" align="right"></td>
                    <td width="auto" align="left">
                      <input type="hidden" value="62970" name="once" />
                      <b-button
                        type="is-success"
                        outlined
                        value="登录"
                        @click="gotoLogin"
                      >登录</b-button
                      >
                      <b-button
                        type="is-primary"
                        value="注册"
                        @click="register"
                        style="margin-left: 5%"
                      >注册
                      </b-button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <input type="hidden" value="/" name="next" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="c"></div>
      <div class="sep20"></div>
    </div>
  </div>
</template>

<script>
const customIconConfig = {
  customIconPacks: {
    fas: {
      sizes: {
        default: '',
        'is-small': 'fa-xs',
        'is-medium': 'fa-lg',
        'is-large': 'fa-2x'
      }
    }
  }
}
export default {
  created () {
    this.$buefy.config.setOptions(customIconConfig)
  },
  data () {
    return {
      lpassword: '',
      lusername: '',
      rpassword: '',
      rusername: '',
      passwordagain: '',
      flagN: 0
    }
  },
  methods: {
    gotoLogin () {
      this.flagN = 0
      this.rusername = ''
      this.rpassword = ''
      this.passwordagain = ''
    },
    login () {
      this.flagN = 0
      if (this.lusername === '') {
        alert('请输入用户名！')
        return
      }
      if (this.lpassword === '') {
        alert('请输入密码！')
        return
      }
      this.axios({
        method: 'post',
        url: 'http://10.251.253.81:8000/user/login',
        data: {
          username: this.lusername,
          password: this.lpassword
        }
      })
        .then(res => {
          const { data } = res
          // console.log(data)
          if (data.message === 'success') {
            localStorage.setItem('userid', data.data._id)
            localStorage.setItem('username', data.data.username)
            localStorage.setItem('identity', data.data.identity)
            localStorage.setItem('name', data.data.name)

            this.$message.success('登录成功！')
            this.$router.push('/home')
          } else {
            this.$message.success('用户名或密码错误！')
          }
        })
        .catch(() => {})
    },
    gotoRegister () {
      this.lusername = ''
      this.lpassword = ''
      this.flagN = 1
    },
    register () {
      if (this.rusername === '') {
        alert('请设置用户名！')
        return
      }

      if (this.rpassword === '') {
        alert('请设置密码！')
        return
      }
      if (this.rpassword === this.passwordagain) {
        this.axios({
          method: 'post',
          url: 'http://10.251.253.81:8000/user/register',
          data: {
            username: this.rusername,
            password: this.rpassword
          }
        })
          .then(res => {
            const { data } = res
            console.log(data)
            if (data.message === 'success') {
              alert('注册成功')
              this.lusername = this.rusername
              this.lpassword = this.rpassword
              this.login()
            } else {
              alert(data.message)
              this.rusername = ''
              this.rpassword = ''
              this.passwordagain = ''
            }
          })
          .catch(() => {})
      } else {
        alert('两次密码不一致！')
      }
    }
  }
}
</script>

<style scoped>
  .table {
    display: table;
    border-collapse: separate;
    border-color: grey;
  }

  .tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  .tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  .box {
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e2e2e2;
  }

  .loginheader {
    padding: 10px;
    font-size: 15px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    overflow: auto;
  }

  .cell {
    padding: 10px;
    font-size: 14px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
  }

  .Leftbar {
    width: 0;
    float: left;
  }

  .Rightbar {
    width: 270px;
    float: right;
    margin-right: 20px;
  }

  .Main {
    margin: 0 310px 0 20px;
  }

  a.dark:active,
  a.dark:link,
  a.dark:visited {
    color: gray;
    text-decoration: none;
  }

  a:active,
  a:link,
  a:visited {
    color: #778087;
    text-decoration: none;
    word-break: break-word;
  }

  .fr {
    float: right;
    text-align: right;
  }

  .sep10 {
    height: 10px;
  }

  .inner {
    padding: 10px;
    font-size: 14px;
    line-height: 150%;
    text-align: left;
  }

  div {
    display: block;
  }

  :root {
    --box-background-color: #fff;
    --box-background-alt-color: #f9f9f9;
    --box-background-hover-color: #fafafa;
    --box-foreground-color: #000;
    --box-border-color: #e2e2e2;
    --box-border-radius: 3px;
  }

  #Top {
    text-align: center;
    background-color: var(--box-background-color);
    height: 44px;
    font-size: 15px;
    font-weight: 500;
    background-size: 44px 44px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
    padding: 0 20px;
  }

  #Wrapper {
    text-align: center;
    background-size: 100% 100%;
    background-image: url("./assets/background.jpg");
    background-repeat: no-repeat;
  }

  #Bottom {
    border-top: 1px solid rgba(0, 0, 0, 0.22);
    background-color: var(--box-background-color);
    text-align: center;
    color: #999;
    padding: 0 10px;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: helvetica neue, luxi sans, dejavu sans, segoe ui,
    hiragino sans gb, microsoft yahei, sans-serif;
  }

  .sep20 {
    height: 20px;
  }

  .content {
    width: 100%;
    margin: 0;
    height: 66vw;

    z-index: -1;
  }
</style>
