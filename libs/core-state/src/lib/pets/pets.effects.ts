import { Injectable } from '@angular/core';
import { PetsService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as PetsActions from './pets.actions';
import { Pet } from '@thirty/api-interfaces';

@Injectable()
export class PetsEffects {
  @Effect() loadPets$ = this.actions$.pipe(
    ofType(PetsActions.loadPets),
    fetch({
      run: (action) => this.petsService.all().pipe(
        map((pets: Pet[]) => PetsActions.loadPetsSuccess({ pets }))
      ),
      onError: (action, error) => PetsActions.loadPetsFailure({ error })
    })
  );

  @Effect() loadPet$ = this.actions$.pipe(
    ofType(PetsActions.loadPet),
    fetch({
      run: (action) => this.petsService.byId(action.petId).pipe(
        map((pet: Pet) => PetsActions.loadPetSuccess({ pet }))
      ),
      onError: (action, error) => PetsActions.loadPetFailure({ error })
    })
  );

  @Effect() createPet$ = this.actions$.pipe(
    ofType(PetsActions.createPet),
    pessimisticUpdate({
      run: (action) => this.petsService.create(action.pet).pipe(
        map((pet: Pet) => PetsActions.createPetSuccess({ pet }))
      ),
      onError: (action, error) => PetsActions.createPetFailure({ error })
    })
  );

  @Effect() updatePet$ = this.actions$.pipe(
    ofType(PetsActions.updatePet),
    pessimisticUpdate({
      run: (action) => this.petsService.update(action.pet).pipe(
        map((pet: Pet) => 
          PetsActions.updatePetSuccess({ pet }))
      ),
      onError: (action, error) => PetsActions.updatePetFailure({ error })
    })
  );

  @Effect() deletePet$ = this.actions$.pipe(
    ofType(PetsActions.deletePet),
    pessimisticUpdate({
      run: (action) => this.petsService.delete(action.pet.id).pipe(
        map((pet: Pet) => PetsActions.deletePetSuccess({ pet })),
      ),
      onError: (action, error) => PetsActions.deletePetFailure({ error })
    })
  );

  // Effect to refresh the pet after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(PetsActions.deletePetSuccess, PetsActions.updatePetSuccess),
  //   tap(action => {
  //     PetsActions.loadPets();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private petsService: PetsService
  ) {}
}