import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlantService } from "../../providers/PlantService";


import { DetailPage } from './detail/detail';

@Component({
  selector: 'page-contract',
  templateUrl: 'contract.html'
})
export class ContractPage {
  items;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private plantService: PlantService
  ) {

  }
  ionViewDidLoad() {
    this.storage.get('user').then((val) => {
      this.plantService.agreement({'user_id':val}).subscribe(res => {
        if (res.status == 1) {
          this.items = res.msg;
        }
      })
    })
  }

  getItems(ev) {

    // Reset items back to all of the items
    // this.ionViewDidLoad();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.contract.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      // this.items = [];
      this.ionViewDidLoad();
    }
  }

  push(item) {
    this.navCtrl.push(DetailPage, { item: item });
  }
}
