import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPage } from './new';
import { UserListPage } from './user-list/user-list';
import { SelectPicturePageModule } from '../../shared/select-picture/select-picture.module';

@NgModule({
  imports: [
    IonicPageModule.forChild(NewPage),
    SelectPicturePageModule
  ],
  declarations: [
    NewPage,
    UserListPage
  ],
  entryComponents: [
    NewPage,
    UserListPage
  ]
})
export class NewModule {}
