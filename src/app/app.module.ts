import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';

//合同管理模块
import { ContractModule } from '../pages/contract/contract.module';
import { HomeModule } from '../pages/home/home.module';
import { NewModule } from '../pages/new/new.module';


import { PlantService } from '../providers/PlantService';
import { HttpService } from '../providers/HttpService';
import { Utils } from '../providers/Utils';
import { IonicStorageModule } from '@ionic/storage';
import { NativeService } from '../providers/NativeService';
import { FileService } from '../providers/FileService';
import { GlobalData } from '../providers/GlobalData';
import { Network } from '@ionic-native/network';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';


//插件
import { Camera } from '@ionic-native/camera';


@NgModule({
  imports: [
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserModule,
    ContractModule, //引入 contract 模块
    HomeModule, //引入 home 模块
    NewModule,
    IonicModule.forRoot(MyApp,{
      mode: 'ios',      
      backButtonText: '',
      tabsHideOnSubPages: 'true'
    }) //隐藏子页面tabs
  ],
  bootstrap: [IonicApp],

  declarations: [
    MyApp,
    LoginPage,
    UserPage,
    TabsPage
  ],
  entryComponents: [
    MyApp,
    LoginPage,
    UserPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PlantService,
    IonicStorageModule,
    HttpService,
    Utils,
    Camera,
    Toast,
    NativeService,
    FileService,
    GlobalData,
    Network,
    ImagePicker,
    File
  ]
})
export class AppModule { }
