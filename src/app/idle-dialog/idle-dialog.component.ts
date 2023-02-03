import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Idle } from '@ng-idle/core';

@Component({
  selector: 'app-idle-dialog',
  templateUrl: './idle-dialog.component.html',
  styleUrls: ['./idle-dialog.component.scss'],
})
export class IdleDialogComponent implements OnInit {

  constructor(private Ref: MatDialogRef<IdleDialogComponent>) {}

  ngOnInit(): void {}

  logOut() {
    this.Ref.close();
  }

  stayLoggedIn() {
    this.Ref.close();
  }
}
