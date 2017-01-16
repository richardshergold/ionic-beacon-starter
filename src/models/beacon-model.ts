import { Observable } from 'rxjs/Observable';

export class BeaconModel {

  uuid: string;
  major: number;
  minor: number;
  rssi: number;

  constructor(public beacon: any) {
    this.uuid = beacon.uuid;
    this.major = beacon.major;
    this.minor = beacon.minor;
    this.rssi = beacon.rssi;
  }
}