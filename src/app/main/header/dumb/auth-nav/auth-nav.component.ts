import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})
export class AuthNavComponent implements OnInit, OnDestroy {
  @Input() downArrow: string;
  @Input() upArrow: string;
  @Input() isOpenAuthModal: boolean = false;
  @Input() isMobile: boolean;
  @Input() name: string = '';
  @Output() toggleAuthModal$: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeAuthModal$: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  clickOutside() {
    if (this.isOpenAuthModal && !this.isMobile) {
      this.toggleAuthModal$.emit();
    }
  }

  toggleAuthMenu() {
    this.toggleAuthModal$.emit();
  }

  ngOnDestroy(): void {
    this.closeAuthModal$.emit();
  }
}
