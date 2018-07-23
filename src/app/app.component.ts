import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

 declare var FCMPlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
  
    //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
//Note that this callback will be fired everytime a new token is generated, including the first time.
FCMPlugin.onTokenRefresh(function(token){
  //  alert( token );
  window.localStorage.setItem('fcm_token', token);
});
//FCMPlugin.getToken( successCallback(token), errorCallback(err) );
//Keep in mind the function will return null if the token has not been established yet.
FCMPlugin.getToken(
(token) => {
console.log(token); //I can get the token data

},
(err) => {
console.log('error retrieving token: ' + err);
}
);
//FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
//Here you define your application behaviour based on the notification data.
FCMPlugin.onNotification(
(data)=>{
    if(data.wasTapped){
      //Notification was received on device tray and tapped by the user.
     // alert( JSON.stringify(data) );
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.
     alert( JSON.stringify(data) );
    }
});
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

