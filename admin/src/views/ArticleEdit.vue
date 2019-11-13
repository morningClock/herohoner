<template>
  <div>
    <h1>{{id? '编辑': '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.categories" multiple placeholder="所属分类">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor
          class="quill-editor"
          v-model="model.content"
          ref="quillEditor"
          :options="editorOption">
        </quill-editor>
        <el-upload
          id="quillUploader"
          style="display: none"
          :show-file-list="false"
          :action="$http.defaults.baseURL + '/upload'"
          :on-success="uploadQuillImage">
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 工具栏配置 https://quilljs.com/docs/modules/toolbar/
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {
        content:''
      },
      categories: [],
      editorOption:{
        modules:{
          toolbar: {
            container: toolbarOptions,
            handlers: {
              // handlers object will be merged with default handlers object
              'image': function(value) {
                if (value) {
                  document.querySelector('#quillUploader .el-upload__input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    async save () {
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/articles', this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetchDetail () {
      // 获取详情
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    uploadQuillImage(res) {
      console.log('上传成功')
      // 获取富文本组件实例
      let quill = this.$refs.quillEditor.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res.url)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败')
      }
    }
  },
  created () {
    this.fetchCategories()
    this.id && this.fetchDetail()
  }
}
</script>

<style scope>
.quill-editor{
  line-height: 1.42;
}
.ql-container{
  height: 200px;
}
</style>