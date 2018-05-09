import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { PlantService } from "../../../providers/PlantService";



@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {

  items;
  num: number;
  userArr: Array<object>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public plantService: PlantService
  ) {
    this.num = 0;
    this.userArr = [];
  }

  /**
   * init data after viewLoad
   * @memberof UserListPage
   */
  ionViewDidLoad() {
    this.storage.get('user').then(val=>{
      this.plantService.userList({'user_id':val}).subscribe(res => {
        if (res.status == 1) {
          this.items = res.msg;
        }
      })
    })
  }

  /**
   * search
   * @param {any} ev 
   * @memberof UserListPage
   */
  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      // Reset items back to all of the items 
      this.ionViewDidLoad();
    }
  }

  /**
   * selceted users Array
   * @param {any} item  select userInfo
   * @param {any} e event
   * @memberof UserListPage
   */
  insertUserArray(item, e) {
    if (e.checked === true) {
      this.userArr.push(item);
    } else {
      for (let i = 0; i < this.userArr.length; i++) {
        if (this.userArr[i]['id'] == item.id) {
          this.userArr.splice(i, 1);
        }
      }
    }
    this.num = this.userArr.length;
  }

  /**
   * return select receive people 
   * @memberof UserListPage
   */
  returnUserArr() {
    this.storage.get('receivers').then((val) => {
      if (val == null || JSON.stringify(val)=='[]') {
        this.storage.set('receivers',this.userArr);
      } else {
        let arr = val;
        let flag = false;
        for (let i = 0; i < this.userArr.length;i++) {
          for (let j = 0; j < val.length; j++) {
            if (this.userArr[i]['id'] == val[j].id) {
              flag = false;
              break;
            }
            flag = true;
          }
          if(flag){
            arr.push(this.userArr[i]);
          }
        }
        this.storage.set('receivers', arr);
      }
    });
    this.navCtrl.pop();
  }
}
