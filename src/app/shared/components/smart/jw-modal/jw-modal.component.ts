import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { JwModalService } from 'src/app/shared/services/jw-modal.service';


@Component({
  selector: 'app-jw-modal',
  templateUrl: './jw-modal.component.html',
  styleUrls: ['./jw-modal.component.scss']
})
export class JwModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  private element: any;

  constructor(private modalService: JwModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
