import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPets from './pets/pets.reducer';
import { PetsEffects } from './pets/pets.effects';
import { PetsFacade } from './pets/pets.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromPets.PETS_FEATURE_KEY,
      fromPets.petsReducer),
    EffectsModule.forFeature([PetsEffects]),
  ],
  providers: [PetsFacade],
})
export class CoreStateModule {}
