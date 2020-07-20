import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {
  @Input() pets: [Pet];
  @Output() selected = new EventEmitter<Pet>();
  @Output() deleted = new EventEmitter<Pet>();
  constructor() { }

  ngOnInit(): void {
  }

}
