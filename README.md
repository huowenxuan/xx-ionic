# 嘿嘿嘿嘿

## Next
* 创建User表、账号密码登陆、推出登陆、登陆UI
* 修改字体
* 减小首页navbar、tabbar高度
* money首页跳转到编辑spend、编辑类别。下面是所有类别的折线图，与总的折线图

## 【改版】
* 首页只显示当天的，上半部分为日历，可以选择某一天，下半部分为当天的笔记
* 有一个入口，是timeline，列出所有note，需要设计UI
* 首页有一个大的明显的按钮用来创建
* 十年内的今日
* 首页有一个入口，进入日记列表，按每日列出笔记

## 已知bug
* windows的icon

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

