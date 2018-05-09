import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { PlantService } from "../../../providers/PlantService";
import { PreviewPicturePage } from "../../../shared/preview-picture/preview-picture";


@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage implements OnInit {

  logMsg: any = [];
  imgList: any = [];
  anyoneRead: boolean = true; //是否有人阅读
  remarkFlag: boolean = false; // have remark?
  readingNum: number = 0; //the number of reading
  logReadInfo: any; //reading message
  logCtt: object = {}; //log primary content

  comment: any;

  logId: number;
  userId: number;
  isHide: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public plantService: PlantService,
    public modalCtrl: ModalController
  ) {
    this.logId = navParams.data.item;
    this.storage.get('user').then(val=>{
      this.userId = val;
    })
  }


  ngOnInit() {
    // console.log('ngOnInit');
  }

  ionViewDidLoad() {
    this.plantService.logDetail({ 'log_id': this.logId }).subscribe(res => {
      this.logCtt = res.msg[0];
      this.logMsg = res.msg;
    })

    this.plantService.getImgs({ 'log_id': this.logId,'file_type_id': 666 }).subscribe(res => {
      this.imgList = res.msg;
      console.log(res.msg);
    })

    // 
    this.plantService.logReadPerson({ 'log_id': this.logId }).subscribe(res => {
      //nobody reading 
      if (JSON.stringify(res.msg) == '[]') {
        this.logReadInfo = [];
        this.anyoneRead = false;
      } else {
        this.logReadInfo = res.msg; //the primary  message
        this.readingNum = res.msg.length; // the number of reading

        //have comment?
        this.remarkFlag = this.logReadInfo.every((val) => {
          return val.remarks != null;
        })
      }
    })
  }

  toggle() {
    this.isHide = false;
  }

  /**
   * send reamrk
   * @memberof LogPage
   */
  send() {
    let data = {
      'log_id': this.logId,
      'user_id': this.userId,
      'comment': this.comment
    };
    this.plantService.logComment(data).subscribe(res => {
      this.ionViewDidLoad();
      this.comment = '';
      this.isHide = true;
    })
  }

  viewerPicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.imgList) {
      picturePaths.push(fileObj.path);
    }
    this.modalCtrl.create(PreviewPicturePage, {'initialSlide': index, 'picturePaths': picturePaths}).present();
  }
}
