import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkdownPage } from './markdown';

@NgModule({
  declarations: [
    MarkdownPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkdownPage),
  ],
  entryComponents: [
    // 必须声明实体类，否则无法通过类push，只能通过类名的字符串push
    // 通过类push不会在浏览器更新路由，刷新后直接回到首页，通过类名字符串push再次刷新依然会留在当前页，但是没有push过来的数据
    MarkdownPage
  ]
})
export class MarkdownPageModule {}
