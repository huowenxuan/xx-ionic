# 嘿嘿嘿嘿

## Next
* 创建User表、账号密码登陆、推出登陆、登陆UI
* money首页跳转到编辑spend、编辑类别。下面是所有类别的折线图，与总的折线图
* spend-edit可跳转上个月 下个月
* tab-note显示思维导图echarts，tree类型
* note详情页可编辑，pop后再进入到编辑页面
* note编辑时结束日期可立刻选择为现在时间

## 【改版】
月: 上面放一个日历
年: 大的item列出当月共有几条

想把导航栏去掉，左右两个按钮显示，把月和年的大入口放在主页中，去掉super tabs。点击月后，📅从上掉下来，可点击选择，收回日历时重新刷新notes。点击年后掉下以月为单位的日记本，上面记录年月和note数，点击后再刷新本页notes

把super-tabs移动到tab-money，分成记账、理财、手指负债等

## 已知bug
* windows的icon
* 有时滚动到底部无法加载更多，往上滚一下才会好，一直都存在

## 运行
### ionic
```
npm run serve 
// 或
ionic serve
```

### electron
```
// 确保正确打包到www/index.html中
ionic serve 
// 直接运行electron
electron .
// 打包为mac app
npm run ele 
```

## 已有功能
### 记账
首页展示过去一年花费、分类排行榜统计图
每月分类记账，生成南丁格尔图
### 笔记
增删改笔记，编辑时可以选择开始、结束的日期时间
查看笔记，转换为markdown，一键复制markdown  
查看某个日期范围内的笔记  
### 聊天
文字聊天  
### 设置
设置主题  
可设置随机主题

