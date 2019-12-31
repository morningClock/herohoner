# herohoner
跟随视频''全栈之巅''的学习代码。

https://space.bilibili.com/341919508?from=search&seid=9828656616708286562

## 技术栈

前台：vue3+vue-router+webpack+scss+axios

后台：vue3+vue-router+webpack+ElementUI+axios

后端：express+mongoose

## 插件

### 前台插件

- `quill`：应用富文本样式
- `sass`：生成样式类库
- `swiper`：轮播大图，卡片组件切换效果的实现。

### 后台插件

- `ElementUI`: 用于快速搭建后台界面的UI组件库。
- `vue-quill-editor`:富文本编辑插件。

### 后端插件

- `cors`：跨域处理插件，简化不用自己写跨域规则。
- `jsonwebtoken`：生成`token`实现登陆校验。
- `multer`：上传图片处理。
- `inflection`：名称转换，单/复数名称转换。
- `bcrypt`：密码加密，校验。



## 实现功能汇总

### 后端

- [x] 后台增删改查 通用型接口
- [x] 后台上传图片功能接口
- [x] 后台登录系统接口（JWT）
- [x] 前台初始化模拟数据接口（新闻、英雄列表）
- [x] 前台获取数据接口（新闻、英雄列表与详情）

### 后台

- [x] 后台登录（JWT+路由守卫）
- [x] 管理员账号管理
- [x] 轮播、广告大图管理
- [x] 分类管理
- [x] 文章管理（富文本）
- [x] 英雄管理
- [x] 物品装备管理

### 前端

- [x] 首页布局
- [x] 通用卡片组件(插槽实现)
- [x] 新闻详情页
- [x] 英雄详情

## 收获

我也跟随课程完成了这个项目，这个课程非常好，通过此课程我收获最大的几点是

- 后端通用接口编写思想
- 模块化代码管理思想
- node.js中间件实践与实现
- ES6/7语法的运用
  - `async/await`
  - `Promise机制`
  - `array.map()`
- Mongoose常见的使用方法
  - `populate`关系查询
  - `aggerate`聚合查询
- 类`Bootstarp`样式库编写方法，以及对其优劣的了解。
- 类`ElementUI`等组件库组件封装方法
  - `CardList`复用组件的实现

