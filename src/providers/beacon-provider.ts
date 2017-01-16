import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from 'ionic-native';


/*
  Generated class for the BeaconProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BeaconProvider {

  delegate: any;
  region: any;

  constructor(public platform: Platform, public events: Events) {
  }

  initialise(): any {
    let promise = new Promise((resolve, reject) => {
      // we need to be running on a device 
      if (this.platform.is('cordova')) {

        // Request permission to use location on iOS
        IBeacon.requestAlwaysAuthorization();

        // create a new delegate and register it with the native layer
        this.delegate = IBeacon.Delegate();

        // Subscribe to some of the delegate's event handlers
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
          data => {
            this.events.publish('didRangeBeaconsInRegion', data);
          },
          error => console.error()
          );

        // setup a beacon region
        this.region = IBeacon.BeaconRegion('deskBeacon', 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E');

        // start ranging
        IBeacon.startRangingBeaconsInRegion(this.region)
          .then(
          () => {
            resolve(true);
          },
          error => {
            console.error('Failed to begin monitoring: ', error);
            resolve(false);
          }
          );


      } else {
        console.error("This application needs to be running on a device");
        resolve(false);
      }
    });

    return promise;
  }


}
