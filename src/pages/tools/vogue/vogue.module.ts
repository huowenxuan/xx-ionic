import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoguePage } from './vogue';

@NgModule({
  declarations: [
    VoguePage,
  ],
  imports: [
    IonicPageModule.forChild(VoguePage),
  ],
})
export class VoguePageModule {}
