import { Component, Input, OnInit } from '@angular/core';
import { navItems } from './../../_nav';
import { UserIdleService } from 'angular-user-idle';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private router: Router, private _authService: AuthService,private userIdle: UserIdleService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
  ngOnInit(){
    //Start watching for user inactivity.
    this.userIdle.startWatching();
   
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log("user is idle timer started"));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
       });
      }
}
