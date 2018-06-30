import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IonicPage, App, NavController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../../interfaces/User';

import { AppState } from '../../../store/reducers';
import { Logout } from '../../../store/user/user.actions';

import { FriendsPage } from '../friends/friends';
import { LoginPage } from '../../login/login';
import { UserProvider } from '../../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit, OnDestroy {

  stars = []
  emptyStars = []

  user: User
  userSub: Subscription

  constructor(
    public app: App,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userProvider: UserProvider,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.userSub = this.store.select('user').subscribe((user) => {
      this.user = user;
      this.stars = new Array(user.rating);
      this.emptyStars = new Array(5 - user.rating);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  goToFriendsList() {
    this.navCtrl.push(FriendsPage);
  }

  goToEditProfile() {
    this.modalCtrl.create('EditProfilePage').present();
  }

  signout() {
    this.userProvider.googleSignout()
      .then(() => this.app.getRootNav().setRoot(LoginPage, null, { animate: true, direction: 'left' }))
      .then(() => this.store.dispatch(new Logout()))
  }

}