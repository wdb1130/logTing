import { Component } from '@angular/core';

import { NewPage } from '../new/new';
import { ContractPage } from '../contract/contract';
import { UserPage } from '../user/user';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewPage;
  tab3Root = ContractPage;
  tab4Root = UserPage;

  constructor() {

  }
}
