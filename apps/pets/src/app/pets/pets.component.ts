import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PetsFacade } from '@thirty/core-state'
import { Pet } from '@thirty/api-interfaces';

import { Animations } from './pets.animations';
import { SnackBarService } from '@thirty/core-data';

@Component({
  selector: 'thirty-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
  animations: Animations,
})
export class PetsComponent implements OnInit {
  pets$: Observable<Pet[]> = this.petFacade.allPets$;
  pet$: Observable<Pet> = this.petFacade.selectedPet$;
  detailOpen = false;

  constructor(
    private petFacade: PetsFacade,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.petFacade.loadPets();
    this.petFacade.mutations$.subscribe((action: any) => this.refresh(action.type.split(' ')));
  }

  refresh(trigger: string){
    const snackBarMessage = 'Pet ' + trigger[1] + 'd';
    this.focusoutDetail();
    this.snackBarService.openSnackBar(snackBarMessage, 'Okay', 1000);
    this.petFacade.resetSelectedPet();
    this.petFacade.loadPets();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(pet: Pet): void{
    this.petFacade.selectPet(pet.id);
    this.focusDetail();
  }

  delete(pet: Pet): void{
    this.petFacade.deletePet(pet);
  }

  save(pet: Pet): void{
    if(pet.id !== null){
      this.petFacade.updatePet(pet);
    }else {
      this.petFacade.createPet(pet);
    }
  }

  cancel(): void{
    this.focusoutDetail();
    this.petFacade.resetSelectedPet();
  }

}
