import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-idle-app';
  // some fields to store our state so we can display it in the UI
  idleState = 'NOT_STARTED';
  countdown?: number = 0;
  lastPing?: Date = new Date();
  private numberOfSeconds: number = 10;

  constructor(private idle: Idle, keepalive: Keepalive, cd: ChangeDetectorRef) {
    this.idle.setIdle(this.numberOfSeconds);
    this.idle.setTimeout(this.numberOfSeconds);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    // do something when the user becomes idle
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'IDLE';
    });
    // do something when the user is no longer idle
    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NOT_IDLE';
      console.log(`${this.idleState} ${new Date()}`);
      this.countdown = 0;
      // how do i avoid this kludge?
      cd.detectChanges();
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => (this.idleState = 'TIMED_OUT'));
    // do something as the timeout countdown does its thing
    idle.onTimeoutWarning.subscribe((seconds) => (this.countdown = seconds));

    // set keepalive parameters, omit if not using keepalive
    // will ping at this interval while not idle, in seconds
    keepalive.interval(15);
    // do something when it pings
    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));
  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = 'NOT_IDLE';
    this.countdown = 0;
    this.lastPing = new Date();
  }

  ngOnInit(): void {
    // right when the component initializes, start reset state and start watching
    this.reset();
  }
}
