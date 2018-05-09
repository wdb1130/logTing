import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlantService } from "../../../providers/PlantService";


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  items;
  id;
  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public plantService: PlantService
  ) {
    this.id = params.data.item;
    this.items = [];
  }

  ionViewDidLoad() {
    this.plantService.agreement_detail({ 'id': this.id }).subscribe(res => {
      if (res.status == 1) {
        this.items = res.msg;
      } else {
        this.items = [];
      }
    })
  }
}
