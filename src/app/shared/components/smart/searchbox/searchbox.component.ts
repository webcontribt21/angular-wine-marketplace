import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}
