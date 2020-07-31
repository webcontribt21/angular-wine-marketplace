import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  @Input() isAuth: boolean;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() signOut: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.signOut.emit();
  }

  navigate(url: string) {
    this.router.navigate([url]);
    this.close.emit();
  }
}
