import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Pet } from '@thirty/api-interfaces';

import * as PetsActions from './pets.actions';
import * as fromPets from './pets.reducer';
import * as PetsSelectors from './pets.selectors';

@Injectable({
  providedIn: 'root'
})
export class PetsFacade {
  loaded$ = this.store.pipe(select(PetsSelectors.getPetsLoaded));
  allPets$ = this.store.pipe(select(PetsSelectors.getAllPets));
  selectedPet$ = this.store.pipe(select(PetsSelectors.getSelectedPet));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === PetsActions.createPet({} as any).type ||
    action.type === PetsActions.updatePet({} as any).type ||
    action.type === PetsActions.deletePet({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectPet(selectedId: string) {
    this.dispatch(PetsActions.selectPet({ selectedId }));
  }

  resetSelectedPet(){
    this.dispatch(PetsActions.resetSelectedPet());
  }

  loadPets() {
    this.dispatch(PetsActions.loadPets());
  }

  loadPet(petId: string) {
    this.dispatch(PetsActions.loadPet({ petId }));
  }

  createPet(pet: Pet) {
    this.dispatch(PetsActions.createPet({ pet }));
  }

  updatePet(pet: Pet) {
    this.dispatch(PetsActions.updatePet({ pet }));
  }

  deletePet(pet: Pet) {
    this.dispatch(PetsActions.deletePet({ pet }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
