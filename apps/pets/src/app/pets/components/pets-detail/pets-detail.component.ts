import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Pet } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-pets-detail',
  templateUrl: './pets-detail.component.html',
  styleUrls: ['./pets-detail.component.scss']
})
export class PetsDetailComponent implements OnInit, OnChanges{
  @Input() pet: Pet;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  petForm: FormGroup;

  petTypes = ['Standard Pet', 'Rocking Pet', 'Stool'];
  seatShapes = ['Round', 'Square', 'Formed'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.petForm && this.pet){
      this.petForm.patchValue(this.pet)
    } else if(this.petForm){
      this.cancel();
    }
  }

  cancel(){
    this.petForm.reset();
    this.petForm.value.price = 0;
  }

  createFormGroup(){
    this.petForm = this.formBuilder.group({
      id: [],
      type: new FormControl('', [
        Validators.required,
      ]),
      legs: new FormControl('', [
        Validators.required,
      ]),
      backing: new FormControl(false, [
      ]),
      seatShape: new FormControl('', [
        Validators.required,
      ])
    })
  }
}
