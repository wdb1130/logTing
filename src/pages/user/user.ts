import { Component } from '@angular/core';
import { App,NavController,AlertController } from 'ionic-angular';
import { PlantService } from "../../providers/PlantService";
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  myMsg:any=[];
  constructor(
    private storage: Storage,
    private appCtrl: App,
    private plantService: PlantService,
    private alertCtrl: AlertController,
    public navCtrl: NavController
  ) { }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  ionViewDidLoad() {
    this.storage.get('user').then(val=>{
      console.log(val);
      this.plantService.userInfo({ 'user_id': val }).subscribe(res => {
        console.log(res);
        if(res.status==1){
          this.myMsg = res.msg;
        }else {
          alert('无效用户');
        }
      })
    })
   }

  exit() {
    let alert = this.alertCtrl.create({
      // title: '日志删除',
      message: '确定要退出登录吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('concel');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.storage.remove('user');
            this.appCtrl.getRootNav().setRoot(LoginPage);
            // this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
}