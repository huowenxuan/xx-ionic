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
})
export class MarkdownPageModule {}
