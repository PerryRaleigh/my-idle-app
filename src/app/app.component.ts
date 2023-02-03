import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { IdleDialogComponent } from './idle-dialog/idle-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-idle-app';
  // some fields to store our state so we can display it in the UI
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = new Date();
  private idleSeconds: number = 10;
  private timeoutSeconds: number = 5;
  private keepalivePing: number = 5;

  constructor(private idle: Idle, keepalive: Keepalive, private matdialog: MatDialog) {
    // sets an idle timeout of 30 seconds, for testing purposes.
    this.idle.setIdle(this.idleSeconds);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(this.timeoutSeconds);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // do something when the user is no longer idle
    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
    });

    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });

    // do something when the user becomes idle
    this.idle.onIdleStart.subscribe(() => {
      this.openIdleDialog();
    });

    // do something as the timeout countdown does its thing
    // idle.onTimeoutWarning.subscribe((seconds) => (`Countdown: ${this.countdown = seconds}`));

    idle.onTimeoutWarning.subscribe(
      (countdown) =>
        (this.idleState = 'You will time out in ' + countdown + ' seconds!')
    );

    // set keepalive parameters, omit if not using keepalive
    // will ping at this interval while not idle, in seconds
    keepalive.interval(this.keepalivePing);

    // do something when it pings
    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));
  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and call idle.watch()
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit(): void {
    // right when the component initializes, start reset state and start watching
    this.reset();
  }

  openIdleDialog() {
    const idleDialog = this.matdialog.open(IdleDialogComponent, {
      width: '30%'
    });
  }
}
