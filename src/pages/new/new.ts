import { Component,OnInit } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlantService } from "../../providers/PlantService";
import { UserListPage } from './user-list/user-list'
import { FileObj } from '../../model/FileObj';

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})

export class NewPage implements OnInit {
  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];
  user: number;
  arrFlag: any = [];
  receivers: any;
  modal: boolean;
  receiverIds: any;
  projects: any = [];
  hours: any;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private plantService: PlantService,
    private storage: Storage
  ) {
    this.modal = true;
    this.receivers = [];
    this.receiverIds = [];
    this.hours = [];
  }

  ngOnInit () {
    this.storage.get('user').then((val) => {
      this.user = val;
      this.plantService.projectInfo({ 'user_id': val }).subscribe(res => {
        res.forEach((val, key) => {
          val.hour = '';
          this.projects.push(val);
          this.arrFlag.push(true);
        });
      })
    })
  }

  /**
   * switch page switch receivers
   * @memberof NewPage
   */
  ionViewDidEnter() {
    this.storage.get('receivers').then(val => {
      if (val == null) {
        this.receivers = [];
      } else {
        this.receivers = val;
        for (let o of val) {
          // jump repeat val
          if(~this.receiverIds.indexOf(o.id)){
            continue;
          }
          this.receiverIds.push(o.id);
        }
      }
    })
  }


  /**
   * textArea height auto content
   * @memberof NewPage
   */
  textAreaAdjust(o) {
    let target = o.target;
    target.style.height = "1px";
    target.style.height = (target.scrollHeight) + "px";
  }


  /**
   * alert box
   * @memberof NewPage
   */
  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: '工作内容至少填一项!',
      buttons: ['确定']
    });
    alert.present();
  }

  /**
   * switchFlag 
   * @memberof NewPage
   */
  switchFlag (key) {
    this.arrFlag[key] = !this.arrFlag[key];
  }

  /**
   * delete receiver
   * @memberof NewPage
   */
  del_people(id) {
    for (let i = 0, len = this.receiverIds.length; i < len; i++) {
      if (this.receiverIds[i] == id) {
        this.receiverIds.splice(i, 1);
        this.receivers.splice(i, 1);
      }
    }
    if (this.receivers.length != 0) {
      this.storage.set('receivers', this.receivers);
    } else {
      this.storage.remove('receivers');
    }
  }

  /**
   * jump page
   * @param {any}  带走的数据
   * @memberof NewPage
   */
  jump(val) {
    this.navCtrl.push(UserListPage, { item: val })
  }

  /**
   * submit form
   * @param {any} val 
   * @memberof NewPage
   */
  form_submit(val) {
    if (val.finished_work || val.unfinished_work || val.plan_work) {

      //如果有图片
      if (this.fileObjList.length != 0) {
        let arr: any = [];
        for (let i = 0; i < this.fileObjList.length; i++) {
          arr.push(this.fileObjList[i].origPath);
        }
        arr = JSON.stringify(arr);
        val.baseImg = arr;
        val.file_type = 666;
      }

      this.plantService.newLog(val).subscribe(res => {
        if (res.status == 1) {
          this.navCtrl.setRoot(this.navCtrl.getActive().component); //refresh page to reset data
          this.navCtrl.parent.select(0);//start 0 not 1  retrun home page
          // this.storage.remove('receivers'); //remember receivers 
        }
      })
    } else {
      this.showAlert();
    }
  }
}
