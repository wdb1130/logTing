import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { HomePage } from './home';
import { LogPage } from './log/log';

@NgModule({
  imports: [
    // IonicPageModule.forChild(HomePage),
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    HomePage,
    LogPage
  ],
  entryComponents: [
    HomePage,
    LogPage
  ]
})
export class HomeModule {}
