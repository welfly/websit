<template>
  <div :ref="eleId" style="text-align:left" @mouseleave="sendMsg"/>
</template>

<script>
import Editor from 'wangeditor'
import axios from 'axios'
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?38a5b50cc0cc263cbb7a0b1de76cf498'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
export default {
  name: 'EditorBox',
  props: {
    eleId: {
      type: String,
      default: ''
    },
    content: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      editor: {},
      uploadImgForm: {
        file: {}
      },
      editorContent: ''
    }
  },
  mounted () {
    this.initEditor(this.eleId)
  },
  methods: {
    sendMsg () {
      this.$emit('editorContent', this.editorContent)
    },
    initEditor (id) {
      const self = this
      this.$nextTick(() => {
        self.editor = new Editor(this.$refs[id])
        // 或者 var editor = new E( document.getElementById('editor') )

        // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
        self.editor.customConfig.debug =
          location.href.indexOf('wangeditor_debug_mode=1') > 0

        // self.editor.customConfig.emotions = [
        //   {
        //     // tab 的标题
        //     title: '默认',
        //     // type -> 'emoji' / 'image'
        //     type: 'image',
        //     // content -> 数组
        //     content: [
        //       {
        //         alt: '[坏笑]',
        //         src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
        //       },
        //       {
        //         alt: '[舔屏]',
        //         src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
        //       },
        //       {
        //         alt: '[哈哈]',
        //         src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/2018new_haha_org.png'
        //       },
        //       {
        //         src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
        //         alt: '[草泥马]'
        //       }
        //     ]
        //   },
        //   {
        //     // tab 的标题
        //     title: 'emoji',
        //     // type -> 'emoji' / 'image'
        //     type: 'emoji',
        //     // content -> 数组
        //     content: ['😀', '😃', '😄', '😁', '😆']
        //   }
        // ]
        self.editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          // 'video', // 插入视频
          // 'code', // 插入代码
          'undo', // 撤销
          'redo' // 重复
          // 'fullscreen' // 全屏
        ]
        self.editor.customConfig.uploadImgMaxLength = 1 /* 限制一次最多上传 5 张图片 */
        self.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 /* 将图片大小限制为 3M 默认为5M */
        self.editor.customConfig.customUploadImg = function (files, insert) {
          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法

          // 上传代码返回结果之后，将图片插入到编辑器中
          self.filesToBase64(files)
        }
        self.editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        self.editor.create()
        const eds = document.getElementsByClassName('w-e-text-container')
        eds[0].style = eds[0].style.cssText + 'height: 500px'
        const isChangeDa = sessionStorage.getItem('isChangeData')
        if (isChangeDa === '1' && JSON.parse(sessionStorage.getItem('changeData'))) {
          self.editor.txt.html(JSON.parse(sessionStorage.getItem('changeData')).nr)
        }
      })
    },
    filesToBase64 (files) {
      const self = this
      files.map(item => {
        var reader = new FileReader()
        reader.onload = function (e) {
          self.uploadImage(e.target.result, item)
        }
        // 传入一个参数对象即可得到基于该参数对象的文本内容
        reader.readAsDataURL(item)
      })
    },
    uploadImage (base64, file) {
      const self = this
      const formdata = new FormData() // 创建form对象
      // target.result 该属性表示目标对象的DataURL
      this.Base64toBlob({
        base64,
        success (blob) {
          // 上传完成，表单储存数组
          self.uploadImgForm.file = blob
          self.uploadImgForm.Name = file.name
          // 转formData格式发送数据
          // Object.keys(self.uploadImgForm).forEach((key) => {
          formdata.append('file', blob, self.uploadImgForm.Name)
          // })
          axios.post('http://lingduizhipin.com/admin/tp/upload', formdata, {
            headers: {
              'Content-Type': 'text/plain;charset=UTF-8'
            }
          }).then(res => {
            const { data } = res
            // 插入图片到editor
            if (data) {
              self.editor.cmd.do('insertHtml', '<img src="' + data.data.src + '" style="max-width:100%;"/>')
            } else {
              alert('上传图片只能为jpg/png格式，大小为1M')
            }
          })
        }
      })
    },
    Base64toBlob ({ base64, success }) {
      const arr = base64.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr], { type: mime })
      success(blob)
    }
  }
}
</script>

<style scoped>
</style>
