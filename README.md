# 嘿嘿嘿嘿

## Next
* note列表边距变小
* note支持选择日期？需要在tab-note中判断是否为同一天
* 创建User表、账号密码登陆、推出登陆、登陆UI
* 修改字体

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
### 笔记
增删改笔记  
查看笔记，转换为markdown，一键复制markdown  
查看某个日期范围内的笔记  
### 聊天
文字聊天  
### 我的
设置主题  
可设置随机主题

