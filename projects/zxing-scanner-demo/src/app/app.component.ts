import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
// import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
// import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  availableDevices: MediaDeviceInfo[];
  currentDevice: any = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor() {}

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log(devices, 'devices');
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    console.log(resultString);
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  // openFormatsDialog() {
  //   const data = {
  //     formatsEnabled: this.formatsEnabled,
  //   };

  //   this._dialog
  //     .open(FormatsDialogComponent, { data })
  //     .afterClosed()
  //     .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  // }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  // openInfoDialog() {
  //   const data = {
  //     hasDevices: this.hasDevices,
  //     hasPermission: this.hasPermission,
  //   };

  //   this._dialog.open(AppInfoDialogComponent, { data });
  // }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}
