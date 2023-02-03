import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'

import { AppComponent } from './app.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'ngx-moment';
import { IdleDialogComponent } from './idle-dialog/idle-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IdleDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    MatInputModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
