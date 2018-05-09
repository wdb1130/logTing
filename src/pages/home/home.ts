import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlantService } from "../../providers/PlantService";


import { LogPage } from './log/log';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pet: string = "tom";
  isAndroid: boolean = false;
  send_page: number = 0;
  read_flag: number;
  receive_page: number = 0;
  myLog: any = [];
  receiveLog: any = [];
  user: number;
  isHide: true; //send button switch hide and show
  constructor(
    public navCtrl: NavController,
    platform: Platform,
    private storage: Storage,
    private alertCtrl: AlertController,
    private plantService: PlantService
  ) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidEnter() {
    this.storage.get('segmentVal').then((val) => {
      if (val) {
        this.pet = val;
      }
    });

    this.storage.get('user').then((val) => {
      this.user = val;
      //get sended logs
      this.plantService.myLog({ 'user_id': val }).subscribe(res => {
        this.myLog = res.msg;
      })
      // get receives logs
      this.plantService.receiveLog({ 'user_id': val }).subscribe(res => {
        this.receiveLog = res.msg;
      })
    })
  }

  /**
   * jump log detail page 
   * @param {any} index 
   * @param {any} flag 
   */
  jump(log_id, readFlag) {

    // 该用户是否阅读该日志
    if (readFlag == 0) {
      this.plantService.readLog({ 'log_id': log_id, 'user_id': this.user }).subscribe(res => {
        console.log(res);
      })
    }
    //跳转详情页
    this.navCtrl.push(LogPage, { item: log_id });
  }

  /**
   * delete log 
   */
  del(logId) {
    let alert = this.alertCtrl.create({
      // title: '日志删除',
      message: '确定要删除该日志吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.plantService.delLog({ 'log_id': logId }).subscribe(res => {
              if (res.status == 1) {
                console.log('删除成功');
                this.ionViewDidEnter();
              }
            })
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * filter log
   * @param {number} flag 
   */
  filterLog(e, flag: number) {
    let target = e.target;
    if (flag == 0) {
      this.read_flag = 0;
      target.className = 'active';
      target.nextElementSibling.className = '';
      this.plantService.receiveLog({ 'user_id': this.user, 'read_flag': flag }).subscribe(res => {
        this.receiveLog = res.msg;
      })
    } else {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
  }

  /**
   * load more data after sliding upward.
   * @param {any} target 
   */
  doInfinite(target, flag) {
    //I send
    if (flag == 'send') {
      this.send_page += 1;
      this.plantService.myLog({ 'user_id': this.user, 'page': this.send_page }).subscribe(res => {
        if (res.msg.toString() == '') {
          target.enable(false);
          return;
        }
        this.myLog = this.myLog.concat(res.msg);
      })
    } else { //I received.

      // had readed don't load more data
      if (this.read_flag === 0) {
        target.complete();
        return;
      }
      
      this.receive_page += 1;
      this.plantService.receiveLog({ 'user_id': this.user, 'page': this.receive_page }).subscribe(res => {
        if (res.msg.toString() == '') {
          target.enable(false);
          return;
        }
        this.receiveLog = this.receiveLog.concat(res.msg);
      })
    }
    target.complete();
  }

  /**
   * refresh data after sliding pull down page
   * @param {any} refresher 
   */
  doRefresh(refresher) {
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      refresher.complete();
    }, 1000);
  }

  /**
   * remember segment state 
   * @param {any} e 
   */
  segmentChanged(e) {
    this.storage.set('segmentVal', e.value);
  }
}
