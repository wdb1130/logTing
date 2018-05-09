//子模块
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';


import { MyApp } from '../../app/app.component';
import { ContractPage } from './contract';
import { DetailPage } from './detail/detail';

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    ContractPage,
    DetailPage
  ],
  entryComponents: [
    ContractPage,
    DetailPage
  ]
})
export class ContractModule {}
