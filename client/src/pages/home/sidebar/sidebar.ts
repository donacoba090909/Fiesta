import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators/pluck';
import { switchMap } from 'rxjs/operators/switchMap';

import { User } from '../../../interfaces/User';
import { AppState } from '../../../store/reducers';
import { AddUserParties } from '../../../store/parties/parties.actions';
import { PartyProvider } from '../../../providers/party/party';

@IonicPage()
@Component({
  selector: 'page-sidebar',
  templateUrl: 'sidebar.html',
})
export class SidebarPage {

  query: string = ''
  user$: Observable<User>

  constructor(
    public navCtrl: NavController,
    public partyProvider: PartyProvider,
    private store: Store<AppState>,
  ) {
    this.user$ = store.select('user');
  }

  onQuery() {
    this.user$.pipe(
      pluck('id'),
      switchMap(id => this.partyProvider.getUserParties(id)),
    )
      .do(parties => this.store.dispatch(new AddUserParties(parties.data)))
      .take(1)
      .subscribe();
  }

  reset() {

  }

}
