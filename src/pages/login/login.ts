import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlantService } from "../../providers/PlantService";
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  msg;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    private plantService: PlantService,
    private storage: Storage
  ) {
    this.msg = '';
  }
  login(val) {
   
    if (val.userName && val.userPwd) {
      this.plantService.loginUser(val).subscribe(res => {
        if (res.status == 1) {
          this.storage.set('user', res.msg.id);
          //记录用户名
          // this.storage.set('userName',val.userName)
          this.appCtrl.getRootNav().setRoot(TabsPage);
        } else if (res.status == 2) {
          this.msg = "连接失败";
        } else {
          this.msg = '账号或密码有误';
        }
      })
    } else {
      this.msg = '账号或密码不能为空';
    }
   
  }
}